import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { getSession, signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

import { API_CONSTANTS, API_METHODS } from "@/constants/api-constants";
import { handleLogout } from "@/utils/sharedFunctions";
import { ROUTES } from "@/constants/app-constants";

declare module "axios" {
  export interface AxiosRequestConfig {
    isServerSide?: boolean;
    _retry?: boolean;
  }
}

type FailedQueueItem = {
  resolve: (token: string) => void;
  reject: (error: any) => void;
};

const axiosInstance = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshAxios = axios.create();

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

const getAccessToken = async (isServerSide?: boolean, clientToken?: string) => {
  if (clientToken) {
    return clientToken;
  }

  if (isServerSide) {
    const session = await getServerSession(authOptions);
    return session?.accessToken;
  }

  const session = await getSession();
  return session?.accessToken;
};

const getRefreshToken = async (isServerSide?: boolean) => {
  if (isServerSide) {
    const session = await getServerSession(authOptions);
    return session?.refreshToken;
  }

  const session = await getSession();
  return session?.refreshToken;
};

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAccessToken(config.isServerSide);

    if (token && !config.url?.includes(API_CONSTANTS.TOKEN)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }

              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken(
          originalRequest.isServerSide,
        );

        if (!refreshToken) {
          if (originalRequest.isServerSide) {
            handleLogout();
            redirect(ROUTES.HOME);
          } else {
            handleLogout(ROUTES.HOME);
          }
          return Promise.reject(error);
        }

        const refreshResponse = await refreshAxios.get(
          API_CONSTANTS.REFRESH_TOKEN,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        const userData = refreshResponse?.data?.content?.user_data;

        const tokenData = refreshResponse?.data?.content?.token;

        const result = await signIn("credentials", {
          redirect: false,
          accessToken: tokenData?.access_token,
          refreshToken: tokenData?.refresh_token,
          userId: userData?.id,
          userName: userData?.username,
          emailId: userData?.email,
          role: userData?.role,
          isLoggedIn: true,
        });

        if (!result?.ok) {
          if (originalRequest.isServerSide) {
            handleLogout();
            redirect(ROUTES.HOME);
          } else {
            handleLogout(ROUTES.HOME);
          }
          return Promise.reject(error);
        }

        const newAccessToken = tokenData?.access_token;

        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        if (originalRequest.isServerSide) {
          handleLogout();
          redirect(ROUTES.HOME);
        } else {
          handleLogout(ROUTES.HOME);
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export const fetchCall = async <T>({
  url,
  method = API_METHODS.GET,
  payload,
  headers = {},
  isServerSide = false,
  clientToken,
}: {
  url: string;
  method?: string;
  payload?: any;
  headers?: any;
  isServerSide?: boolean;
  clientToken?: string;
}): Promise<T> => {
  const accessToken = await getAccessToken(isServerSide, clientToken);

  const response = await axiosInstance({
    url,
    method,
    isServerSide,
    headers: {
      ...headers,
      ...(accessToken && !url.includes(API_CONSTANTS.TOKEN)
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {}),
    },
    ...(method === API_METHODS.GET ? { params: payload } : { data: payload }),
  });

  return response.data;
};

export default axiosInstance;
