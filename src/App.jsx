import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import { DarkModeProvider } from "./context/DarkModeContext";
// import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";

import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

import GeneralDiseasePrediction from "./pages/GeneralDiseasePrediction";
import DiabetesPrediction from "./pages/DiabetesPrediction";
import HeartDiseasePrediction from "./pages/HeartDiseasePrediction";
import ParkinsonPrediction from "./pages/ParkinsonPrediction";
import BreastCancerPrediction from "./pages/BreastCancerPrediction";
import LungCancerPrediction from "./pages/LungCancerPrediction";
import ChronicKidneyPrediction from "./pages/ChronicKidneyPrediction";
import LiverPrediction from "./pages/LiverPrediction";
import HepatitisPrediction from "./pages/HepatitisPrediction";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                // <ProtectedRoute>
                <AppLayout />
                // </ProtectedRoute>
              }
            >
              {/* <Route index element={<Navigate replace to="dashboard" />} /> */}
              <Route
                index
                element={<Navigate replace to="general_disease_prediction" />}
              />

              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />

              <Route
                path="general_disease_prediction"
                element={<GeneralDiseasePrediction />}
              />
              <Route
                path="diabetes_prediction"
                element={<DiabetesPrediction />}
              />
              <Route
                path="heart_disease_prediction"
                element={<HeartDiseasePrediction />}
              />
              <Route
                path="parkinson_prediction"
                element={<ParkinsonPrediction />}
              />
              <Route path="liver_prediction" element={<LiverPrediction />} />
              <Route
                path="hepatitis_prediction"
                element={<HepatitisPrediction />}
              />
              <Route
                path="lung_cancer_prediction"
                element={<LungCancerPrediction />}
              />
              <Route
                path="chronic_kidney_prediction"
                element={<ChronicKidneyPrediction />}
              />
              <Route
                path="breast_cancer_prediction"
                element={<BreastCancerPrediction />}
              />

              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxLines: "500px",
              padding: "10px 15px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
              boxShadow: "var(--shadow-md)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
