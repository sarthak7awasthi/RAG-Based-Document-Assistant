import React from "react";
import ChatInterface from "./components/ChatInterface";
import FileUpload from "./components/FileUpload";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center p-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          RAG-Based Document Assistant
        </h1>
        <p className="text-gray-600">
          Streamline document processing and chat with ease
        </p>
      </header>
      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <FileUpload />
        <ChatInterface />
      </main>
      <footer className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} RAG-Based Document Assistant. All rights
        reserved.
      </footer>
    </div>
  );
};

export default App;
