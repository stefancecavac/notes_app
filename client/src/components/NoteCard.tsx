import { Link } from "react-router-dom";
import { noteData } from "../dataTypes";
import { formatDistanceToNow } from "date-fns";

const NoteCard = ({ note }: { note: noteData }) => {
  return (
    <Link
      to={`/notes/${note.id}`}
      className=" rounded-lg shadow-md  bg-base-200 flex flex-col overflow-hidden  border border-neutral hover:scale-105 transition-all  "
    >
      <div style={{ backgroundColor: note.color }} className="py-10 bg-neutral"></div>
      <div className="flex items-center justify-between  p-2 ">
        <div className="flex  items-center gap-2 text-base-content truncate my-1 ">
          <div className="bg-neutral rounded-lg p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5 shrink-0 "
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M10 9H8" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
            </svg>
          </div>
          <p className="truncate ">{note.title == "" ? "Untitled" : note.title}</p>
        </div>
      </div>

      <div className=" mt-2 text-xs text-info-content  flex items-center gap-2 p-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

        <p>Updated {formatDistanceToNow(note.updatedAt)} ago</p>
      </div>
    </Link>
  );
};

export default NoteCard;
