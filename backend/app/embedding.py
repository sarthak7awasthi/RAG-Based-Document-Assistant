import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

# Load the embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Initialize a FAISS index
faiss_index = None

def generate_embeddings(chunks):
    """
    Generate embeddings for a list of text chunks.
    Args:
        chunks (List[str]): List of text chunks.
    Returns:
        numpy.ndarray: Embeddings for the text chunks.
    """
    return model.encode(chunks, convert_to_numpy=True)

def create_faiss_index(embeddings):
    """
    Create a FAISS index from the embeddings.
    Args:
        embeddings (numpy.ndarray): Embeddings to index.
    Returns:
        faiss.IndexFlatL2: A FAISS index.
    """
    global faiss_index
    dim = embeddings.shape[1] 
    faiss_index = faiss.IndexFlatL2(dim) 
    faiss_index.add(embeddings)  # Add embeddings to the index
    return faiss_index

def search_faiss_index(query_embedding, top_k=5):
    """
    Search the FAISS index for the most similar embeddings.
    Args:
        query_embedding (numpy.ndarray): Embedding of the query.
        top_k (int): Number of results to retrieve.
    Returns:
        Tuple[List[int], List[float]]: Indices and distances of the top results.
    """
    if faiss_index is None:
        raise ValueError("FAISS index has not been initialized")
    distances, indices = faiss_index.search(query_embedding, top_k)
    return indices, distances
