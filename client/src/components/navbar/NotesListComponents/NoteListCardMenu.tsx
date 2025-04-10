import { createPortal } from "react-dom";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { useUpdateNote } from "../../../api/NoteApi";
import { useDebounce } from "use-debounce";
// import { Link, useLocation, useParams } from "react-router-dom";
import { FavouriteButton } from "../../MenuButtons/FavouriteButton";
import { AddSubPageButton } from "../../MenuButtons/AddSubPageButton";
import { DuplicateNoteButton } from "../../MenuButtons/DuplicateNoteButton";
import { MoveNoteButton } from "../../MenuButtons/MoveNoteButton";
import { DeleteButton } from "../../MenuButtons/DeleteButton";
import { NotesData } from "../../../dataTypes";
import { formatDistanceToNow } from "date-fns";

type noteListCardMenuProps = {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  note: NotesData;
  menuRef: LegacyRef<HTMLDivElement> | undefined;
  menuPosition: { top: number; left: number };
};

const NoteListCardMenu = ({ openMenu, note, menuRef, menuPosition, setOpenMenu }: noteListCardMenuProps) => {
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
      updateNote({ noteTitle: debouncedSave });
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
            style={{ position: "absolute", top: `${menuPosition.top - 15}px`, left: `${15}px`, zIndex: 50 }}
            className="bg-base-200 p-1 rounded"
          >
            <input
              autoFocus
              onChange={handleRename}
              placeholder={note.noteTitle}
              className=" focus:outline-none outline-none border-none  input bg-base-300"
            ></input>
          </div>
        </div>,
        document.body
      )
    : createPortal(
        <div onClick={() => setOpenMenu(false)} className="absolute inset-0 z-50 slide-bottom ">
          <div ref={menuRef} style={{ position: "absolute", top: `${menuPosition.top}px`, left: `${menuPosition.left}px`, zIndex: 50 }}>
            <div className={`  flex flex-col   bg-base-200 rounded-xl  p-1 w-60  shadow-md border-neutral border-2`}>
              <FavouriteButton note={note} />
              <AddSubPageButton note={note} />
              <div className="divider my-0 p-0"></div>
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
              <div className="divider   m-0"></div>
              <DeleteButton note={note} />
              <div className="border-t border-neutral mt-2 flex flex-col gap-2 p-2">
                <p className="text-info-content/50 text-xs">
                  Edited {formatDistanceToNow(new Date(note?.updatedAt).toISOString(), { addSuffix: true })}
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      );
};
export default NoteListCardMenu;
