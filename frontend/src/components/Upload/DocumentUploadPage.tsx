// src/components/Upload/DocumentUploadPage.tsx

import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Spinner,
  Input,
  VStack,
  Heading,
} from "@chakra-ui/react";

interface DocumentUploadPageProps {
  onFileUpload: (file: File) => void;
  chunks: string[];
  isProcessing: boolean;
  uploadStatus: string | null;
}

export function DocumentUploadPage({
  onFileUpload,
  chunks,
  isProcessing,
  uploadStatus,
}: DocumentUploadPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
      <Heading size="md" mb={4}>
        Upload Documents
      </Heading>
      <VStack spacing={4} align="stretch">
        {/* File input */}
        <Input type="file" onChange={handleChange} />

        {/* Upload button */}
        <Button
          colorScheme="blue"
          onClick={handleUpload}
          disabled={!selectedFile || isProcessing}
        >
          {isProcessing ? <Spinner size="sm" /> : "Process & Index"}
        </Button>

        {/* Status text */}
        {uploadStatus && <Text>{uploadStatus}</Text>}

        {/* Display chunks (optional) */}
        {chunks.length > 0 && (
          <Box mt={4}>
            <Heading size="sm">Extracted Chunks:</Heading>
            {chunks.map((chunk, idx) => (
              <Text key={idx} fontSize="sm" mt={2}>
                {chunk}
              </Text>
            ))}
          </Box>
        )}
      </VStack>
    </Box>
  );
}
