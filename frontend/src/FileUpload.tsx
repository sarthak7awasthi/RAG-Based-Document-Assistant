import React, { useState } from "react";
import axios from "axios";

const FileUpload: React.FC = () => {
  const [chunks, setChunks] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Step 1: Process document to get chunks
      const processResponse = await axios.post(
        "http://127.0.0.1:8000/process-document",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setChunks(processResponse.data.chunks);

      // Step 2: Generate embeddings from chunks
      const embeddingResponse = await axios.post(
        "http://127.0.0.1:8000/generate-embeddings",
        { chunks: processResponse.data.chunks }
      );

      alert("Document processed and indexed successfully!");
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Failed to process document.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 flex flex-col items-center text-center">
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4"
        disabled={isProcessing}
      />
      <button
        onClick={handleUpload}
        className={`mt-4 ${
          isProcessing ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white px-4 py-2 rounded shadow transition`}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Upload File"}
      </button>
      <div className="mt-6 w-full">
        <strong>Extracted Chunks:</strong>
        <div className="mt-2 max-h-60 overflow-y-auto">
          <ul className="text-sm text-gray-700">
            {chunks.map((chunk, idx) => (
              <li key={idx} className="mb-1 p-2 bg-white rounded shadow-sm">
                {chunk}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
