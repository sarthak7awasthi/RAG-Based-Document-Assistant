// src/components/Chat/ChatPage.tsx
import React from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Heading,
  HStack,
} from "@chakra-ui/react";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

interface ChatPageProps {
  messages: ChatMessage[];
  input: string;
  setInput: (val: string) => void;
  onSendMessage: () => void;
}

export function ChatPage({
  messages,
  input,
  setInput,
  onSendMessage,
}: ChatPageProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSendMessage();
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4}>
      <Heading size="md" mb={4}>
        Chat with Documents
      </Heading>
      <VStack gap={4} align="stretch">
        <Box
          borderWidth={1}
          borderRadius="md"
          p={4}
          height="400px"
          overflowY="auto"
        >
          {messages.map((msg, idx) => (
            <Box
              key={idx}
              mb={3}
              bg={msg.sender === "user" ? "blue.50" : "green.50"}
              p={2}
              borderRadius="md"
              alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
              maxW="80%"
            >
              <Text fontWeight="bold">
                {msg.sender === "user" ? "You" : "Assistant"}
              </Text>
              <Text>{msg.text}</Text>
            </Box>
          ))}
        </Box>
        <HStack>
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button colorScheme="blue" onClick={onSendMessage}>
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
