import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useFavouritesHook } from "../../hooks/useFavouritesHook";
import { useDeleteHook } from "../../hooks/useDeleteHook";
import { useWideModeStore } from "../../Stores/useWideModeStore";
import { noteData } from "../../dataTypes";
import { useCreateNote, useDuplicateNote } from "../../api/NoteApi";
import NoteMoveMenu from "./NoteMoveMenu";
import { formatDistanceToNow } from "date-fns";

const NoteViewMenu = ({ singleNote }: { singleNote: noteData }) => {
  const { handleDeleteNote } = useDeleteHook();
  const { toggleWideMode, wideMode } = useWideModeStore();
  const { handleFavourite, setFavourite } = useFavouritesHook(singleNote?.favourite);

  const { duplicateNote } = useDuplicateNote();
  const { createNote } = useCreateNote();

  const [menuOpen, setMenuOpen] = useState(false);

  const [moveMenu, setMoveMenu] = useState(false);

  useEffect(() => {
    if (!singleNote) return;
    setFavourite(singleNote.favourite);
  }, [singleNote]);

  return (
    <>
      <button onClick={() => setMenuOpen((prev) => !prev)} className="rounded-md  hover:bg-neutral-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7 text-neutral-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </button>

      {moveMenu ? (
        <NoteMoveMenu singleNote={singleNote} setMoveMenu={setMoveMenu} setMenuOpen={setMenuOpen}></NoteMoveMenu>
      ) : (
        createPortal(
          <div onClick={() => setMenuOpen((prev) => !prev)} className={`${menuOpen ? " w-60 border-l-2 " : "w-0"} transition-all bg-stone-100`}>
            <div className={` ${menuOpen ? "flex flex-col " : "hidden"} slide-right text-neutral-500   gap-1     p-2 `}>
              <p className="px-3 py-2  font-medium text-neutral-400">Note Actions</p>
              {!location.pathname.includes("/notes-split") && (
                <label
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center  pl-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-1 rounded cursor-pointer gap-3.5"
                >
                  <input type="checkbox" onChange={toggleWideMode} checked={wideMode} className="sr-only peer" />
                  <div className="relative w-7 h-4 bg-neutral-300 dark:bg-neutral-700  peer-focus:outline-none   rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white dark:peer-checked:after:border-neutral-400  after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300     dark:after:bg-neutral-400 dark:after:border-neutral-400 after:border after:rounded-full after:w-3 after:h-3 after:transition-all peer-checked:bg-neutral-600"></div>
                  <p className=" text-sm">Wide mode </p>
                </label>
              )}

              <button
                onClick={(e) => {
                  handleFavourite({ noteId: singleNote.id });
                  e.stopPropagation();
                }}
                className="flex items-center gap-4 pl-3  text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 p-1 rounded"
              >
                {singleNote.favourite ? (
                  <>
                    <svg
                      className="size-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
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
                      className="size-5"
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

              <button
                onClick={() => createNote({ parentNoteId: singleNote.id, title: "New page", content: "" })}
                className="flex items-center gap-4  pl-3 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 p-1 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M3 15h6" />
                  <path d="M6 12v6" />
                </svg>

                <p>Add a sub-page</p>
              </button>

              <div className="border-t-2 my-0.5 dark:border-neutral-600"></div>

              <button
                onClick={() => duplicateNote({ noteId: singleNote.id })}
                className="flex items-center gap-4 pl-3  text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 p-1 rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
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
                className="flex items-center gap-4 pl-3  text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 p-1 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <polyline points="15 10 20 15 15 20" />
                  <path d="M4 4v7a4 4 0 0 0 4 4h12" />
                </svg>

                <p>Move Note</p>
              </button>

              <div className="border-t-2 my-0.5 dark:border-neutral-600"></div>
              <button
                onClick={() => handleDeleteNote(singleNote.id!)}
                className="flex items-center gap-4 pl-3 p-1 w-full rounded text-sm hover:text-red-500 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                <p>Move to RecycleBin</p>
              </button>
              <div className="flex flex-col gap-2  mt-10">
                <p className=" py-2  font-medium text-neutral-400">Note Details</p>

                <div className="flex items-center gap-2">
                  <p className="text-sm text-neutral-400">Tags: </p>
                  <div className="grid grid-cols-2 gap-2">
                    {singleNote?.tags?.map((tag, index) => (
                      <span
                        style={{ backgroundColor: tag.backgroundColor, color: tag.textColor }}
                        key={index}
                        className="rounded-md px-2 py-1 bg-gray-200 cursor-pointer"
                      >
                        <p className="font-medium text-xs">{tag.name}</p>
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-neutral-600">
                  <span className="text-neutral-400">Created:</span>{" "}
                  {formatDistanceToNow(new Date(singleNote?.createdAt).toISOString(), { addSuffix: true })}
                </p>

                <p className="text-sm text-neutral-600">
                  <span className="text-neutral-400">Edited:</span>{" "}
                  {formatDistanceToNow(new Date(singleNote?.updatedAt).toISOString(), { addSuffix: true })}
                </p>
              </div>
            </div>
          </div>,
          document.getElementById("main-div") as HTMLElement
        )
      )}
    </>
  );
};

export default NoteViewMenu;
