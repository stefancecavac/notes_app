import { useCreateNote } from "../../api/NoteApi";
import { noteData, notesData } from "../../dataTypes";

type addSubPageButtonProps = {
  note: noteData | notesData;
};

export const AddSubPageButton = ({ note }: addSubPageButtonProps) => {
  const { createNote } = useCreateNote();

  return (
    <button
      onClick={() => createNote({ parentNoteId: note.id, title: "New page", content: "" })}
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
        <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M3 15h6" />
        <path d="M6 12v6" />
      </svg>

      <p>Add a sub-page</p>
    </button>
  );
};
