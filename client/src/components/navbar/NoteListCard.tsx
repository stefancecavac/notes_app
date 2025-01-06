import { NavLink } from "react-router-dom";
import { noteData } from "../../dataTypes";
import { useState, useRef } from "react";
import NoteListCardMenu from "./NoteListCardMenu";

const NoteListCard = ({ note }: { note: noteData }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const [treeViewStates, setTreeViewStates] = useState<{ [key: string]: boolean }>(JSON.parse(localStorage.getItem("treeViewStates")!) || {});

  const isTreeViewOpen = treeViewStates[note.id] || false;

  const toggleTreeView = (e: React.MouseEvent) => {
    e.preventDefault();
    setTreeViewStates((prev) => {
      const updated = { ...prev, [note.id]: !prev[note.id] };
      localStorage.setItem("treeViewStates", JSON.stringify(updated));
      return updated;
    });
  };

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX,
      });
    }
    setOpenMenu((prev) => !prev);
  };
  if (!note) {
    return null;
  }

  return (
    <div>
      <NavLink
        to={`/notes/${note.id}/${encodeURIComponent(note.title)}`}
        onClick={(e) => {
          if (openMenu) e.preventDefault();
        }}
        className={({ isActive }) =>
          `relative transition-all  slide-bottom items-center flex group p-1 gap-2 rounded-md group hover:cursor-pointer text-[#5f5e5b]  dark:hover:bg-neutral-700 dark:text-neutral-400 hover:bg-stone-200/50 ${
            isActive ? "bg-stone-200/50 dark:bg-neutral-700 font-bold" : ""
          }`
        }
      >
        <div className="size-5 flex items-center relative">
          <div
            className="size-5 absolute group-hover:opacity-0"
            ref={(el) => {
              if (el)
                el.innerHTML =
                  note.icon ||
                  ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={5} stroke="currentColor" className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>`;
            }}
          ></div>

          <button
            className="opacity-0 absolute group-hover:opacity-100 transition-all p-1 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800"
            onClick={toggleTreeView}
          >
            {isTreeViewOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 opacity-0 group-hover:opacity-100 transition-all text-neutral-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 opacity-0 group-hover:opacity-100 transition-all text-neutral-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            )}
          </button>
        </div>

        <p className="truncate flex-1 text-[0.9em] ">{note?.title}</p>
        <div className="relative flex-shrink-0 flex items-center">
          <button
            ref={buttonRef}
            onClick={handleMenuClick}
            className={`${
              openMenu ? "flex" : "hidden group-hover:flex"
            } bg-inherit flex-shrink-0 relative rounded-md transition-all hover:bg-neutral-200 dark:hover:bg-neutral-800`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-neutral-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>

          {openMenu && <NoteListCardMenu menuRef={menuRef} note={note} openMenu={openMenu} setOpenMenu={setOpenMenu} menuPosition={menuPosition} />}
        </div>
      </NavLink>

      {isTreeViewOpen &&
        note?.childNotes?.map((childNote, index) => (
          <div key={index} className="ml-3 pl-2 space-y-1 border-l-2 border-neutral-300">
            <NoteListCard note={childNote} />
          </div>
        ))}
    </div>
  );
};

export default NoteListCard;
