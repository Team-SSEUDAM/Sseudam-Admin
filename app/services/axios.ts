import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';

export interface ApiResponse<Data = unknown> {
  success: boolean;
  status: number;
  data: Data | null;
  timestamp: string;
}

export interface ErrorResponse {
  errorClassName: string;
  message: string;
}

export interface ApiErrorResponse extends ApiResponse<ErrorResponse> {}

export const BASE_URL = process.env.NEXT_PUBLIC_SERVER_API;
const BASE_TIMEOUT = 10000;

let cachedTokens: { accessToken?: string; refreshToken?: string } = {};

const getTokens = async () => {
  if (cachedTokens.accessToken) return cachedTokens;
  // fetch from storage, then:
  // const { accessToken, refreshToken } = readFromLocalStorage();
  // cachedTokens = { accessToken, refreshToken };
  return cachedTokens;
};

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config) => {
      const { accessToken, refreshToken } = await getTokens();
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      if (refreshToken) {
        config.headers = config.headers || {};
        config.headers['Refresh-Token'] = `Bearer ${refreshToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response?.data,
    (error) => Promise.reject(error),
  );

  return instance;
};

const axiosInstance = setInterceptors(
  axios.create({
    timeout: BASE_TIMEOUT,
    baseURL: BASE_URL,
    withCredentials: true,
  }),
);

export default axiosInstance;

export interface ApiServerError extends Omit<AxiosError<ApiErrorResponse>, 'response'> {
  response: AxiosResponse<ApiErrorResponse>;
}

export const isApiServerError = (e: any): e is ApiServerError => {
  if (!e) return false;
  if (axios.isAxiosError(e)) {
    if (!e.response) return false;
    const data = e.response.data;
    return (
      typeof data === 'object' &&
      'success' in data &&
      'status' in data &&
      'data' in data &&
      'timestamp' in data
    );
  }
  return false;
}; 