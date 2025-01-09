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
    <Box
      maxW="600px"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      bgGradient="linear(to-r, gray.50, gray.100)"
      boxShadow="lg"
    >
      <Heading size="lg" mb={4} textAlign="center" color="blue.700">
        Chat with Documents
      </Heading>
      <VStack gap={4} align="stretch">
        {/* Chat Messages */}
        <Box
          borderWidth={1}
          borderRadius="md"
          p={4}
          height="400px"
          overflowY="auto"
          bg="white"
          boxShadow="md"
        >
          {messages.map((msg, idx) => (
            <Box
              key={idx}
              mb={3}
              bg={msg.sender === "user" ? "blue.100" : "green.100"}
              p={3}
              borderRadius="lg"
              alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
              maxW="80%"
              boxShadow="sm"
            >
              <Text
                fontWeight="bold"
                color={msg.sender === "user" ? "blue.600" : "green.600"}
              >
                {msg.sender === "user" ? "You" : "Assistant"}
              </Text>
              <Text color="gray.700">{msg.text}</Text>
            </Box>
          ))}
        </Box>

        {/* Input Field and Send Button */}
        <HStack spacing={3}>
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            size="lg"
            borderWidth={2}
            borderColor="gray.300"
            _hover={{ borderColor: "blue.400" }}
            _focus={{ borderColor: "blue.600", boxShadow: "outline" }}
          />
          <Button
            bgColor={"blue.600"}
            onClick={onSendMessage}
            size="lg"
            px={6}
            _hover={{ bg: "blue.600" }}
            disabled={!input.trim()}
            _disabled={{ bg: "blue.300", cursor: "not-allowed" }}
          >
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
