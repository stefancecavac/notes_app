import { useCreateNote } from "../../api/NoteApi";
import React, { useCallback, useEffect } from "react";

const NewItemButton = React.memo(() => {
  const { createNote } = useCreateNote();

  const handleCreateNote = useCallback(() => {
    createNote({ noteTitle: "" });
  }, [createNote]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "x") {
        e.preventDefault();
        handleCreateNote();
      }
    };
    window.addEventListener("keydown", handleKeyPress, true);
    return () => {
      window.removeEventListener("keydown", handleKeyPress, true);
    };
  }, [handleCreateNote]);

  return (
    <button
      id="newItemId"
      title="hello"
      onClick={handleCreateNote}
      className={` btn-ghost   hover:bg-base-300 w-full  text-info-content  btn btn-sm justify-between p-1 rounded-lg flex items-center gap-4`}
    >
      <div className="flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 text-info-content "
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M9 15h6" />
          <path d="M12 18v-6" />
        </svg>
        Add new Note
      </div>
      <div className="text-info-content/50 text-xs flex items-center gap-1  ">
        <p className="kbd kbd-xs">Ctrl</p>
        <p>+</p>
        <p className="kbd kbd-xs">x</p>
      </div>
    </button>
  );
});

export default NewItemButton;
