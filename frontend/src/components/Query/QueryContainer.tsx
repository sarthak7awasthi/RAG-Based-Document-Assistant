// src/components/Query/QueryContainer.tsx
import React, { useState } from "react";
import { QueryPage } from "./QueryPage";
import { queryRAG } from "../../api";

export function QueryContainer() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuerySubmit = async () => {
    try {
      setIsLoading(true);
      const data = await queryRAG(query);
      // Suppose your API returns an array of answers
      setResults(data.results || []);
    } catch (error) {
      console.error(error);
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
