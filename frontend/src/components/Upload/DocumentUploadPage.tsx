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
  uploadStatus: string | null;
  isLoading: boolean;
}

export function DocumentUploadPage({
  onFileUpload,
  uploadStatus,
  isLoading,
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
      <VStack gap={4} align="stretch">
        <Input type="file" onChange={handleChange} />
        <Button
          colorScheme="blue"
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? <Spinner size="sm" /> : "Upload"}
        </Button>
        {uploadStatus && <Text>{uploadStatus}</Text>}
      </VStack>
    </Box>
  );
}
