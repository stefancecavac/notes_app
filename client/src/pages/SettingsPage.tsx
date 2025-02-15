import PreferencesSettingsComponent from "../components/settings/PreferencesSettingsComponent";

const SettingsPage = () => {
  return (
    <div className="flex flex-col h-full w-full p-5 px-20">
      <h2 className="text-3xl font-bold text-base-content">Settings</h2>
      <p className="text-info-content mt-2">Customize the settings for your need</p>
      <div className="flex mt-20 ">
        <PreferencesSettingsComponent />
      </div>
    </div>
  );
};

export default SettingsPage;
