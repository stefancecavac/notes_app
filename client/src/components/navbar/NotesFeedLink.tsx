import { NavLink } from "react-router-dom";

const NoteFeedPage = () => {
  // const [dirty, setDirty] = useState(false);
  // const navigate = useNavigate();

  // const handleNavigate = () => {
  //   if (dirty) {
  //     console.log("preventing Navigation becouse dirty");
  //   } else {
  //     navigate("/dashboard");
  //   }
  // };

  return (
    <NavLink
      to={"/notes-feed"}
      className={({ isActive }) =>
        ` text-[13px] font-semibold  text-[#5f5e5b] hover:bg-stone-200/50 dark:hover:bg-neutral-700  dark:text-neutral-400  transition-all rounded-lg px-1 py-1  flex items-center gap-3  ${
          isActive ? "bg-stone-200/50  dark:bg-neutral-700" : ""
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
        <path d="M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z" />
        <path d="M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z" />
        <path d="M3 5a2 2 0 0 0 2 2h3" />
        <path d="M3 3v13a2 2 0 0 0 2 2h3" />
      </svg>
      Note Feed
    </NavLink>
  );
};

export default NoteFeedPage;
