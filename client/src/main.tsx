/**
 * Main entry point of the application
 * Sets up all necessary providers including:
 * - QueryClientProvider for data fetching
 * - UserProvider for user authentication and state management
 */
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { UserProvider } from "./context/user-context";

// Mount the application to the DOM with all required providers
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <App />
    </UserProvider>
  </QueryClientProvider>
);
