import React from "react";
import { NavLink } from "react-router-dom";

const DashboardLink = React.memo(() => {
  return (
    <NavLink
      to={"/dashboard"}
      className={({ isActive }) =>
        ` btn btn-ghost btn-sm justify-start p-1 hover:bg-base-300   rounded-lg flex items-center gap-4  ${
          isActive ? "bg-base-300 text-base-content " : "text-info-content"
        }`
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5  text-info-content "
      >
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
      Dashboard
    </NavLink>
  );
});

export default DashboardLink;
