import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const FileUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
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
      const response = await fetch("http://127.0.0.1:8000/process-document", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Processed chunks:", data.chunks);
      alert("Document processed successfully!");
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Failed to process file. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Upload Your Document
      </h2>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
          isDragging
            ? "bg-blue-50 border-blue-400"
            : "bg-gray-50 border-gray-300"
        }`}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
      >
        <AiOutlineCloudUpload className="text-5xl text-blue-500 mx-auto mb-4" />
        <p className="text-gray-600">
          {selectedFile
            ? `Selected File: ${selectedFile.name}`
            : "Drag and drop a file here or click to upload"}
        </p>
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 text-center font-semibold transition w-full"
        >
          Browse Files
        </label>
        <button
          onClick={handleUpload}
          disabled={!selectedFile || isProcessing}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            !selectedFile || isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isProcessing ? "Processing..." : "Upload File"}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
