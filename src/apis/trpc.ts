import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../server/trpc";
import superjson from "superjson";
import { getToken } from "./config";

// Create the tRPC React client
export const trpc = createTRPCReact<AppRouter>();

// Create the tRPC client for direct usage
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc", // Update this with your actual API URL
      transformer: superjson,
      headers: () => {
        return {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        };
      },
    }),
  ],
});
