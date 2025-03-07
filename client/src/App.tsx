import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UseAuthContext } from "./context/AuthContext";
import NoteViewPage from "./pages/NoteViewPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import SettingsPage from "./pages/SettingsPage";
import ProfileSettingsComponent from "./components/settings/ProfileSettingsComponent";
import PreferencesSettingsComponent from "./components/settings/PreferencesSettingsComponent";
import LandingPage from "./pages/LandingPage";
// import SplitScreenView from "./pages/SplitScreenView";
import DashboardPage from "./pages/DashboardPage";
import { MagicLoginPage } from "./pages/MagicLoginPage";

const App = () => {
  const { user, userLoading } = UseAuthContext();

  if (userLoading) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Layout>
                <DashboardPage></DashboardPage>
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

        {/* <Route
          path="/notes-split/:noteId1/:noteId2"
          element={
            user ? (
              <Layout>
                <SplitScreenView />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        /> */}

        <Route
          path="/settings"
          element={
            user ? (
              <Layout>
                <SettingsPage></SettingsPage>
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route path="profile" element={user ? <ProfileSettingsComponent></ProfileSettingsComponent> : <Navigate to="/" />}></Route>
          <Route path="preferences" element={user ? <PreferencesSettingsComponent></PreferencesSettingsComponent> : <Navigate to="/" />}></Route>
          <Route path="notifications" element={user ? <ProfileSettingsComponent></ProfileSettingsComponent> : <Navigate to="/" />}></Route>
        </Route>

        <Route path="/" element={!user ? <LandingPage></LandingPage> : <Navigate to="/notes-explorer" />} />

        <Route path="/magic-login" element={!user ? <MagicLoginPage></MagicLoginPage> : <Navigate to="/" />} />

        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
