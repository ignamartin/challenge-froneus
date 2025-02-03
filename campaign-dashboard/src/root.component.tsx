import { PrimeReactProvider } from "primereact/api";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorFallback from "./components/ErrorBoundary/ErrorFallback";
import Spinner from "./components/Spinner/Spinner";
import queryClient from "./config";

import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "./style.css";

const CampaignDashboard = lazy(() => import("./views/Dashboard"));

export default function Root() {
  return (
    <PrimeReactProvider>
      <Router>
        <QueryClientProvider client={queryClient}>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
                <Suspense fallback={<Spinner />}>
                  <Routes>
                    <Route path="/" element={<CampaignDashboard />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </QueryClientProvider>
      </Router>
    </PrimeReactProvider>
  );
}
