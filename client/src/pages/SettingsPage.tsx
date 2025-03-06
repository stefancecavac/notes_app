import ExpandNavbarButton from "../components/navbar/ExpandNavbarButton";
import PreferencesSettingsComponent from "../components/settings/PreferencesSettingsComponent";
import { useNavbarExpandedStore } from "../Stores/useNavbarExpandedStore";

const SettingsPage = () => {
  const { toggleExpanded, expanded } = useNavbarExpandedStore();

  return (
    <div className="flex flex-col h-full w-full ">
      <div className={`m-1 my-2 ${expanded ? "" : ""} `}>{!expanded && <ExpandNavbarButton setExpanded={toggleExpanded} />} </div>

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
