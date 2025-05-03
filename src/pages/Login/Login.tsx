import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { login } from "../../apis/api/adapter";
import { authAtom } from "../../utils/authAtom";
import { saveTokens } from "../../utils/tokenManager";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../../web-building-blocks/Atoms/Spinner/Spinner";
import Button from "../../web-building-blocks/Atoms/Button/Button";
import { AxiosError } from "axios";
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof schema>;

const Login: React.FC = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth.isAuthenticated, navigate]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return login({ email: data.email, password: data.password });
    },
    onSuccess: (response) => {
      if (response && response.data) {
        const { accessToken, refreshToken, expiresIn } = response.data;
        saveTokens(accessToken, refreshToken, expiresIn);
        setAuth({ isAuthenticated: true, user: null, isLoading: false });
        navigate("/dashboard");
        toast.success("Login successful!");
      }
    },
    onError: (error: unknown) => {
      const errorMessage = String(
        typeof (error as AxiosError)?.response?.data === "string"
          ? (error as AxiosError)?.response?.data
          : "Login failed. Please try again."
      );
      toast.error(errorMessage);
    },
  });

  // For potential future use - keeping in the code but properly handled for linting
  // const googleLoginMutation = useMutation({
  //   mutationFn: async (token: string) => {
  //     return loginWithGoogle({ token });
  //   },
  //   onSuccess: (response) => {
  //     if (response && response.data) {
  //       const { accessToken, refreshToken, expiresIn } = response.data;
  //       saveTokens(accessToken, refreshToken, expiresIn);
  //       setAuth({ isAuthenticated: true, user: null, isLoading: false });
  //       navigate("/dashboard");
  //       toast.success("Google login successful!");
  //     }
  //   },
  //   onError: (error: any) => {
  //     toast.error(error.message || "Google login failed. Please try again.");
  //   }
  // });

  const onSubmit = async (data: FormValues) => {
    loginMutation.mutate(data);
  };

  // We'll comment out this function since it's not used currently
  // but we're keeping it for future implementation
  /*
  const handleGoogleLogin = async () => {
    // Google login implementation
    // Will be implemented in the future
  };
  */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign in</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <a
              href="/signup"
              className="font-medium text-accent-blue hover:text-accent-blue-dark"
            >
              create a new account
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
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
          </div>

          {/*        TODO: Add remember me and forgot password


           <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div> */}

          <div>
            <Button
              type="submit"
              buttonStyle={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
                loginMutation.isPending
                  ? "bg-accent-blue/70 cursor-not-allowed"
                  : "bg-accent-blue hover:bg-accent-blue-dark transform hover:scale-[1.02]"
              }`}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? <Spinner size="medium" /> : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;