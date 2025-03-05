const ExpandNavbarButton = ({ setExpanded }: { setExpanded: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <button
      className={` btn btn-square btn-ghost p-0 size-8  z-50 bg-transparent border-0 hover:bg-neutral  btn-soft `}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 text-info-content"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 3v18" />
      </svg>
    </button>
  );
};

export default ExpandNavbarButton;
