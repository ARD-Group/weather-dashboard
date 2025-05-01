import { Button, Input, Typography } from "../../web-building-blocks/Atoms";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, loginWithGoogle } from "../../apis/api/adapter";
import { Toast } from "../../web-building-blocks/Atoms/Toast/sonner/toast-sonner";
import { saveTokens } from "../../utils/tokenManager";
import { useAtom } from "jotai";
import { authAtom } from "../../utils/authAtom";

export interface User {
  email: string;
  name?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [, setAuth] = useAtom(authAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      Toast.toastError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await login({ email, password });
      const { accessToken, refreshToken, expiresIn } = data;
      saveTokens(accessToken, refreshToken, expiresIn);

      // Set auth state
      setAuth({
        isAuthenticated: true,
        user: { email },
        isLoading: false,
      });

      Toast.toastSuccess("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      Toast.toastError(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Google login logic
      console.log("Google login attempt");
      // Simulate API call
      const { data } = await loginWithGoogle({ token: "google-token" });
      const { accessToken, refreshToken, expiresIn } = data;
      saveTokens(accessToken, refreshToken, expiresIn);

      Toast.toastSuccess("Google login successful!");

      // Set auth state for Google login too
      setAuth({
        isAuthenticated: true,
        user: { email: "google-user@example.com" }, // This will be replaced with actual Google user data
        isLoading: false,
      });

      navigate("/dashboard");
    } catch (error: any) {
      Toast.toastError("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <Typography className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </Typography>
          <Typography className="text-sm text-gray-600">
            Sign in to access your weather dashboard
          </Typography>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              inputId="email-id"
              label="Email"
              onChangeHandler={(e) => setEmail(e)}
              type="email"
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="john@example.com"
            />
            <Input
              inputId="password-id"
              label="Password"
              onChangeHandler={(e) => setPassword(e)}
              type="password"
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <Button
            buttonStyle={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 transform hover:scale-[1.02]"
            }`}
            dataTestId="button-1"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </div>
            ) : (
              "Sign in"
            )}
          </Button>

          {/* TODO: Add Google login */}
          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            buttonStyle={`w-full py-3 px-4 rounded-lg border border-gray-300 font-medium transition-all duration-300 ${
              isLoading
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-white hover:bg-gray-50 transform hover:scale-[1.02]"
            }`}
            dataTestId="google-button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </div>
          </Button> */}
        </form>

        <div className="text-center">
          <Typography className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
            >
              Sign up
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Login;
