import "./App.css";
import "./index.css";
import "./styles/theme.css";

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "./atoms/authAtom";
import { Login, Signup, Dashboard } from "./pages";
import OTPVerification from "./pages/OTPVerification/OTPVerification";
import { Toaster } from "sonner";
import { initializeAuth } from "./utils/tokenManager";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth] = useAtom(authAtom);

  // if (!auth.isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return <>{children}</>;
};

function App() {
  const [, setAuth] = useAtom(authAtom);

  useEffect(() => {
    initializeAuth(setAuth);
  }, [setAuth]);

  return (
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
  );
}

export default App;
