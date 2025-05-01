import Cookies from "js-cookie";
import { SetStateAction } from "jotai";
import { AuthState } from "./authAtom";
import { refreshToken } from "../apis/api/adapter";

const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const TOKEN_EXPIRY_KEY = "token_expiry";

export const saveTokens = (
  accessToken: string,
  refreshToken: string,
  expiresIn: number
) => {
  const expiryDate = new Date();
  expiryDate.setSeconds(expiryDate.getSeconds() + expiresIn);

  console.log("Saving tokens:", {
    accessToken,
    refreshToken,
    expiresIn,
    expiryDate,
  });

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

export const getAccessToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  console.log("Getting access token:", token);
  return token;
};

export const getRefreshToken = () => {
  const token = Cookies.get(REFRESH_TOKEN_KEY);
  console.log("Getting refresh token:", token);
  return token;
};

export const getTokenExpiry = () => {
  const expiry = Cookies.get(TOKEN_EXPIRY_KEY);
  console.log("Getting token expiry:", expiry);
  return expiry;
};

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

export const isTokenExpired = () => {
  const expiry = getTokenExpiry();
  if (!expiry) return true;
  return new Date(expiry) < new Date();
};

export const initializeAuth = async (
  setAuth: (update: SetStateAction<AuthState>) => void
) => {
  console.log("Initializing auth...");
  const accessToken = getAccessToken();
  const refreshTokenValue = getRefreshToken();
  const tokenExpiry = getTokenExpiry();

  console.log("Auth state:", { accessToken, refreshTokenValue, tokenExpiry });

  if (!accessToken || !refreshTokenValue) {
    console.log("No tokens found, clearing auth");
    clearTokens();
    setAuth({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
    return false;
  }

  if (isTokenExpired()) {
    console.log("Token expired, attempting refresh");
    try {
      const { data } = await refreshToken({ refreshToken: refreshTokenValue });
      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn,
      } = data;
      saveTokens(newAccessToken, newRefreshToken, expiresIn);

      setAuth({
        isAuthenticated: true,
        user: null,
        isLoading: false,
      });
      console.log("Token refresh successful");
      return true;
    } catch (error) {
      console.error("Token refresh failed:", error);
      clearTokens();
      setAuth({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
      return false;
    }
  }

  console.log("Token valid, setting authenticated state");
  setAuth({
    isAuthenticated: true,
    user: null,
    isLoading: false,
  });
  return true;
};
