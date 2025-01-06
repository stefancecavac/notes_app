import { LegacyRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useSearchParams } from "react-router-dom";
import { useSearchNotes } from "../../api/NoteApi";
import { useDebounce } from "use-debounce";
import { formatDistanceToNow } from "date-fns";

const SearchModal = ({ setOpenSearch, menuRef }: { setOpenSearch: (value: boolean) => void; menuRef: LegacyRef<HTMLDivElement> | undefined }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [debouncedSearch] = useDebounce(q, 500);
  const { searchedNotes } = useSearchNotes(debouncedSearch);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
    setSearchParams({ q: q });
  };

  return createPortal(
    <div className="bg-black/20 absolute inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      <div ref={menuRef} className="bg-white scale-up-center flex-col rounded-md  w-2/4  overflow-auto  ">
        <div className="flex items-center border-b-2 p-2">
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
          <input onChange={handleSearch} placeholder="Search your notes by name or tag" className="p-1 px-3 focus:outline-none w-full"></input>
        </div>
        <table className="w-full ">
          <thead>
            <tr className="flex justify-between p-2 rounded-md">
              <th className="text-right text-neutral-500 ">Note Name</th>
              <th className="text-right text-neutral-500">Note Tags</th>
              <th className="text-right text-neutral-500">Last Updated</th>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-1 p-1">
            {searchedNotes?.map((note) => (
              <tr key={note.id} className="flex justify-between items-center p-1 hover:bg-neutral-100 rounded-md">
                <td className="flex items-center gap-2">
                  <Link
                    to={`/notes/${note.id}/${encodeURIComponent(note.title)}`}
                    onClick={() => setOpenSearch(false)}
                    className="flex items-center gap-2 text-neutral-500"
                  >
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
                </td>
                <td className="flex gap-1">
                  {note?.tags?.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      style={{ backgroundColor: tag.backgroundColor, color: tag.textColor }}
                      className="rounded-md px-2 bg-gray-200 cursor-pointer"
                    >
                      <span className="font-medium text-xs">{tag.name}</span>
                    </span>
                  ))}
                </td>
                <td className="text-neutral-400 text-sm">{formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t-2 p-2 px-4 flex items-center justify-between bg-neutral-50  overflow-auto">
          <p className="gap-1 flex items-center font-semibold text-neutral-700">
            {searchedNotes?.length}
            <span className="text-sm text-neutral-400  font-normal">results</span>
          </p>
          <button onClick={() => setOpenSearch(false)} className="rounded-md p-1 border bg-neutral-100 text-neutral-700 hover:bg-neutral-300">
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchModal;
