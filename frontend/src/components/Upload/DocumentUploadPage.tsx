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
import Lottie from "react-lottie";
import animationData from "./docAnimation.json";

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
  const [showAnimation, setShowAnimation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 3000);
      onFileUpload(selectedFile);
    }
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      bgGradient="linear(to-r, blue.50, blue.100)"
      boxShadow="lg"
    >
      <Heading size="lg" mb={4} textAlign="center" color="blue.700">
        Upload Documents
      </Heading>
      <VStack spacing={6} align="stretch">
        {/* File input */}
        <Input
          type="file"
          onChange={handleChange}
          p={2}
          border="2px dashed"
          borderColor="blue.300"
          borderRadius="md"
          bg="white"
          _hover={{ borderColor: "blue.500" }}
          _focus={{ outline: "none", borderColor: "blue.600" }}
          placeholder="Choose a file..."
        />

        {/* Upload button */}
        <Button
          bgColor={"blue.600"}
          onClick={handleUpload}
          disabled={!selectedFile || isProcessing}
          size="lg"
          _hover={{ bg: "blue.600" }}
          _disabled={{ bg: "blue.300", cursor: "not-allowed" }}
        >
          {isProcessing ? <Spinner size="sm" /> : "Upload"}
        </Button>

        {/* Lottie Animation */}
        {showAnimation && (
          <Box textAlign="center" mt={4}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg="white"
              p={4}
              borderRadius="full"
              boxShadow="md"
              width="220px"
              height="220px"
              mx="auto"
            >
              <Lottie options={lottieOptions} height={180} width={180} />
            </Box>
          </Box>
        )}
        {!showAnimation && uploadStatus && (
          <Text textAlign="center" fontSize="md" color="blue.700">
            {uploadStatus}
          </Text>
        )}
      </VStack>
    </Box>
  );
}
