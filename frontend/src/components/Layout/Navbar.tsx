// src/components/Layout/Navbar.tsx
import { Link as RouterLink } from "react-router-dom";
import { Flex, Box, Link, Heading, Spacer } from "@chakra-ui/react";

export function Navbar() {
  return (
    <Flex
      as="nav"
      bg="brand.600"
      color="white"
      align="center"
      justify="space-between"
      paddingX={4}
      paddingY={3}
    >
      <Heading size="md">RAG Document Assistant</Heading>
      <Spacer />
      <Box>
        <Link
          as={RouterLink}
          marginRight={4}
          _hover={{ textDecoration: "none" }}
        >
          <RouterLink to="/">Query</RouterLink>
        </Link>
        <Link as={RouterLink} marginRight={4}>
          <RouterLink to="/upload">Upload</RouterLink>
        </Link>
        <Link as={RouterLink} _hover={{ textDecoration: "none" }}>
          <RouterLink to="/chat">Chat</RouterLink>
        </Link>
      </Box>
    </Flex>
  );
}
