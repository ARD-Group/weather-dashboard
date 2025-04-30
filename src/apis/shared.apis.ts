import { AxiosRequestConfig } from "axios";

export interface Response<T> {
  statusCode: number;
  message: string;
  _metadata: {
    language: string;
    timestamp: number;
    timezone: string;
    path: string;
    version: string;
    repoVersion: string;
  };
  data: T;
}

export type ApiResShape<T> = Promise<{
  data: Response<T>;
  config: AxiosRequestConfig;
}>;
