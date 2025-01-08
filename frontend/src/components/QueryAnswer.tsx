import React, { useState } from "react";
import axios from "axios";

const QueryAnswer: React.FC = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleQuery = async () => {
    if (!query.trim()) {
      alert("Please enter a valid question before submitting.");
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
    <div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Query Answer Generator
      </h2>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query here..."
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg shadow-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
        rows={4}
        disabled={isLoading}
        aria-label="Enter your query"
      />
      <button
        onClick={handleQuery}
        disabled={isLoading || !query.trim()}
        className={`w-full py-2 rounded-lg font-medium text-white transition ${
          isLoading || !query.trim()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        aria-busy={isLoading}
      >
        {isLoading ? "Loading..." : "Get Answer"}
      </button>
      {answer && (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Answer:</h3>
          <p className="text-gray-800">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QueryAnswer;
