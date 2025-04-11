import { useEffect } from "react";
import PreferencesSettingsComponent from "../components/settings/PreferencesSettingsComponent";

const SettingsPage = () => {
  useEffect(() => {
    const favicon = document.getElementById("favicon") as HTMLLinkElement | null;

    if (favicon) {
      favicon.href = "/pencil.png";
      favicon.type = "image/svg+xml";
    }
  }, []);

  return (
    <div className="flex flex-col h-full w-full ">
      <div className="p-5 px-20">
        <h2 className="text-3xl font-bold text-base-content">Settings</h2>
        <p className="text-info-content mt-2">Customize the settings for your need</p>
        <div className="flex mt-20 ">
          <PreferencesSettingsComponent />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
