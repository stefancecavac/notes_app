import { createPortal } from "react-dom";
import { noteData } from "../../dataTypes";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { useFavouritesHook } from "../../hooks/useFavouritesHook";
import { useDeleteHook } from "../../hooks/useDeleteHook";
import { useCreateNote, useDuplicateNote, useUpdateNote } from "../../api/NoteApi";
import { useDebounce } from "use-debounce";
import { Link, useLocation, useParams } from "react-router-dom";
import NoteMoveMenu from "../noteViewPage/NoteMoveMenu";

const NoteListCardMenu = ({
  openMenu,
  note,
  menuRef,
  menuPosition,
  setOpenMenu,
}: {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  note: noteData;
  menuRef: LegacyRef<HTMLDivElement> | undefined;
  menuPosition: { top: number; left: number };
}) => {
  const { noteId } = useParams();
  const location = useLocation();

  const { handleFavourite, favourite } = useFavouritesHook(note.favourite);
  const { handleDeleteNote } = useDeleteHook();
  const { updateNote } = useUpdateNote({ noteId: note?.id });
  const { duplicateNote } = useDuplicateNote();
  const { createNote } = useCreateNote();

  const [renameMenu, setRenameMenu] = useState(false);
  const [moveMenu, setMoveMenu] = useState(false);

  const [name, setName] = useState("");
  const [debouncedSave] = useDebounce(name, 500);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleRename = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (debouncedSave) {
      updateNote({ title: debouncedSave });
    }
  }, [debouncedSave]);

  if (!openMenu && !renameMenu && !moveMenu) return null;

  return renameMenu ? (
    createPortal(
      <div
        onClick={() => {
          setRenameMenu(false);
          setOpenMenu(false);
        }}
        className="absolute inset-0 z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          ref={inputRef}
          style={{ position: "absolute", top: `${menuPosition.top - 30}px`, left: `${menuPosition.left - 200}px`, zIndex: 50 }}
          className="scale-up-center"
        >
          <input
            autoFocus
            onChange={handleRename}
            placeholder={note.title}
            className="p-2 rounded-md w-56 text-neutral-500 text-sm shadow-lg border-2 focus:outline-none bg-neutral-50"
          ></input>
        </div>
      </div>,
      document.body
    )
  ) : !moveMenu ? (
    createPortal(
      <div onClick={() => setOpenMenu(false)} className="absolute inset-0 z-50">
        <div ref={menuRef} style={{ position: "absolute", top: `${menuPosition.top}px`, left: `${menuPosition.left}px`, zIndex: 50 }}>
          <div
            className={`${
              openMenu ? "slide-bottom" : ""
            } flex flex-col  bg-white dark:bg-neutral-700  dark:text-neutral-300 text-[#5f5e5b] rounded-lg p-1 w-72  shadow-2xl border-2`}
          >
            <button
              onClick={() => handleFavourite({ noteId: note.id })}
              className="flex items-center gap-4  text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 p-1 rounded"
            >
              {favourite ? (
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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
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

            <button
              onClick={() => createNote({ parentNoteId: note.id, title: "New page", content: "" })}
              className="flex items-center gap-4  text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 p-1 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M3 15h6" />
                <path d="M6 12v6" />
              </svg>

              <p>Add a sub-page</p>
            </button>

            <div className="border-t-2 my-1 dark:border-neutral-600"></div>

            <button
              onClick={(e) => {
                setRenameMenu(true);
                e.stopPropagation();
              }}
              className="flex items-center gap-4  text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 p-1 rounded"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>

              <p>Rename</p>
            </button>

            <button
              onClick={() => duplicateNote({ noteId: note.id })}
              className="flex items-center gap-4  text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 p-1 rounded"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>

              <p>Duplicate</p>
            </button>

            <button
              onClick={(e) => {
                setMoveMenu(true);
                e.stopPropagation();
              }}
              className="flex items-center gap-4  text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 p-1 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <polyline points="15 10 20 15 15 20" />
                <path d="M4 4v7a4 4 0 0 0 4 4h12" />
              </svg>

              <p>Move Note</p>
            </button>

            {noteId !== note.id && location.pathname.includes("/notes/") && (
              <Link
                to={`/notes-split/${noteId}/${note.id}`}
                className="flex items-center gap-4  text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 p-1 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3" />
                  <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" />
                  <path d="M12 20v2" />
                  <path d="M12 14v2" />
                  <path d="M12 8v2" />
                  <path d="M12 2v2" />
                </svg>
                Open in Split screen
              </Link>
            )}

            <div className="border-t-2 my-1 dark:border-neutral-600"></div>
            <button
              onClick={() => handleDeleteNote(note.id!)}
              className="flex items-center gap-4 p-1 w-full rounded text-sm hover:text-red-500 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800"
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
          </div>
        </div>
      </div>,
      document.body
    )
  ) : (
    <NoteMoveMenu menuRef={menuRef} setMoveMenu={setMoveMenu} singleNote={note} setMenuOpen={setOpenMenu}></NoteMoveMenu>
  );
};
export default NoteListCardMenu;
