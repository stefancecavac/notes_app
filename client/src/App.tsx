import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { UseAuthContext } from "./context/AuthContext";
import Layout from "./Layout";
import { DashboardPage } from "./pages/DashboardPage";

const NoteViewPage = lazy(() => import("./pages/NoteViewPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ProfileSettingsComponent = lazy(() => import("./components/settings/ProfileSettingsComponent"));
const PreferencesSettingsComponent = lazy(() => import("./components/settings/PreferencesSettingsComponent"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const MagicLoginPage = lazy(() => import("./pages/MagicLoginPage"));

const App = () => {
  const { user, userLoading } = UseAuthContext();

  if (userLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <span className="loading loading-ring"></span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-screen">
            <span className="loading loading-ring"></span>
          </div>
        }
      >
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />

          <Route
            path="/"
            element={
              user ? (
                <Layout>
                  <DashboardPage />
                </Layout>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/notes/:noteId"
            element={
              user ? (
                <Layout>
                  <NoteViewPage />
                </Layout>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/settings"
            element={
              user ? (
                <Layout>
                  <SettingsPage />
                </Layout>
              ) : (
                <Navigate to="/" />
              )
            }
          >
            <Route path="profile" element={user ? <ProfileSettingsComponent /> : <Navigate to="/" />} />
            <Route path="preferences" element={user ? <PreferencesSettingsComponent /> : <Navigate to="/" />} />
            <Route path="notifications" element={user ? <ProfileSettingsComponent /> : <Navigate to="/" />} />
          </Route>

          <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/" />} />
          <Route path="/magic-login" element={!user ? <MagicLoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
