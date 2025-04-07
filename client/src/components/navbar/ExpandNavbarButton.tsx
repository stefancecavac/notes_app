import React from "react";

const ExpandNavbarButton = React.memo(({ setExpanded }: { setExpanded: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 z-999 left-1">
      <button
        className={` btn btn-square btn-ghost btn-xs   bg-transparent border-0 hover:bg-neutral  btn-soft `}
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
          className=" text-info-content size-5"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 3v18" />
        </svg>
      </button>
    </div>
  );
});

export default ExpandNavbarButton;
