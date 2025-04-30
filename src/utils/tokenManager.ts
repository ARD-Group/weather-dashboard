import Cookies from "js-cookie";
import { SetStateAction } from "jotai";
import { AuthState } from "../atoms/authAtom";

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

  Cookies.set(TOKEN_KEY, accessToken, { expires: expiryDate });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 7 }); // Refresh token expires in 7 days
  Cookies.set(TOKEN_EXPIRY_KEY, expiryDate.toISOString(), {
    expires: expiryDate,
  });
};

export const getAccessToken = () => Cookies.get(TOKEN_KEY);
export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_KEY);
export const getTokenExpiry = () => Cookies.get(TOKEN_EXPIRY_KEY);

export const clearTokens = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
  Cookies.remove(TOKEN_EXPIRY_KEY);
};

export const isTokenExpired = () => {
  const expiry = getTokenExpiry();
  if (!expiry) return true;
  return new Date(expiry) < new Date();
};

export const initializeAuth = (
  setAuth: (update: SetStateAction<AuthState>) => void
) => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (accessToken && refreshToken && !isTokenExpired()) {
    setAuth({
      isAuthenticated: true,
      user: null, // You might want to decode the JWT token to get user info
      isLoading: false,
    });
    return true;
  }

  clearTokens();
  setAuth({
    isAuthenticated: false,
    user: null,
    isLoading: false,
  });
  return false;
};
