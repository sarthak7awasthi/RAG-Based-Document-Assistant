from fastapi import FastAPI, UploadFile, HTTPException
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from dotenv import load_dotenv

from fastapi.responses import JSONResponse
import os
from app.text_extraction import (
    extract_text_from_pdf,
    extract_text_from_docx,
    extract_text_from_txt,
    preprocess_text,
		chunk_text
)
from app.embedding import generate_embeddings, create_faiss_index, search_faiss_index
load_dotenv()
chunks_store = {
    "chunks": [],
    "faiss_indexed": False
}
secret_key = os.getenv("SECRET_KEY")

genai.configure(api_key=secret_key)

class SearchRequest(BaseModel):
    query: str
class EmbeddingRequest(BaseModel):
    chunks: list[str]

class AnswerRequest(BaseModel):
    query: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.post("/upload-document")
async def upload_document(file: UploadFile):
    """
    Accept a document, extract text, and preprocess it.
    Supported formats: PDF, DOCX, TXT.
    """
    try:
     
        file_extension = file.filename.split(".")[-1].lower()
        temp_file_path = f"temp_file.{file_extension}"
        with open(temp_file_path, "wb") as temp_file:
            temp_file.write(await file.read())
        
 
        if file_extension == "pdf":
            text = extract_text_from_pdf(temp_file_path)
        elif file_extension == "docx":
            text = extract_text_from_docx(temp_file_path)
        elif file_extension == "txt":
            text = extract_text_from_txt(temp_file_path)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")
        
    
        preprocessed_text = preprocess_text(text)
        
      
        os.remove(temp_file_path)
        
        return JSONResponse(content={"extracted_text": preprocessed_text})
    
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")


@app.post("/process-document")
async def process_document(file: UploadFile):
    """
    Accept a document, extract text, preprocess, and chunk it.
    Returns processed chunks.
    """
    try:
       
        file_extension = file.filename.split(".")[-1].lower()
        temp_file_path = f"temp_file.{file_extension}"
        with open(temp_file_path, "wb") as temp_file:
            temp_file.write(await file.read())
        
      
        if file_extension == "pdf":
            text = extract_text_from_pdf(temp_file_path)
        elif file_extension == "docx":
            text = extract_text_from_docx(temp_file_path)
        elif file_extension == "txt":
            text = extract_text_from_txt(temp_file_path)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")
        
        
        preprocessed_text = preprocess_text(text)
        text_chunks = chunk_text(preprocessed_text)
        
     
        os.remove(temp_file_path)
        for i in text_chunks:

          print("here",i)
          print("")
          print(len(text_chunks))
        
        return JSONResponse(content={"chunks": text_chunks})
    
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")






@app.post("/generate-embeddings")
async def generate_and_store_embeddings(request: EmbeddingRequest):
    try:
        print("1. Starting embedding generation...") 
        global chunks_store
        chunks = request.chunks
        print(f"2. Received {len(chunks)} chunks")  
        
        chunks_store["chunks"] = chunks
        print("3. Stored chunks in chunks_store") 
        
        print("4. Generating embeddings...") 
        embeddings = generate_embeddings(chunks)
        
        print("5. Creating FAISS index...")  
        create_faiss_index(embeddings)
        
        chunks_store["faiss_indexed"] = True
        print("6. FAISS index created and store updated")  
        
        return {"message": "Embeddings generated and stored successfully", "num_chunks": len(chunks)}
    except Exception as e:
        print(f"Embedding error: {str(e)}")  
        print(f"Error type: {type(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Error generating embeddings: {e}")


@app.post("/search")
async def search_document(request: SearchRequest):
    try:
        query = request.query
        query_embedding = generate_embeddings([query])
        indices, distances = search_faiss_index(query_embedding, top_k=5)
        
      
        matched_chunks = [chunk_metadata[i] for i in indices[0]]
        return {"query": query, "results": matched_chunks, "distances": distances.tolist()}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during search: {e}")




@app.post("/generate-answer")
async def generate_answer(request: AnswerRequest):
    try:
        print("1. Starting generate_answer...") 
        
        if not chunks_store["faiss_indexed"]:
            print("2. No FAISS index found")
            raise HTTPException(
                status_code=400, 
                detail="No documents have been indexed yet. Please upload and process a document first."
            )
            
        print("3. Got query:", request.query)  
        query = request.query
        
        print("4. Generating query embedding...")  
        query_embedding = generate_embeddings([query])
        
        print("5. Searching FAISS index...") 
        indices, distances = search_faiss_index(query_embedding, top_k=3)

        print("6. Chunks store state:", {  
            "faiss_indexed": chunks_store["faiss_indexed"],
            "num_chunks": len(chunks_store["chunks"])
        })
        
        print("7. Indices found:", indices)  
        relevant_chunks = [chunks_store["chunks"][i] for i in indices[0]]
        
        # context-aware prompt
        context = "\n".join(relevant_chunks)
        prompt = (
            "You are an AI assistant tasked with answering questions based on the provided context. "
            "Only answer based on the information provided in the context. "
            "If the answer cannot be found in the context, say so.\n\n"
            f"Context:\n{context}\n\n"
            f"Query: {query}\nAnswer:"
        )

        model = genai.GenerativeModel(model_name='gemini-1.5-flash')
        response = model.generate_content(prompt)
        print("res", response)
        
        if not response or not hasattr(response, 'text'):
            raise HTTPException(status_code=500, detail="Error: Empty or invalid response from Gemini API")

        answer = response.text.strip()
        return {"query": query, "answer": answer, "context": relevant_chunks}

    except Exception as e:
        print(f"Error occurred: {str(e)}") 
        print(f"Error type: {type(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Error generating answer: {str(e)}")