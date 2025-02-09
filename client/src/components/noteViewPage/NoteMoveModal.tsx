import { createPortal } from "react-dom";
import { useGraphNotes, useMoveNote } from "../../api/NoteApi";
import { noteData, notesData } from "../../dataTypes";

type noteMoveModalProps = {
  singleNote: notesData | noteData;
};

export const NoteMoveModal = ({ singleNote }: noteMoveModalProps) => {
  const { graphNotes } = useGraphNotes();
  const { moveNote } = useMoveNote();

  return createPortal(
    <dialog id="move-modal" className="modal  rounded-md border p-2 ">
      <div className="modal-box bg-base-100x">
        <h3 className="font-bold text-lg">Move to:</h3>

        <button onClick={() => moveNote({ noteId: singleNote.id, parentNoteId: null })} className="btn btn-sm w-full my-5">
          Move Note to top
        </button>

        <div className="flex flex-col gap-1 border-y-2 border-neutral py-2  ">
          {graphNotes
            ?.filter((gNote) => gNote.id !== singleNote.id)
            .map((gNote) => (
              <span
                onClick={() => moveNote({ noteId: singleNote.id, parentNoteId: gNote.id })}
                className="flex p-2 items-center gap-2 text-sm text-base-content hover:cursor-pointer hover:bg-base-200  rounded-md p-1"
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
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>,
    document.body
  );
};
