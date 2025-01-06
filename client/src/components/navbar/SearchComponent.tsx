import { useEffect, useRef, useState } from "react";
import SearchModal from "../Search/SearchModal";

const SearchComponent = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current !== event.target) {
        setOpenSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpenSearch(true)}
        className={`   text-[13px] font-semibold  flex gap-3  items-center text-[#5f5e5b]  hover:bg-stone-200/50   dark:hover:bg-neutral-700 dark:text-neutral-400   rounded-lg px-1 py-1  `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-5 text-neutral-400"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        Search Notes
      </button>
      {openSearch && <SearchModal setOpenSearch={setOpenSearch} menuRef={menuRef}></SearchModal>}
    </>
  );
};

export default SearchComponent;
