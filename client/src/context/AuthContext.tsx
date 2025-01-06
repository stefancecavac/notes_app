import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../api/AuthApi";
import { userData } from "../dataTypes";

type AuthContextType = {
  user?: userData;
  userLoading: boolean;
  register: (data: userData) => void;
  login: (data: userData) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: getCurrentUser,
    retry: false,
  });

  const { mutate: register } = useMutation({
    mutationKey: ["auth"],
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const { mutate: login } = useMutation({
    mutationKey: ["auth"],
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const { mutate: logout } = useMutation({
    mutationKey: ["auth"],
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth"] });
    },
  });

  console.log(user);

  return <AuthContext.Provider value={{ user, userLoading, register, login, logout }}>{children}</AuthContext.Provider>;
};

export const UseAuthContext = () => {
  const context = useContext(AuthContext);
  return context as AuthContextType;
};
