import { userData } from "../dataTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (data: userData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json as userData;
};

export const loginUser = async (data: userData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json as userData;
};

export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const getCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json as userData;
};
