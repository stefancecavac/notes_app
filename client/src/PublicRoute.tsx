import React from "react";
import { Navigate } from "react-router-dom";
import { UseAuthContext } from "./context/AuthContext";

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, userLoading } = UseAuthContext();

  if (userLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <span className="loading loading-ring"></span>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
