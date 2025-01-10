import { Box, Heading, Spacer } from "@chakra-ui/react";
import { DocumentUploadContainer } from "./components/Upload/DocumentUploadContainer";
import { ChatContainer } from "./components/Chat/ChatContainer";

function App() {
  return (
    <>
      <Heading
        padding={5}
        size="2xl"
        mb={4}
        fontFamily="'Courier New', Courier, monospace"
      >
        RAG Doc Assistant
      </Heading>
      <Box>
        <Spacer />
        <Spacer />
        <Spacer />
        <DocumentUploadContainer />
        <ChatContainer />
      </Box>
    </>
  );
}

export default App;
