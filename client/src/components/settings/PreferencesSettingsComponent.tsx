import { useDarkModeStore } from "../../Stores/useDarkModeStore";

const PreferencesSettingsComponent = () => {
  const { darkMode, toggleTheme } = useDarkModeStore();

  return (
    <div className="flex-1 px-20">
      <h2 className="text-xl font-bold">Preferences Information</h2>
      <p className="text-gray-500 mt-2">Update your appearance details here</p>
      <div className="my-5 py-5 border-t-2">
        <div className="flex items-center justify-between ">
          <div className="flex flex-col  justify-between">
            <p className="text-gray-700">Toggle Dark mode</p>
            <p className="text-neutral-400 text-sm  ">Toggle dark mode on and off here</p>
          </div>
          <label className="inline-flex items-center mb-5 cursor-pointer">
            <input onChange={toggleTheme} type="checkbox" checked={darkMode} className="sr-only peer" />
            <div className="relative w-11 h-6 bg-neutral-300 peer-focus:outline-none   rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-neutral-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSettingsComponent;
