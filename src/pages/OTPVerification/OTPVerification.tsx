import { Button, Input, Typography } from "../../web-building-blocks/Atoms";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyEmail, resendEmail } from "../../apis/api/adapter";
import { Toast } from "../../web-building-blocks/Atoms/Toast/sonner/toast-sonner";
import Spinner from "../../web-building-blocks/Atoms/Spinner/Spinner";
import { AxiosError } from "axios";
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
    } catch (error: unknown) {
      Toast.toastError(
        ((error as AxiosError)?.response?.data as { message: string })
          ?.message || "Failed to verify email. Please try again."
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
    } catch (error: unknown) {
      Toast.toastError(
        ((error as AxiosError)?.response?.data as { message: string })
          ?.message || "Failed to resend OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-base-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-accent-blue mb-4">
            <svg
              className="h-6 w-6 text-white"
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
          <Typography className="text-3xl font-bold text-primary-dark mb-2">
            Verify Your Email
          </Typography>
          <Typography
            variant="subtitle2"
            className="text-center text-primary-dark"
          >
            Please enter the 6-digit code sent to{" "}
            <span className="font-medium text-accent-blue">{email}</span>
          </Typography>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            inputId="otp-id"
            label="OTP"
            type="text"
            maxLength={6}
            onChangeHandler={(e) => setOtp(e)}
            placeholder="123456"
          />

          <Button
            type="submit"
            buttonStyle={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
              isLoading
                ? "bg-accent-blue/70 cursor-not-allowed"
                : "bg-accent-blue hover:bg-accent-blue-dark transform hover:scale-[1.02]"
            }`}
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="medium" /> : "Verify"}
          </Button>
        </form>

        <Typography
          variant="subtitle2"
          className="text-center text-primary-dark"
        >
          {canResend ? (
            <button
              className="text-accent-blue hover:underline font-medium"
              onClick={handleResendOTP}
              disabled={isLoading}
            >
              Resend OTP
            </button>
          ) : (
            <span className="text-sm">
              You can resend in{" "}
              <span className="font-semibold text-primary-dark">{timer}s</span>
            </span>
          )}
        </Typography>
      </div>
    </div>
  );
};

export default OTPVerification;
