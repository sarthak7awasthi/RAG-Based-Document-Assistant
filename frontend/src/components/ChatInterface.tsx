import React, { useState } from "react";
import axios from "axios";

interface ChatMessage {
  query: string;
  answer: string;
}

const ChatInterface: React.FC = () => {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendQuery = async () => {
    if (!query.trim()) return;

    const newChat: ChatMessage = { query, answer: "Fetching answer..." };
    setChatHistory((prev) => [...prev, newChat]);

    setQuery("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/generate-answer",
        { query }
      );

      setChatHistory((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, answer: response.data.answer || "No answer available." }
            : msg
        )
      );
    } catch (error) {
      console.error("Error fetching answer:", error);
      setChatHistory((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, answer: "Failed to fetch answer. Please try again." }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-96 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="flex-1 overflow-y-auto mb-4 space-y-6">
        {chatHistory.length === 0 ? (
          <div className="text-gray-500 text-center">
            Start a conversation by asking a question!
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <div key={index}>
              <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
                <strong className="block text-blue-700 mb-1">Query:</strong>
                <p>{chat.query}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg shadow-sm mt-2">
                <strong className="block text-green-700 mb-1">Answer:</strong>
                <p>{chat.answer}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex items-center space-x-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your question..."
          className="flex-1 border border-gray-300 rounded-lg p-3 resize-none shadow-sm focus:ring-2 focus:ring-blue-500"
          rows={2}
          disabled={isLoading}
          aria-label="Enter your question"
        />
        <button
          onClick={handleSendQuery}
          disabled={isLoading || !query.trim()}
          className={`px-6 py-2 rounded-lg shadow-lg transition-all duration-300 ${
            isLoading || !query.trim()
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          aria-busy={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
