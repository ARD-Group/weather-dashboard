import { config } from "../env-config";
import axios, { AxiosError } from "axios";

export const getToken = (): string => {
  const accessToken = localStorage.getItem("core-access-token") ?? undefined;

  return accessToken ? `Bearer ${accessToken}` : "";
};

const API = axios.create({
  baseURL: config.apiUrl,
});

API.interceptors.request.use((config) => {
  config.headers["Authorization"] = getToken();
  config.headers["x-custom-lang"] = "en";
  config.headers["Content-Type"] = "application/json";
  config.headers["accept"] = "application/json";

  return config;
});

// defining a custom error handler for all APIs
const errorHandler = (error: AxiosError) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

API.interceptors.response.use(undefined, (error: AxiosError) => {
  return errorHandler(error);
});

export default API;
