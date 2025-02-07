import { createPortal } from "react-dom";
import { useGraphNotes, useMoveNote } from "../../api/NoteApi";
import { noteData } from "../../dataTypes";

const NoteMoveMenu = ({
  singleNote,
  setMoveMenu,
  setMenuOpen,
}: {
  singleNote: noteData;
  setMoveMenu: (value: boolean) => void;
  setMenuOpen: (value: boolean) => void;
}) => {
  const { graphNotes } = useGraphNotes();
  const { moveNote } = useMoveNote();

  return createPortal(
    <div
      onClick={() => {
        setMoveMenu(false);
        setMenuOpen(false);
      }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/20  backdrop-blur-xs "
    >
      <div onClick={(e) => e.stopPropagation()} className="scale-up-center bg-white rounded-md border p-2 ">
        <p className="text-neutral-400 mb-2">Move to:</p>
        <div className="flex flex-col gap-1 ">
          {graphNotes
            ?.filter((gNote) => gNote.id !== singleNote.id)
            .map((gNote) => (
              <span
                onClick={() => moveNote({ noteId: singleNote.id, parentNoteId: gNote.id })}
                className="flex items-center gap-2 text-sm text-[#5f5e5b] hover:cursor-pointer hover:bg-neutral-100  rounded-md p-1"
                key={gNote.id}
              >
                {gNote.icon ? (
                  <div className="size-5" dangerouslySetInnerHTML={{ __html: gNote.icon }}></div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5 "
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M10 9H8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                  </svg>
                )}
                {gNote.title}
              </span>
            ))}
          <div className="border-t-2 my-1 dark:border-neutral-600"></div>

          <button
            onClick={() => moveNote({ noteId: singleNote.id, parentNoteId: null })}
            className="rounded-md p-1 text-neutral-500 bg-neutral-100 hover:bg-neutral-200  text-xs"
          >
            Move Note to top
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NoteMoveMenu;
