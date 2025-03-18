import { Link } from "react-router-dom";
import { useDeleteHook } from "../../hooks/useDeleteHook";
import { noteData } from "../../dataTypes";

type subPagesProps = {
  note: noteData;
};

export const SubPagesComponent = ({ note }: subPagesProps) => {
  const { handleDeleteNote } = useDeleteHook();

  return (
    note?.childNotes?.length !== 0 && (
      <div className="flex flex-col mt-10 p-1 lg:pl-20 ">
        <p className=" text-info-content   font-medium  ">Pages:</p>
        <div className="divider my-0"></div>
        {note?.childNotes?.map((note) => (
          <div key={note.id} className="flex items-center justify-between gap-3   group hover:bg-base-200 rounded-lg p-1">
            <Link className="flex items-center  text-info-content   gap-2 hover:underline " to={`/notes/${note.id}`}>
              {note.icon ? (
                <div className="size-5 " dangerouslySetInnerHTML={{ __html: note.icon }}></div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4   "
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M10 9H8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                </svg>
              )}

              <p className=" text-sm ">{note.title}</p>
            </Link>
            <button
              onClick={() => handleDeleteNote(note.id)}
              className="btn btn-xs btn-square btn-error btn-soft opacity-0 group-hover:opacity-100 transition-all "
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    )
  );
};
