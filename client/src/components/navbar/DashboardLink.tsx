import { NavLink } from "react-router-dom";

const DashboardLink = () => {
  return (
    <NavLink
      to={"/dashboard"}
      className={({ isActive }) =>
        ` text-sm font-medium text-[#5f5e5b]  hover:bg-stone-200/50 dark:hover:bg-neutral-700  dark:text-neutral-400  transition-all rounded-lg px-1 py-1  flex items-center gap-4  ${
          isActive ? "bg-stone-200/50 dark:bg-neutral-700" : ""
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
        className="size-5 text-neutral-400"
      >
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
      Dashboard
    </NavLink>
  );
};

export default DashboardLink;
