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

    // 1. Add user’s message to state
    const newMessages: ChatMessage[] = [
      ...messages,
      { sender: "user", text: input },
    ];
    setMessages(newMessages);
    setInput("");

    try {
      // 2. Make the API call right here (no separate function)
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-answer",
        {
          message: input,
        }
      );
      const botReply = response.data.response || "No answer found.";

      // 3. Append bot’s reply to the message list
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
