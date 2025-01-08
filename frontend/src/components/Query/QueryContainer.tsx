// src/components/Query/QueryContainer.tsx

import React, { useState } from "react";
import axios from "axios";
import { QueryPage } from "./QueryPage";

export function QueryContainer() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuerySubmit = async () => {
    try {
      setIsLoading(true);

      // Make the API call inline, no separate function
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-answer",
        {
          query,
        }
      );
      const data = response.data;

      // Suppose your API returns results in data.results
      setResults(data.results || []);
    } catch (error) {
      console.error("Error querying RAG:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <QueryPage
      query={query}
      setQuery={setQuery}
      onQuerySubmit={handleQuerySubmit}
      results={results}
      isLoading={isLoading}
    />
  );
}
