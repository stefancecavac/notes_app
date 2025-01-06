import { NavLink, Outlet } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div className="flex flex-col h-full p-5 px-20">
      <h2 className="text-3xl font-bold">Settings</h2>
      <p className="text-gray-500 mt-2">Customize the settings for your need</p>
      <div className="flex mt-5 ">
        <div className="flex flex-col flex-1 w-1/6 gap-3 mt-14">
          <NavLink
            to={"profile"}
            className={({ isActive }) =>
              `  text-gray-500 hover:bg-neutral-100 transition-all rounded-lg px-2 py-2  flex items-center gap-2  ${isActive ? "bg-neutral-100" : ""}`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6"
            >
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
            <p>Profile</p>
          </NavLink>

          <NavLink
            to={"preferences"}
            className={({ isActive }) =>
              `  text-gray-500 hover:bg-neutral-100 transition-all rounded-lg px-2 py-2  flex items-center gap-2  ${isActive ? "bg-neutral-100" : ""}`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6"
            >
              <path d="M20 7h-9" />
              <path d="M14 17H5" />
              <circle cx="17" cy="17" r="3" />
              <circle cx="7" cy="7" r="3" />
            </svg>
            <p>Preferences</p>
          </NavLink>

          <NavLink
            to={"notifications"}
            className={({ isActive }) =>
              `  text-gray-500 hover:bg-neutral-100 transition-all rounded-lg px-2 py-2  flex items-center gap-2  ${isActive ? "bg-neutral-100" : ""}`
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            <p>Notifications</p>
          </NavLink>
        </div>
        <div className="flex w-5/6 px-20">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
