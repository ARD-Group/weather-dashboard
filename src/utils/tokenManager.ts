import Cookies from "js-cookie";
import { SetStateAction } from "jotai";
import { AuthState } from "./authAtom";
import { refreshToken } from "../apis/api/adapter";

const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const TOKEN_EXPIRY_KEY = "token_expiry";

/**
 * Save authentication tokens to cookies
 */
export const saveTokens = (
  accessToken: string,
  refreshToken: string,
  expiresIn: number
) => {
  const expiryDate = new Date();
  expiryDate.setSeconds(expiryDate.getSeconds() + expiresIn);

  const cookieOptions = {
    expires: expiryDate,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
  };

  Cookies.set(TOKEN_KEY, accessToken, cookieOptions);
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    ...cookieOptions,
    expires: 7,
  }); // Refresh token expires in 7 days
  Cookies.set(TOKEN_EXPIRY_KEY, expiryDate.toISOString(), cookieOptions);
};

/**
 * Retrieve access token from cookies
 */
export const getAccessToken = () => {
  return Cookies.get(TOKEN_KEY);
};

/**
 * Retrieve refresh token from cookies
 */
export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

/**
 * Retrieve token expiry from cookies
 */
export const getTokenExpiry = () => {
  return Cookies.get(TOKEN_EXPIRY_KEY);
};

/**
 * Clear all authentication tokens
 */
export const clearTokens = () => {
  const cookieOptions = {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
  };

  Cookies.remove(TOKEN_KEY, cookieOptions);
  Cookies.remove(REFRESH_TOKEN_KEY, cookieOptions);
  Cookies.remove(TOKEN_EXPIRY_KEY, cookieOptions);
};

/**
 * Check if the access token is expired
 */
export const isTokenExpired = () => {
  const expiry = getTokenExpiry();
  if (!expiry) return true;
  return new Date(expiry) < new Date();
};

/**
 * Initialize authentication state
 * This function does NOT use React hooks and can be called from anywhere
 */
export const initializeAuth = async (
  setAuth: (update: SetStateAction<AuthState>) => void
) => {
  const accessToken = getAccessToken();
  const refreshTokenValue = getRefreshToken();

  if (!accessToken || !refreshTokenValue) {
    clearTokens();
    setAuth({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
    return false;
  }

  if (isTokenExpired()) {
    try {
      // Use the adapter directly instead of a hook
      const response = await refreshToken({ refreshToken: refreshTokenValue });
      
      if (!response || !response.data) {
        clearTokens();
        setAuth({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
        return false;
      }
      
      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn,
      } = response.data;
      
      saveTokens(newAccessToken, newRefreshToken, expiresIn);

      setAuth({
        isAuthenticated: true,
        user: null,
        isLoading: false,
      });
      return true;
    } catch (error) {
      clearTokens();
      setAuth({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
      return false;
    }
  }

  setAuth({
    isAuthenticated: true,
    user: null,
    isLoading: false,
  });
  return true;
};