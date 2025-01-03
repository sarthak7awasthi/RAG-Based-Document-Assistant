import React, { useState } from "react";
import axios from "axios";

const QueryAnswer: React.FC = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuery = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-answer",
        { query }
      );
      setAnswer(response.data.answer);
    } catch (error) {
      console.error("Error generating answer:", error);
      alert("Failed to generate an answer.");
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask your question..."
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleQuery}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Get Answer
      </button>
      {answer && (
        <div className="mt-4">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QueryAnswer;
