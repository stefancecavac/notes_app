import { userData } from "../dataTypes";
import { axiosInstance } from "./api";

export const registerUser = async (data: userData) => {
  try {
    const response = await axiosInstance.post(`/api/auth/register`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (data: userData) => {
  try {
    const response = await axiosInstance.post(`/api/auth/login`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post(`/api/auth/logout`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

// Refresh token API
export const refreshTokenApi = async () => {
  try {
    const response = await axiosInstance.post(`/api/auth/refresh-token`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Token refresh failed");
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(`/api/auth/user`);
    return response.data as userData;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error fetching user");
  }
};
