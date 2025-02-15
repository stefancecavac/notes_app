import { createPortal } from "react-dom";
import { notesData } from "../../../dataTypes";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { useUpdateNote } from "../../../api/NoteApi";
import { useDebounce } from "use-debounce";
import { Link, useLocation, useParams } from "react-router-dom";
import { FavouriteButton } from "../../MenuButtons/FavouriteButton";
import { AddSubPageButton } from "../../MenuButtons/AddSubPageButton";
import { DuplicateNoteButton } from "../../MenuButtons/DuplicateNoteButton";
import { MoveNoteButton } from "../../MenuButtons/MoveNoteButton";
import { DeleteButton } from "../../MenuButtons/DeleteButton";

type noteListCardMenuProps = {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  note: notesData;
  menuRef: LegacyRef<HTMLDivElement> | undefined;
  menuPosition: { top: number; left: number };
};

const NoteListCardMenu = ({ openMenu, note, menuRef, menuPosition, setOpenMenu }: noteListCardMenuProps) => {
  const { noteId } = useParams();
  const location = useLocation();

  const { updateNote } = useUpdateNote({ noteId: note?.id });

  const [renameMenu, setRenameMenu] = useState(false);

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

  if (!openMenu && !renameMenu) return null;

  return renameMenu
    ? createPortal(
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
            className=""
          >
            <input autoFocus onChange={handleRename} placeholder={note.title} className="input  input-sm"></input>
          </div>
        </div>,
        document.body
      )
    : createPortal(
        <div onClick={() => setOpenMenu(false)} className="absolute inset-0 z-50">
          <div ref={menuRef} style={{ position: "absolute", top: `${menuPosition.top}px`, left: `${menuPosition.left}px`, zIndex: 50 }}>
            <div className={`  flex flex-col  bg-base-200 rounded-md p-1 w-60  shadow-md border-neutral border-2`}>
              <FavouriteButton note={note} />
              <AddSubPageButton note={note} />
              <div className="divider my-0 "></div>
              <button
                onClick={(e) => {
                  setRenameMenu(true);
                  e.stopPropagation();
                }}
                className="flex items-center gap-4 hover:bg-base-300  text-sm btn btn-sm justify-start btn-ghost p-1 rounded-sm"
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
              <DuplicateNoteButton note={note} />
              <MoveNoteButton note={note} />
              {noteId !== note.id && location.pathname.includes("/notes/") && (
                <Link
                  to={`/notes-split/${noteId}/${note.id}`}
                  className="flex items-center gap-4  text-sm btn btn-sm justify-start btn-ghost p-1 rounded-sm"
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

              <div className="divider  my-0"></div>

              <DeleteButton note={note} />
            </div>
          </div>
        </div>,
        document.body
      );
};
export default NoteListCardMenu;
