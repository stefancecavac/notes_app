import React, { useState } from "react";
import SearchModal from "../modals/SearchModal";

const SearchComponent = React.memo(() => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className={`btn-ghost hover:bg-base-300  text-info-content  btn  p-1 btn-sm justify-start rounded-lg flex items-center gap-4 `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-5  text-info-content "
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        Search
      </button>

      {modal && <SearchModal closeModal={() => setModal(false)} />}
    </>
  );
});

export default SearchComponent;
