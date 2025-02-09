import { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useSearchParams } from "react-router-dom";
import { useSearchNotes } from "../../api/NoteApi";
import { useDebounce } from "use-debounce";
import { formatDistanceToNow } from "date-fns";

const SearchModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [debouncedSearch] = useDebounce(q, 500);
  const { searchedNotes } = useSearchNotes(debouncedSearch);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
    setSearchParams({ q: q });
  };

  return createPortal(
    <dialog id="search-modal" className="modal p-0   ">
      <div className="modal-box w-9/12 max-w-3xl">
        <div className="flex items-center border-b-2 border-neutral p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-neutral-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input onChange={handleSearch} placeholder="Search your notes by name or tag" className="input w-full input-ghost"></input>
        </div>

        <div className="grid grid-cols-3 gap-1 p-1 mt-2">
          <p>Name:</p>
          <p className="text-center">Tag:</p>
          <p className="text-end">Last updated at:</p>

          <div className="col-span-3 my-5">
            {searchedNotes?.map((note) => (
              <div key={note.id} className="flex justify-between items-center p-2 hover:bg-base-200 rounded-md">
                <Link to={`/notes/${note.id}`} className="flex items-center gap-2 text-base-content hover:underline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M10 9H8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                  </svg>
                  <span>{note.title}</span>
                </Link>
                <div className="flex gap-1">
                  {note?.tags?.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      style={{ backgroundColor: tag.backgroundColor, color: tag.textColor }}
                      className="rounded-md px-2  cursor-pointer"
                    >
                      <span className="font-medium text-xs">{tag.name}</span>
                    </span>
                  ))}
                </div>
                <p className="text-info-content text-sm font-thin ">{formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t-2 border-neutral p-2 px-4 flex items-center justify-between  overflow-auto">
          <p className="gap-1 flex items-center font-semibold text-base-content">
            {searchedNotes?.length}
            <span className="text-sm text-info-content  font-normal"> results</span>
          </p>
          <form method="dialog">
            <button className="btn btn-sm">Close</button>
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

export default SearchModal;
