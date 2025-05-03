import {
  LoginResponse,
  ResendEmailResponse,
  SignUpResponse,
  VerifyEmailResponse,
  RefreshTokenResponse,
  WeatherSearchResponse,
  WeatherCurrentResponse,
} from "./types";
import {
  loginEndpoint,
  resendEmailEndpoint,
  signUpEndpoint,
  verifyEmailEndpoint,
  refreshTokenEndpoint,
  loginWithGoogleEndpoint,
  weatherSearchEndpoint,
  weatherCurrentEndpoint,
} from "./endpoints";
import { Response } from "../shared.apis";

/**
 * Default value for weather current response
 */
const defaultWeatherCurrentResponse: WeatherCurrentResponse = {
  location: {
    name: "",
    country: "",
    localtime: "",
    tz: "",
  },
  current: {
    temp_c: 0,
    feels_like_c: 0,
    condition: "",
    humidity: 0,
    wind_kph: 0,
    pressure_mb: 0,
    uv: 0,
    icon: "",
    astronomy: {
      sunrise: "",
      sunset: ""
    }
  },
  daily_forecast: []
};

/**
 * Auth endpoints
 */
export const loginWithGoogle = async (args: {
  token: string;
}): Promise<Response<LoginResponse>> => {
  try {
    const query = await loginWithGoogleEndpoint(args);
    return query.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (args: {
  email: string;
  password: string;
  name: string;
}): Promise<Response<SignUpResponse>> => {
  try {
    const query = await signUpEndpoint(args);
    return query.data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (args: {
  email: string;
  otp: string;
}): Promise<Response<VerifyEmailResponse>> => {
  try {
    const query = await verifyEmailEndpoint(args);
    return query.data;
  } catch (error) {
    throw error;
  }
};

export const resendEmail = async (args: {
  email: string;
}): Promise<Response<ResendEmailResponse>> => {
  try {
    const query = await resendEmailEndpoint(args);
    return query.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (args: {
  email: string;
  password: string;
}): Promise<Response<LoginResponse>> => {
  try {
    const query = await loginEndpoint(args);
    return query.data;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (args: {
  refreshToken: string;
}): Promise<Response<RefreshTokenResponse>> => {
  try {
    const query = await refreshTokenEndpoint(args);
    return query.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Weather endpoints with default values
 */
export const weatherSearch = async (args: {
  q: string;
}): Promise<Response<WeatherSearchResponse[]>> => {
  try {
    const query = await weatherSearchEndpoint(args);
    return {
      ...query.data,
      data: query.data.data || [] // Provide default empty array
    };
  } catch (error) {
    throw error;
  }
};

export const weatherCurrent = async (args: {
  location: string;
}): Promise<Response<WeatherCurrentResponse>> => {
  try {
    const query = await weatherCurrentEndpoint(args);
    return {
      ...query.data,
      data: query.data.data || defaultWeatherCurrentResponse // Provide default response
    };
  } catch (error) {
    throw error;
  }
};