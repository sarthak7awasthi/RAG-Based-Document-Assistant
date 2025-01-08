// src/components/Upload/DocumentUploadContainer.tsx
import React, { useState } from "react";
import { DocumentUploadPage } from "./DocumentUploadPage";
import { uploadDocument } from "../../api";

interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function DocumentUploadContainer() {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleFileUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setUploadStatus(null);
      const response = await uploadDocument(file);
      setUploadStatus(response.message || "Upload successful!");
    } catch (error: unknown) {
      const customError = error as CustomError;
      if (customError.response?.data?.message) {
        setUploadStatus(customError.response.data.message);
      } else {
        setUploadStatus("Error uploading file");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DocumentUploadPage
      onFileUpload={handleFileUpload}
      uploadStatus={uploadStatus}
      isLoading={isLoading}
    />
  );
}
