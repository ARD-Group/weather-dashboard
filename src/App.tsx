import "./App.css";
import "./index.css";
import "./styles/theme.css";

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAtom } from "jotai";
import { Login, Signup, Dashboard } from "./pages";
import OTPVerification from "./pages/OTPVerification/OTPVerification";
import { Toaster } from "sonner";
import { initializeAuth } from "./utils/tokenManager";
import { ThemeProvider } from "./components/ThemeProvider";
import { authAtom } from "./utils/authAtom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth] = useAtom(authAtom);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  const [, setAuth] = useAtom(authAtom);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await initializeAuth(setAuth);
      setIsInitializing(false);
    };
    initAuth();
  }, [setAuth]);

  if (isInitializing) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="weather-dashboard-theme">
      <Router>
        <Toaster position="bottom-right" expand={true} richColors={true} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
