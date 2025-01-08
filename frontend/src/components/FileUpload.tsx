import React, { useState } from "react";
import axios from "axios";

const FileUpload: React.FC = () => {
  const [chunks, setChunks] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
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
      const processResponse = await axios.post(
        "http://127.0.0.1:8000/process-document",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const documentChunks = processResponse.data.chunks;
      setChunks(documentChunks);

      await axios.post("http://127.0.0.1:8000/generate-embeddings", {
        chunks: documentChunks,
      });

      alert("Document processed and indexed successfully!");
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Failed to process document. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 flex flex-col items-center text-center shadow-md">
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 cursor-pointer text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-500 file:rounded-lg file:hover:bg-blue-600"
        disabled={isProcessing}
        aria-label="Upload a file"
      />
      <button
        onClick={handleUpload}
        className={`mt-4 px-6 py-2 rounded-lg shadow-lg transition ${
          isProcessing
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={isProcessing}
        aria-busy={isProcessing}
      >
        {isProcessing ? "Processing..." : "Upload File"}
      </button>
      {chunks.length > 0 && (
        <div className="mt-6 w-full">
          <strong className="block text-lg text-gray-800 mb-2">
            Extracted Chunks:
          </strong>
          <div className="mt-2 max-h-60 overflow-y-auto border-t border-gray-200 pt-2">
            <ul className="text-sm text-gray-700 space-y-2">
              {chunks.map((chunk, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-white rounded shadow-md border border-gray-300"
                >
                  {chunk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
