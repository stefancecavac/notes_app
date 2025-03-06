import { useState } from "react";
import SkeletonLoader from "../../loaders/SkeletonLoader";
import { NoteListCard } from "./NoteListCard";
import { NotesData } from "../../../dataTypes";

type notesListProps = {
  notes: NotesData[] | undefined;
  notesLoading: boolean;
  text: string;
};

export const NotesList = ({ notes, notesLoading, text }: notesListProps) => {
  const [allNotesExpanded, setAllNotesExpanded] = useState(true);

  return (
    <div className={`flex flex-col text-sm  overflow-auto custom-scrollbar   hover:cursor-pointer    my-1  gap-1`}>
      <button
        onClick={() => {
          setAllNotesExpanded((prev) => !prev);
        }}
        className=" btn btn-ghost btn-xs hover:bg-base-300 justify-start text-info-content font-light flex items-center  w-full text-start rounded-md p-1 "
      >
        {allNotesExpanded ? (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5 fill-info-content ">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M11.8079 14.7695L8.09346 10.3121C7.65924 9.79109 8.02976 9 8.70803 9L15.292 9C15.9702 9 16.3408 9.79108 15.9065 10.3121L12.1921 14.7695C12.0921 14.8895 11.9079 14.8895 11.8079 14.7695Z"
                fill=""
              ></path>
            </g>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5 text-info-content fill-info-content">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M14.7695 11.8079L10.3121 8.09346C9.79109 7.65924 9 8.02976 9 8.70803V15.292C9 15.9702 9.79109 16.3408 10.3121 15.9065L14.7695 12.1921C14.8895 12.0921 14.8895 11.9079 14.7695 11.8079Z"
                fill=""
              ></path>
            </g>
          </svg>
        )}

        <p className="text-xs">{text}</p>
      </button>

      {allNotesExpanded &&
        (notesLoading ? (
          <SkeletonLoader height={20} width={"100%"}></SkeletonLoader>
        ) : (
          <div className="flex flex-col ">
            {notes?.map((note) => (
              <NoteListCard key={note.id} note={note}></NoteListCard>
            ))}
          </div>
        ))}
    </div>
  );
};
