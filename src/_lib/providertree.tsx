"use client"; // Ensures this runs only on the client

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ProvidersTree = ({ children }: { children: ReactNode }) => {
  // ✅ Ensure QueryClient is created only on the client
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ProvidersTree;
