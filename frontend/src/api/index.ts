// src/api/index.ts
import axios from "axios";

/**
 * Upload documents to the server
 * @param file The file to upload
 * @returns The server response (e.g., success message)
 */
export async function uploadDocument(file: File): Promise<{ message: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    "http://127.0.0.1:8000/upload-document",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

/**
 * Query the RAG system
 * @param query The user’s question
 * @returns RAG results (array of strings or objects)
 */
export async function queryRAG(query: string): Promise<{ results: string[] }> {
  const response = await axios.post("http://127.0.0.1:8000/generate-answer", {
    query,
  });
  return response.data;
}

/**
 * Send/Receive chat messages
 * @param message The user’s chat message
 * @returns Chat response from server
 */
export async function chatWithRAG(
  message: string
): Promise<{ response: string }> {
  const response = await axios.post("http://127.0.0.1:8000/generate-answer", {
    message,
  });
  return response.data;
}
