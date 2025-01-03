import React from "react";
import ChatInterface from "./ChatInterface";
import FileUpload from "./FileUpload";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">
        Document Search Assistant
      </h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <FileUpload />
        <div className="mt-8">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default App;
