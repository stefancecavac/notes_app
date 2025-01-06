import { NavLink } from "react-router-dom";

const ExploreLink = () => {
  return (
    <NavLink
      to={"/note-explore"}
      className={({ isActive }) =>
        ` text-[13px] font-semibold   text-[#5f5e5b] hover:bg-stone-200/50 dark:hover:bg-neutral-700  dark:text-neutral-400  transition-all rounded-lg px-1 py-1  flex items-center gap-3 ${
          isActive ? "bg-stone-200/50    dark:bg-neutral-700" : ""
        }`
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 text-neutral-400"
      >
        <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
        <circle cx="12" cy="12" r="10" />
      </svg>
      Explore notes
    </NavLink>
  );
};

export default ExploreLink;
