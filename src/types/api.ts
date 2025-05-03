export interface SignUpResponse {
  data: {
    email: string;
    // Add other fields that come in the response
  };
  // Add other response properties if they exist
}

export interface LoginResponse {
  data: {
    token: string;
    // Add other fields that come in the response
  };
  // Add other response properties if they exist
}

export interface ErrorResponse {
  message: string;
  // Add other error properties if they exist
}
