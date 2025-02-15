import { noteData } from "../dataTypes";
import { useRestoreFromRecycleBin } from "../api/RecycleBinNoteApi";
import { formatDistanceToNow } from "date-fns";

const NoteCard = ({ note }: { note: noteData }) => {
  const { restoreFromRecycleBin } = useRestoreFromRecycleBin();

  return (
    <div className=" rounded-lg shadow-md border-neutral bg-base-200 border flex flex-col overflow-hidden p-2  ">
      <div className="flex items-center justify-between ">
        <div className="flex  items-center gap-2 text-base-content truncate my-1 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6 shrink-0 "
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
          </svg>
          <p className="truncate">{note.title == "" ? "Untitled" : note.title}</p>
        </div>

        <button
          onClick={() => restoreFromRecycleBin({ value: false, noteId: note.id })}
          className={`flex bg-inherit btn btn-xs btn-square shrink-0 relative rounded-lg transition-all `}
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
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>

      <div className=" mt-2 text-xs text-info-content  flex items-center gap-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

        <p>Updated {formatDistanceToNow(note.updatedAt)} ago</p>
      </div>
    </div>
  );
};

export default NoteCard;
