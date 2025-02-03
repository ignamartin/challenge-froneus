import { PrimeReactProvider } from "primereact/api";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorFallback from "./components/ErrorBoundary/ErrorFallback";
import Spinner from "./components/Spinner/Spinner";

import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "./style.css";

const NewCampaign = lazy(() => import("./views/NewCampaign"));
const EditCampaign = lazy(() => import("./views/EditCampaign"));

export default function Root() {
  return (
    <PrimeReactProvider>
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/campaign/new" element={<NewCampaign />} />
              <Route path="/campaign/edit/:id" element={<EditCampaign />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </PrimeReactProvider>
  );
}
