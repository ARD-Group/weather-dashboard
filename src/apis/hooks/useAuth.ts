import { useQuery } from "@tanstack/react-query";
import {
  login,
  verifyEmail,
  resendEmail,
  loginWithGoogle,
  signUp,
  refreshToken,
  weatherSearch,
  weatherCurrent,
} from "../api/adapter";
import { WeatherSearchResponse, WeatherCurrentResponse } from "../api/types";
import { Response } from "../shared.apis";

/**
 * Weather Search hook - handles location search functionality
 */
export const useWeatherSearch = (query: string, enabled = true) => {
  const result = useQuery<Response<WeatherSearchResponse[]>, Error>({
    queryKey: ["weatherSearch", query],
    queryFn: () => weatherSearch({ q: query }),
    enabled: !!query && enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    data: result.data?.data || [],
    loading: result.isLoading,
    error: result.error?.message || null,
    isError: result.isError,
    isFetching: result.isFetching,
    refetch: result.refetch,
  };
};

/**
 * Weather Current hook - handles weather data fetching for a specific location
 */
export const useWeatherCurrent = (location: string) => {
  const result = useQuery<Response<WeatherCurrentResponse>, Error>({
    queryKey: ["weatherCurrent", location],
    queryFn: () => weatherCurrent({ location }),
    enabled: !!location,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });

  return {
    data: result.data?.data || null,
    loading: result.isLoading,
    error: result.error?.message || null,
    isError: result.isError,
    isFetching: result.isFetching,
    refetch: result.refetch,
  };
};

/**
 * Auth hooks for login, signup, verification
 */
export const useLogin = () => {
  return {
    login: async (email: string, password: string) => {
      try {
        const response = await login({ email, password });
        return { data: response.data, error: null };
      } catch (error) {
        return { data: null, error: (error as Error).message };
      }
    },
  };
};

export const useGoogleLogin = () => {
  return {
    loginWithGoogle: async (token: string) => {
      try {
        const response = await loginWithGoogle({ token });
        return { data: response.data, error: null };
      } catch (error) {
        return { data: null, error: (error as Error).message };
      }
    },
  };
};

export const useSignUp = () => {
  return {
    signUp: async (email: string, password: string, name: string) => {
      try {
        const response = await signUp({ email, password, name });
        return { data: response.data, error: null };
      } catch (error) {
        return { data: null, error: (error as Error).message };
      }
    },
  };
};

export const useEmailVerification = () => {
  return {
    verifyEmail: async (email: string, otp: string) => {
      try {
        const response = await verifyEmail({ email, otp });
        return { data: response.data, error: null };
      } catch (error) {
        return { data: null, error: (error as Error).message };
      }
    },
    resendEmail: async (email: string) => {
      try {
        const response = await resendEmail({ email });
        return { data: response.data, error: null };
      } catch (error) {
        return { data: null, error: (error as Error).message };
      }
    },
  };
};

export const useRefreshToken = () => {
  return {
    refreshToken: async (refreshTokenValue: string) => {
      try {
        const response = await refreshToken({
          refreshToken: refreshTokenValue,
        });
        return { data: response.data, error: null };
      } catch (error) {
        return { data: null, error: (error as Error).message };
      }
    },
  };
};
