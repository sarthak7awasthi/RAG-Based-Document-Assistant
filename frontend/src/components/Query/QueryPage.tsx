// src/components/Query/QueryPage.tsx
import React from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Spinner,
  Heading,
} from "@chakra-ui/react";

interface QueryPageProps {
  query: string;
  setQuery: (val: string) => void;
  onQuerySubmit: () => void;
  results: string[];
  isLoading: boolean;
}

export function QueryPage({
  query,
  setQuery,
  onQuerySubmit,
  results,
  isLoading,
}: QueryPageProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onQuerySubmit();
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4}>
      <Heading size="md" mb={4}>
        Ask Documents
      </Heading>
      <VStack gap={4} align="stretch">
        <Input
          placeholder="Enter your query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          colorScheme="blue"
          onClick={onQuerySubmit}
          disabled={!query || isLoading}
        >
          {isLoading ? <Spinner size="sm" /> : "Search"}
        </Button>
        <Box mt={4}>
          {results.map((res, idx) => (
            <Box key={idx} p={3} borderWidth={1} borderRadius="md" mb={2}>
              <Text>{res}</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </Box>
  );
}
