// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

// Layout component
import { Navbar } from "./components/Layout/Navbar";

// Container components
import { DocumentUploadContainer } from "./components/Upload/DocumentUploadContainer";
import { QueryContainer } from "./components/Query/QueryContainer";
import { ChatContainer } from "./components/Chat/ChatContainer";

function App() {
  return (
    <Box>
      {/* Global Navbar */}
      <Navbar />

      {/* Define your routes */}
      <Routes>
        {/* Home or main query page */}
        <Route path="/" element={<QueryContainer />} />

        {/* Document upload page */}
        <Route path="/upload" element={<DocumentUploadContainer />} />

        {/* Chat page */}
        <Route path="/chat" element={<ChatContainer />} />
      </Routes>
    </Box>
  );
}

export default App;
