import { MouseEvent, useState } from "react";
import { noteData, notesData } from "../../dataTypes";
import { NoteMoveModal } from "../noteViewPage/NoteMoveModal";

type moveNoteButtonProps = {
  note: noteData | notesData;
};

export const MoveNoteButton = ({ note }: moveNoteButtonProps) => {
  const [modal, setModal] = useState(false);

  const handleOpenModal = (e: MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent<Element, MouseEvent>>>) => {
    e.stopPropagation();
    setModal(true);
  };

  return (
    <button onClick={(e) => handleOpenModal(e)} className="flex items-center gap-4  text-sm btn btn-sm justify-start btn-ghost p-1 rounded-sm">
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

      {modal && <NoteMoveModal closeModal={() => setModal(false)} singleNote={note} />}
    </button>
  );
};
