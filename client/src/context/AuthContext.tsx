import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useLayoutEffect, useState } from "react";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../api/AuthApi";
import { userData } from "../dataTypes";
import { axiosInstance } from "../config/ApiClient";
import { AxiosError, InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

type AuthContextType = {
  user?: userData;
  userLoading: boolean;
  accessToken: string | null;
  register: (data: userData) => void;
  login: (data: userData) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: Infinity,
  });

  const { mutate: login } = useMutation({
    mutationKey: ["auth"],
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const { mutate: register } = useMutation({
    mutationKey: ["auth"],
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const { mutate: logout } = useMutation({
    mutationKey: ["auth"],
    mutationFn: logoutUser,
    onSuccess: () => {
      setAccessToken(null);
      queryClient.setQueryData(["auth"], null);
    },
  });

  useLayoutEffect(() => {
    const authInterceptor = axiosInstance.interceptors.request.use((config: CustomAxiosRequestConfig) => {
      config.headers.Authorization = accessToken && !config._retry ? `Bearer ${accessToken}` : config.headers.Authorization;
      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(authInterceptor);
    };
  }, [accessToken]);

  useLayoutEffect(() => {
    const refreshInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response.status === 401) {
          originalRequest._retry = true;

          try {
            const response = await axiosInstance.post("/api/auth/refresh-token");
            const newAccessToken = response.data.accessToken;
            setAccessToken(newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          } catch (err) {
            const axiosError = err as AxiosError;

            if (axiosError.response?.status === 403) {
              setAccessToken(null);
              logout();
            }
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(refreshInterceptor);
    };
  }, [accessToken]);

  return <AuthContext.Provider value={{ user, userLoading, accessToken, register, login, logout }}>{children}</AuthContext.Provider>;
};

export const UseAuthContext = () => {
  const context = useContext(AuthContext);
  return context as AuthContextType;
};
