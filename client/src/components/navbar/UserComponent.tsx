import { UseAuthContext } from "../../context/AuthContext";
import SettingsLink from "./SettingsLink";

const UserComponent = () => {
  const { user, userLoading, logout } = UseAuthContext();

  if (userLoading) {
    return null;
  }

  return (
    <div className="dropdown hover:bg-base-300 rounded-lg hover:cursor-pointer w-full">
      <div tabIndex={0} role="button" className="flex items-center gap-2 m-1">
        <div className=" rounded-md shadow-md p-2 bg-neutral-500">
          <p className="font-bold text-neutral-200">{user?.email.slice(0, 2).toUpperCase()}</p>
        </div>
        <p className=" text-xs">{user?.email}</p>
      </div>

      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 gap-1 shadow-md border border-neutral">
        <SettingsLink></SettingsLink>
        <button className=" btn btn-error btn-soft btn-sm justify-start p-1    rounded-lg flex items-center gap-4" onClick={() => logout()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
          Log Out
        </button>
      </ul>
    </div>
  );
};

export default UserComponent;
