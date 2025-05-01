export interface SignUpResponse {}

export interface VerifyEmailResponse {}

export interface ResendEmailResponse {}

export interface LoginResponse {
  tokenType: string;
  roleType: string;
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
