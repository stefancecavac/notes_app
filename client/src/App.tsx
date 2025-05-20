import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import NoteViewPage from "./pages/NoteViewPage";
import SettingsPage from "./pages/SettingsPage";
import ProfileSettingsComponent from "./components/settings/ProfileSettingsComponent";
import PreferencesSettingsComponent from "./components/settings/PreferencesSettingsComponent";
import LandingPage from "./pages/LandingPage";
import MagicLoginPage from "./pages/MagicLoginPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes/:noteId"
          element={
            <ProtectedRoute>
              <Layout>
                <NoteViewPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <SettingsPage />
              </Layout>
            </ProtectedRoute>
          }
        >
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfileSettingsComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="preferences"
            element={
              <ProtectedRoute>
                <PreferencesSettingsComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="notifications"
            element={
              <ProtectedRoute>
                <ProfileSettingsComponent />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path="/magic-login"
          element={
            <PublicRoute>
              <MagicLoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
