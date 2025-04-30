import { Button, Input, Typography } from "../../web-building-blocks/Atoms";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyEmail, resendEmail } from "../../apis/api/adapter";
import { Toast } from "../../web-building-blocks/Atoms/Toast/sonner/toast-sonner";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location);

  const { email } = location.state || {};

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      Toast.toastError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail({ email, otp });
      Toast.toastSuccess("Email verified successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      Toast.toastError(
        error?.response?.data?.message ||
          "Failed to verify email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      Toast.toastError("Email not found. Please try signing up again.");
      return;
    }

    setIsLoading(true);
    try {
      await resendEmail({ email });
      Toast.toastSuccess("OTP resent successfully!");
      setTimer(60);
      setCanResend(false);
    } catch (error: any) {
      Toast.toastError(
        error?.response?.data?.message ||
          "Failed to resend OTP. Please try again."
      );
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <Typography className="text-3xl font-bold text-gray-900 mb-2">
            Verify your email
          </Typography>
          <Typography className="text-sm text-gray-600">
            We've sent a verification code to{" "}
            <span className="font-medium text-gray-900">{email}</span>
          </Typography>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <Input
              inputId="otp-id"
              label="Enter OTP"
              onChangeHandler={(e) => setOtp(e)}
              type="text"
              maxLength={6}
              className="text-center text-2xl tracking-widest rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="••••••"
            />
          </div>

          <Button
            buttonStyle={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 transform hover:scale-[1.02]"
            }`}
            dataTestId="verify-button"
            onClick={handleSubmit}
            disabled={isLoading || otp.length !== 6}
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
                Verifying...
              </div>
            ) : (
              "Verify"
            )}
          </Button>

          <div className="text-center">
            <Typography className="text-sm text-gray-600">
              {canResend ? (
                <button
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className={`font-medium ${
                    isLoading
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-blue-600 hover:text-blue-500 transition-colors duration-300"
                  }`}
                >
                  Resend OTP
                </button>
              ) : (
                <span className="text-gray-500">
                  Resend OTP in{" "}
                  <span className="font-medium text-gray-900">{timer}</span>{" "}
                  seconds
                </span>
              )}
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
