import {
  LoginResponse,
  ResendEmailResponse,
  SignUpResponse,
  VerifyEmailResponse,
  RefreshTokenResponse,
} from "./types";
import {
  loginEndpoint,
  resendEmailEndpoint,
  signUpEndpoint,
  verifyEmailEndpoint,
  refreshTokenEndpoint,
  loginWithGoogleEndpoint,
} from "./endpoints";
import { Response } from "../shared.apis";

export const loginWithGoogle = async (args: {
  token: string;
}): Promise<Response<LoginResponse>> => {
  const query = await loginWithGoogleEndpoint(args);
  return query.data;
};


export const signUp = async (args: {
  email: string;
  password: string;
  name: string;
}): Promise<Response<SignUpResponse>> => {
  const query = await signUpEndpoint(args);
  return query.data;
};

export const verifyEmail = async (args: {
  email: string;
  otp: string;
}): Promise<Response<VerifyEmailResponse>> => {
  const query = await verifyEmailEndpoint(args);
  return query.data;
};

export const resendEmail = async (args: {
  email: string;
}): Promise<Response<ResendEmailResponse>> => {
  const query = await resendEmailEndpoint(args);
  return query.data;
};

export const login = async (args: {
  email: string;
  password: string;
}): Promise<Response<LoginResponse>> => {
  const query = await loginEndpoint(args);
  return query.data;
};

export const refreshToken = async (args: {
  refreshToken: string;
}): Promise<Response<RefreshTokenResponse>> => {
  const query = await refreshTokenEndpoint(args);
  return query.data;
};
