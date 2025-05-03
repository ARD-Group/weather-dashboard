import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { signUp } from "../../apis/api/adapter";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../../web-building-blocks/Atoms/Spinner/Spinner";
import Button from "../../web-building-blocks/Atoms/Button/Button";
import { AxiosError } from "axios";
const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: (response) => {
      navigate("/verify-otp", { state: { email: response.data } });
      toast.success("Signup successful! Please verify your email.");
    },
    onError: (error: unknown) => {
      const errorMessage = String(
        typeof (error as AxiosError)?.response?.data === "string"
          ? (error as AxiosError)?.response?.data
          : "Signup failed. Please try again."
      );
      toast.error(errorMessage);
    },
  });

  // We'll comment out this function since it's not used currently
  // but we're keeping it for future implementation
  /*
  const handleGoogleLogin = async () => {
    // Google login implementation  
    // Will be implemented in the future
  };
  */

  const onSubmit = (data: FormValues) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign up</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <a
              href="/login"
              className="font-medium text-accent-blue hover:text-accent-blue-dark"
            >
              sign in to your account
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="">
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              buttonStyle={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
                signupMutation.isPending
                  ? "bg-accent-blue/70 cursor-not-allowed"
                  : "bg-accent-blue hover:bg-accent-blue-dark transform hover:scale-[1.02]"
              }`}
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? <Spinner size="medium" /> : "Sign up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
