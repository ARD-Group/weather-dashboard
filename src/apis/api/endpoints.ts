import { LoginResponse, SignUpResponse, VerifyEmailResponse } from "./types";
import API from "../config";
import { ApiResShape, Response } from "../shared.apis";

export const signUpEndpoint = async (args: {
  email: string;
  password: string;
  name: string;
}): Promise<ApiResShape<SignUpResponse>> => {
  const response = await API.post<Response<SignUpResponse>>(
    "/public/auth/sign-up",
    args
  );
  return response;
};

export const verifyEmailEndpoint = async (args: {
  email: string;
  otp: string;
}): Promise<ApiResShape<VerifyEmailResponse>> => {
  const response = await API.post<Response<VerifyEmailResponse>>(
    "/user/verification/verify/email",
    args
  );
  return response;
};

export const resendEmailEndpoint = async (args: {
  email: string;
}): Promise<ApiResShape<VerifyEmailResponse>> => {
  const response = await API.post<Response<VerifyEmailResponse>>(
    "/user/verification/resend/email",
    args
  );
  return response;
};

export const loginEndpoint = async (args: {
  email: string;
  password: string;
}): Promise<ApiResShape<LoginResponse>> => {
  const response = await API.post<Response<LoginResponse>>(
    "/public/auth/login/credential",
    args
  );
  return response;
};

export const refreshTokenEndpoint = async (args: {
  refreshToken: string;
}): Promise<ApiResShape<LoginResponse>> => {
  const response = await API.post<Response<LoginResponse>>(
    "/shared/auth/refresh",
    args
  );
  return response;
};

export const loginWithGoogleEndpoint = async (args: {
  token: string;
}): Promise<ApiResShape<LoginResponse>> => {
  const response = await API.post<Response<LoginResponse>>(
    "/public/auth/login/social/google",
    args
  );
  return response;
};
