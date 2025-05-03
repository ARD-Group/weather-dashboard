import Cookies from "js-cookie";
import {
  saveTokens,
  getAccessToken,
  getRefreshToken,
  clearTokens,
  isTokenExpired,
} from "../tokenManager";

// Mock js-cookie
jest.mock("js-cookie", () => ({
  set: jest.fn(),
  get: jest.fn(),
  remove: jest.fn(),
}));

// Mock axios
jest.mock("axios", () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => ({
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
    })),
  },
  AxiosError: jest.fn(),
}));

// Mock the refreshToken function
jest.mock("../../apis/api/adapter", () => ({
  refreshToken: jest.fn(),
}));

describe("Token Manager", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("saveTokens", () => {
    it("should save tokens with correct options", () => {
      const accessToken = "test-access-token";
      const refreshToken = "test-refresh-token";
      const expiresIn = 3600;

      saveTokens(accessToken, refreshToken, expiresIn);

      expect(Cookies.set).toHaveBeenCalledTimes(3);
      expect(Cookies.set).toHaveBeenCalledWith(
        "access_token",
        accessToken,
        expect.objectContaining({
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        })
      );
    });
  });

  describe("getAccessToken", () => {
    it("should return access token from cookies", () => {
      const mockToken = "test-token";
      (Cookies.get as jest.Mock).mockReturnValue(mockToken);

      const token = getAccessToken();

      expect(Cookies.get).toHaveBeenCalledWith("access_token");
      expect(token).toBe(mockToken);
    });
  });

  describe("getRefreshToken", () => {
    it("should return refresh token from cookies", () => {
      const mockToken = "test-refresh-token";
      (Cookies.get as jest.Mock).mockReturnValue(mockToken);

      const token = getRefreshToken();

      expect(Cookies.get).toHaveBeenCalledWith("refresh_token");
      expect(token).toBe(mockToken);
    });
  });

  describe("clearTokens", () => {
    it("should clear all tokens from cookies", () => {
      clearTokens();

      expect(Cookies.remove).toHaveBeenCalledTimes(3);
      expect(Cookies.remove).toHaveBeenCalledWith("access_token", {
        path: "/",
        sameSite: "lax",
        secure: false,
      });
      expect(Cookies.remove).toHaveBeenCalledWith("refresh_token", {
        path: "/",
        sameSite: "lax",
        secure: false,
      });
      expect(Cookies.remove).toHaveBeenCalledWith("token_expiry", {
        path: "/",
        sameSite: "lax",
        secure: false,
      });
    });
  });

  describe("isTokenExpired", () => {
    it("should return true when token is expired", () => {
      const pastDate = new Date();
      pastDate.setMinutes(pastDate.getMinutes() - 1);
      (Cookies.get as jest.Mock).mockReturnValue(pastDate.toISOString());

      expect(isTokenExpired()).toBe(true);
    });

    it("should return false when token is not expired", () => {
      const futureDate = new Date();
      futureDate.setMinutes(futureDate.getMinutes() + 1);
      (Cookies.get as jest.Mock).mockReturnValue(futureDate.toISOString());

      expect(isTokenExpired()).toBe(false);
    });

    it("should return true when no expiry date is set", () => {
      (Cookies.get as jest.Mock).mockReturnValue(undefined);

      expect(isTokenExpired()).toBe(true);
    });
  });
});
