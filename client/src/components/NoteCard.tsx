import { Link } from "react-router-dom";
import { noteData } from "../dataTypes";
import { useRestoreFromRecycleBin } from "../api/RecycleBinNoteApi";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFavouritesHook } from "../hooks/useFavouritesHook";
import { useDeleteHook } from "../hooks/useDeleteHook";

const NoteCard = ({ note }: { note: noteData }) => {
  const { restoreFromRecycleBin } = useRestoreFromRecycleBin();
  const { handleFavourite } = useFavouritesHook();
  const { handleDeleteNote } = useDeleteHook();

  const [openMenu, setOpenMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenMenu((prev) => !prev);

    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current !== event.target) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Link to={`/notes/${note.id}/${encodeURIComponent(note.title)}`}>
      <div className=" rounded-lg shadow-md  bg-neutral-50 border flex flex-col overflow-hidden p-2  ">
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center ">
            {note.tags?.map((tag) => (
              <span
                style={{ backgroundColor: tag.backgroundColor, color: tag.textColor }}
                className="rounded-full px-2 py-0.5 text-xs bg-gray-200 cursor-pointer"
              >
                {tag.name}
              </span>
            ))}
          </div>

          <button
            ref={buttonRef}
            onClick={handleMenuClick}
            className={`flex bg-inherit flex-shrink-0 relative rounded-lg transition-all hover:bg-neutral-300`}
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
        </div>

        <div className="flex  items-center gap-2 text-neutral-700 text-xl my-3 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6 flex-shrink-0 text-neutral-400"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
          </svg>
          <p className="truncate">{note.title == "" ? "Untitled" : note.title}</p>
        </div>

        <div className=" mt-2 text-xs text-neutral-400 flex items-center gap-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

          <p>Updated {formatDistanceToNow(note.updatedAt)} ago</p>
        </div>
      </div>

      {openMenu &&
        createPortal(
          <div
            onClick={(e) => e.stopPropagation()}
            ref={menuRef}
            style={{ position: "absolute", top: `${menuPosition.top}px`, left: `${menuPosition.left}px`, zIndex: 50 }}
          >
            <div className="flex flex-col  bg-neutral-100 text-neutral-500 rounded-lg p-2  shadow-[0_4px_6px_rgba(0,0,0,0.1),0_-4px_6px_rgba(0,0,0,0.1)]">
              <button
                onClick={() => handleFavourite({ noteId: note.id })}
                className="flex items-center gap-2  text-sm hover:bg-neutral-400 p-1 rounded"
              >
                {note.favourite ? (
                  <>
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8.34 8.34 2 9.27l5 4.87L5.82 21 12 17.77 18.18 21l-.59-3.43" />
                      <path d="M18.42 12.76 22 9.27l-6.91-1L12 2l-1.44 2.91" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                    <p className=" truncate">Remove from favourites</p>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                    <p className="whitespace-nowrap">Add to Favourites</p>
                  </>
                )}
              </button>
              <div className="border-t-2"></div>
              {note.inTrash ? (
                <button
                  onClick={() => restoreFromRecycleBin({ value: false, noteId: note.id! })}
                  className="flex items-center gap-2 p-1 w-full rounded text-sm  transition-all hover:bg-neutral-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>

                  <p>Restore from Recycle bin</p>
                </button>
              ) : (
                <button
                  onClick={() => handleDeleteNote(note.id!)}
                  className="flex items-center gap-2 p-1 w-full rounded text-sm hover:text-red-500 transition-all hover:bg-neutral-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  <p>Move to RecycleBin</p>
                </button>
              )}
            </div>
          </div>,
          document.body
        )}
    </Link>
  );
};

export default NoteCard;
