// src/components/Chat/ChatContainer.tsx
import React, { useState } from "react";
import { ChatPage } from "./ChatPage";
import { chatWithRAG } from "../../api";

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
      const response = await chatWithRAG(input);
      const botReply = response.response || "No answer found.";
      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error(error);
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
