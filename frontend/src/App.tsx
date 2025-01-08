import React from "react";
import ChatInterface from "./components/ChatInterface";
import FileUpload from "./components/FileUpload";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex flex-col items-center p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">
          Document Search Assistant
        </h1>
      </header>

      <main className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <section aria-labelledby="file-upload-section">
          <h2 id="file-upload-section" className="sr-only">
            Upload your document
          </h2>
          <FileUpload />
        </section>

        <section className="mt-12" aria-labelledby="chat-interface-section">
          <h2 id="chat-interface-section" className="sr-only">
            Chat with the assistant
          </h2>
          <ChatInterface />
        </section>
      </main>

      <footer className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} RAG-Based-Document-Assistant. All rights
        reserved.
      </footer>
    </div>
  );
};

export default App;
