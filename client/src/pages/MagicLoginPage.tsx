import { useLocation, useNavigate } from "react-router-dom";
import { UseAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { useThemeChangerStore } from "../Stores/useThemeChangerStore";

const MagicLoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useThemeChangerStore();

  const { verifyMagicLink } = UseAuthContext();

  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token");

  useEffect(() => {
    if (!token) {
      return;
    }

    const loginUser = async () => {
      try {
        verifyMagicLink(token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } catch {
        return;
      }
    };

    loginUser();
  }, [token, navigate, verifyMagicLink]);
  if (!token) {
    return <p>Invalid or expired magic link.</p>;
  }

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4 ${
        darkMode ? "tron-grid" : "tron-grid-light"
      }`}
    >
      <div className="w-full max-w-md shadow-lg bg-base-100 rounded-lg p-2">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-base-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-primary-content">Magic Link Confirmed</div>
          <div className="text-info-content mt-2">Your authentication was successful</div>
        </div>
        <div className="text-center my-5 flex items-center justify-center gap-3 text-info-content">
          <p>Redirecting</p>
          <span className="loading-spinner loading"></span>
        </div>
      </div>
    </div>
  );
};

export default MagicLoginPage;
