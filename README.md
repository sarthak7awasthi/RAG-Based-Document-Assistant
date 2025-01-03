# RAG-Based-Document-Assistant

This project implements a Document Search Assistant that allows users to upload documents, ask questions, and receive relevant answers using **retrieval-augmented generation (RAG)**.

## Key Features:

- **Document Upload**: Supports PDF, DOCX, and TXT formats.
- **Text Extraction**: Extracts and preprocesses text from uploaded documents.
- **Document Search**: Retrieves relevant parts of the document in response to user queries using a vector database.
- **Answer Generation**: Uses a generative model (Gemini API) to synthesize coherent answers based on retrieved content.
- **User Interface**: Provides a simple, interactive UI for file uploads and queries.

## Technologies Used:

- **Text Extraction**: PyPDF2, pdfplumber, python-docx
- **Embedding Generation**: sentence-transformers (all-MiniLM-L6-v2)
- **Vector Database**: FAISS
- **Generative Model**: Gemini API
- **Web Framework**: FastAPI & React-Vite

## Setup & Usage

- Clone the reporistory
- Make a .env file and put your gemini api key in following format: SECRET_KEY="Your Key"

- Backend:
  ```bash
      cd backend
      python3 -m venv venv
      source venv/bin/activate
      pip install -r requirements.txt
      uvicorn app.main:app --reload
  ```

- Frontend:
  ```bash
    cd frontend
    npm install
    npm run dev
  ```

## Future Todos:

- Add search history & document previews.
- Improve Retrieval Accuracy
- Allow users to upload and query multiple documents simultaneously.
- Implement cross-document search capabilities.
