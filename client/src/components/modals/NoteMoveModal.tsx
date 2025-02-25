import { useGraphNotes, useMoveNote } from "../../api/NoteApi";
import { NotesData } from "../../dataTypes";
import { MouseEvent, useEffect, useRef } from "react";

type noteMoveModalProps = {
  singleNote: NotesData;
  closeModal: () => void;
};

export const NoteMoveModal = ({ singleNote, closeModal }: noteMoveModalProps) => {
  const { graphNotes } = useGraphNotes();
  const { moveNote } = useMoveNote();
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    closeModal();
  };
  return (
    <dialog ref={modalRef} className="modal  " onCancel={closeModal}>
      <div className="modal-box bg-base-100 flex flex-col rounded-md border p-3 border-neutral">
        <h3 className="font-bold text-start text-lg pb-5 ">Move to:</h3>

        <button
          onClick={() => moveNote({ noteId: singleNote.id, parentNoteId: null })}
          className="flex p-2 items-center gap-2 text-sm text-base-content hover:cursor-pointer hover:bg-base-300 bg-neutral  rounded-md"
        >
          Move Note to top
        </button>

        <div className="flex flex-col gap-1  py-2  ">
          {graphNotes
            ?.filter((gNote) => gNote.id !== singleNote.id)
            .map((gNote) => (
              <span
                onClick={() => moveNote({ noteId: singleNote.id, parentNoteId: gNote.id })}
                className="flex p-2 items-center gap-2 text-sm text-base-content hover:cursor-pointer hover:bg-base-300  rounded-md"
                key={gNote.id}
              >
                {gNote.icon ? (
                  <div className="size-5 stroke-" dangerouslySetInnerHTML={{ __html: gNote.icon }}></div>
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
        <div className="modal-action mt-0">
          <form method="dialog">
            <button onClick={(e) => handleClose(e)} className="btn btn-primary">
              Close
            </button>
          </form>
        </div>
      </div>

      <form method="dialog" onClick={(e) => handleClose(e)} className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
