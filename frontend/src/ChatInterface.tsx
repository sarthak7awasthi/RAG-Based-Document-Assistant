import React, { useState } from "react";
import axios from "axios";

interface ChatMessage {
  query: string;
  answer: string;
}

const ChatInterface: React.FC = () => {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const handleSendQuery = async () => {
    if (!query.trim()) return;

    try {
      const newChat: ChatMessage = { query, answer: "Fetching answer..." };
      setChatHistory((prev) => [...prev, newChat]);

      const response = await axios.post(
        "http://localhost:8000/generate-answer",
        { query }
      );

      setChatHistory((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, answer: response.data.answer }
            : msg
        )
      );
    } catch (error) {
      setChatHistory((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, answer: "Failed to fetch answer. Try again!" }
            : msg
        )
      );
    }

    setQuery("");
  };

  return (
    <div className="flex flex-col h-96 bg-gray-50 p-6 rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto mb-4">
        {chatHistory.map((chat, index) => (
          <div key={index} className="mb-6">
            <div className="bg-blue-100 p-3 rounded-md shadow-sm">
              <strong>Query:</strong> {chat.query}
            </div>
            <div className="bg-green-100 p-3 rounded-md shadow-sm mt-2">
              <strong>Answer:</strong> {chat.answer}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your question..."
          className="flex-1 border border-gray-300 rounded-md p-3 resize-none shadow-sm"
          rows={2}
        />
        <button
          onClick={handleSendQuery}
          className="ml-4 bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
