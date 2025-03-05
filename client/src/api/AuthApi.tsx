import { userData } from "../dataTypes";
import { axiosInstance } from "../config/ApiClient";
import { AxiosError } from "axios";

export const registerUser = async (email: string) => {
  try {
    const response = await axiosInstance.post(`/api/auth/magicLink`, { email });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (token: string) => {
  try {
    const response = await axiosInstance.post(`/api/auth/verify-magicLink`, { token });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    throw new Error(axiosError.response?.data?.message || "Login failed");
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post(`/api/auth/logout`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    throw new Error(axiosError.response?.data?.message || "Logout failed");
  }
};

export const refreshTokenApi = async () => {
  try {
    const response = await axiosInstance.post(`/api/auth/refresh-token`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    throw new Error(axiosError.response?.data?.message || "Token refresh failed");
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(`/api/auth/user`);
    return response.data as userData;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    throw new Error(axiosError.response?.data?.message || "Error fetching user");
  }
};
