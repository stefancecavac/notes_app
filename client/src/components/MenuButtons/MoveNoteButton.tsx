import { noteData, notesData } from "../../dataTypes";
import { NoteMoveModal } from "../noteViewPage/NoteMoveModal";

type moveNoteButtonProps = {
  note: noteData | notesData;
};

export const MoveNoteButton = ({ note }: moveNoteButtonProps) => {
  const handleOpenMoveModal = () => {
    const modal = document.getElementById("move-modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <button
      onClick={() => {
        handleOpenMoveModal();
      }}
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
        <polyline points="15 10 20 15 15 20" />
        <path d="M4 4v7a4 4 0 0 0 4 4h12" />
      </svg>

      <p>Move Note</p>

      <NoteMoveModal singleNote={note}></NoteMoveModal>
    </button>
  );
};
