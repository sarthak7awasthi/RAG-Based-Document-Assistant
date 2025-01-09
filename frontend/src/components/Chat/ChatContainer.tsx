// src/components/Chat/ChatContainer.tsx

import React, { useState } from "react";
import axios from "axios";
import { ChatPage } from "./ChatPage";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { sender: "user", text: input },
    ];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-answer",
        {
          query: input,
        }
      );
      const botReply = response.data.answer || "No answer found.";

      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error fetching chat response:", error);
    }
  };

  return (
    <ChatPage
      messages={messages}
      input={input}
      setInput={setInput}
      onSendMessage={handleSendMessage}
    />
  );
}
