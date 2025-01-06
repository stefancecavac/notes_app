import { useRef, useState } from "react";
import { UseAuthContext } from "../../context/AuthContext";
import { createPortal } from "react-dom";
import SettingsLink from "./SettingsLink";

const UserComponent = () => {
  const { user, userLoading, logout } = UseAuthContext();
  const [userMenu, setUserMenu] = useState(false);

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({ top: buttonRect.bottom + window.scrollY, left: buttonRect.left + window.scrollX });
    }
    setUserMenu((prev) => !prev);
  };

  if (userLoading) {
    return null;
  }

  return (
    <div
      ref={buttonRef}
      onClick={handleMenuClick}
      className={`shadow-none  text-[#5f5e5b] font-medium gap-2  hover:bg-stone-200/50 p-1 rounded-md hover:cursor-pointer w-full flex  justify-start`}
    >
      <div className=" rounded-md shadow-md p-2 bg-neutral-500">
        <p className="font-bold text-neutral-200">{user?.email.slice(0, 2).toUpperCase()}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className=" text-xs">{user?.email}</p>
      </div>

      {userMenu &&
        createPortal(
          <div className="absolute inset-0 z-50 ">
            <div
              className="bg-white rounded-md slide-bottom w-60 p-2 shadow-md border flex flex-col gap-1 "
              ref={menuRef}
              style={{ position: "absolute", top: `${menuPosition.top}px`, left: `${menuPosition.left}px`, zIndex: 50 }}
            >
              <div>
                <p className="text-neutral-500  text-sm p-1 border-b">{user?.email}'s Notes_</p>
              </div>

              <SettingsLink></SettingsLink>

              <button
                className="text-sm font-medium text-[#5f5e5b]  hover:bg-stone-200/50 dark:hover:bg-neutral-700  dark:text-neutral-400  transition-all rounded-lg px-1 py-1  flex items-center gap-4 "
                onClick={() => logout()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 text-neutral-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                Log Out
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default UserComponent;
