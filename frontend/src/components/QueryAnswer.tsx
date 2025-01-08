import React, { useState } from "react";
import axios from "axios";

const QueryAnswer: React.FC = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleQuery = async () => {
    if (!query.trim()) {
      alert("Please enter a question before submitting.");
      return;
    }

    setIsLoading(true);
    setAnswer("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-answer",
        {
          query,
        }
      );
      setAnswer(response.data.answer || "No answer available.");
    } catch (error) {
      console.error("Error generating answer:", error);
      alert("Failed to generate an answer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Query Answer Generator
      </h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask your question..."
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        disabled={isLoading}
        aria-label="Enter your query"
      />
      <button
        onClick={handleQuery}
        disabled={isLoading || !query.trim()}
        className={`w-full py-3 rounded-lg text-white font-medium transition ${
          isLoading || !query.trim()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Loading..." : "Get Answer"}
      </button>
      {answer && (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <strong className="block text-lg text-gray-700 mb-2">Answer:</strong>
          <p className="text-gray-800">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QueryAnswer;
