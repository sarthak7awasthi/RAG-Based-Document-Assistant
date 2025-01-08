import React, { useState } from "react";
import axios from "axios";

const ChatInterface: React.FC = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendQuery = async () => {
    if (!query.trim()) {
      alert("Please enter your question.");
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/generate-answer", {
        query,
      });
      setResponse(res.data.answer || "No response available.");
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Chat With the Assistant
      </h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your question here..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 bg-white"
          disabled={isLoading}
        />
        <button
          onClick={handleSendQuery}
          disabled={isLoading || !query.trim()}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            isLoading || !query.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Processing..." : "Send"}
        </button>
      </div>
      {response && (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Response:
          </h3>
          <p className="text-gray-800">{response}</p>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
