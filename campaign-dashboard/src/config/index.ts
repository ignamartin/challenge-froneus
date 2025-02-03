import {
  QueryCache,
  QueryClient as TanstackQueryClient,
} from "@tanstack/react-query";

import { ApiError } from "../types/api-error";

const queryClient = new TanstackQueryClient({
  queryCache: new QueryCache({
    onError(error, query) {
      if (typeof query.meta?.message === "string") {
        console.error(query.meta.message);
      }

      if (error instanceof ApiError) {
        console.error(error.message);
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        return failureCount <= 3 && error instanceof ApiError;
      },
    },
  },
});

export default queryClient;
