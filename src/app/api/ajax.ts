// lib/api/ajax.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_CONSTANTS, API_METHODS } from "@/constants/api-constants";
import { getSession, signIn, signOut } from "next-auth/react";
import { handleLogout } from "@/utils/sharedFunctions";
import { ROUTES } from "@/constants/app-constants";

declare module "axios" {
  export interface AxiosRequestConfig {
    isServerSide?: boolean;
    _retry?: boolean;
  }
}

// Create a single axios instance
const axiosInstance = axios.create();
// Main fetch function
export const fetchCall = async <T>(
  url: string,
  method: string,
  payload: any = {},
  callback: (res: T | any) => void = () => {},
  isServerSide: boolean = false,
  clientToken?: string
): Promise<void> => {
  let accessToken: string | undefined;

  if (clientToken) {
    accessToken = clientToken;
  } else if (isServerSide) {
    const session = await getServerSession(authOptions);
    accessToken = session?.accessToken;
  } else {
    if (typeof window !== "undefined") {
      const session = await getSession();
      accessToken = session?.accessToken ?? "";
    }
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (!url.includes(API_CONSTANTS.TOKEN) && accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const options = {
    method,
    url,
    headers,
    ...(method !== API_METHODS.GET ? { data: payload } : { params: payload }),
    isServerSide,
  };

  try {
    const response = await axiosInstance(options);
    callback(response.data);
  } catch (error: any) {
    if (error?.response?.status === 400) {
      callback(error.response.data);
    } else {
      callback(error);
    }
  }
};

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401: Try refresh token if not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        let refreshToken;
        if (originalRequest?.isServerSide) {
          const session = await getServerSession(authOptions);
          refreshToken = session?.refreshToken;
        } else {
          if (typeof window !== "undefined") {
            const session = await getSession();
            refreshToken = session?.refreshToken ?? "";
          }
        }

        const refreshResponse: any = await axios.get(
          API_CONSTANTS.REFRESH_TOKEN,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        if (refreshResponse?.status === 200) {
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

          if (result?.ok) {
            const newAccessToken = tokenData?.access_token;
            if (newAccessToken) {
              // Save new token wherever appropriate
              if (typeof window !== "undefined") {
                localStorage.setItem("accessToken", newAccessToken);
              }
  
              // Update the original request with new token
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${newAccessToken}`,
              };
              return axiosInstance(originalRequest);
            }
          } else {
            handleLogout(ROUTES.LOGIN);
          }
        } else {
          handleLogout(ROUTES.LOGIN);
        }
      } catch (refreshError: any) {
        if (refreshError?.status === 401) {
          handleLogout(ROUTES.LOGIN);
        }
        // If refresh also fails, log out
        return Promise.reject(refreshError);
      }
    }

    // Handle 400 after retry (token still invalid)
    if (error.response?.status === 400 && originalRequest._retry) {
      // You might want to store a fallback token or show a message
      return Promise.reject(error);
    }

    // Any other error: logout
    return Promise.reject(error);
  }
);
