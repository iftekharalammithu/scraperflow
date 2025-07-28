"use client";
import { ThemeProvider } from "next-themes";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryclient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryclient}>
      <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  );
};

export default Provider;
