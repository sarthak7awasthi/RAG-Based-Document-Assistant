// src/components/Upload/DocumentUploadContainer.tsx

import React, { useState } from "react";
import axios from "axios";
import { DocumentUploadPage } from "./DocumentUploadPage";

export function DocumentUploadContainer() {
  const [chunks, setChunks] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    try {
      setIsProcessing(true);
      setUploadStatus(null);

      // Prepare form data for file upload
      const formData = new FormData();
      formData.append("file", file);

      // 1) Process the document to extract chunks
      const processResponse = await axios.post(
        "http://127.0.0.1:8000/process-document",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const extractedChunks = processResponse.data.chunks || [];
      setChunks(extractedChunks);

      // 2) Generate embeddings from those chunks to update your FAISS index
      await axios.post("http://127.0.0.1:8000/generate-embeddings", {
        chunks: extractedChunks,
      });

      // If everything succeeded, notify the user
      setUploadStatus("Document processed and indexed successfully!");
    } catch (error) {
      console.error("Error processing file:", error);
      setUploadStatus("Failed to process document.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DocumentUploadPage
      onFileUpload={handleFileUpload}
      chunks={chunks}
      isProcessing={isProcessing}
      uploadStatus={uploadStatus}
    />
  );
}
