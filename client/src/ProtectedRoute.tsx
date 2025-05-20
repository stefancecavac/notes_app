import { Navigate } from "react-router-dom";
import { UseAuthContext } from "./context/AuthContext";
import Layout from "./Layout";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, userLoading } = UseAuthContext();

  if (userLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center w-full h-screen">
          <span className="loading loading-ring"></span>
        </div>
      </Layout>
    );
  }

  return user ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
