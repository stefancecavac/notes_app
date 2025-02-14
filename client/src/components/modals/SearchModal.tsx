import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useSearchNotes } from "../../api/NoteApi";
import { formatDistanceToNow } from "date-fns";

type searchModalProps = {
  closeModal: () => void;
};

export const SearchModal = ({ closeModal }: searchModalProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearch] = useDebounce(searchParams.get("q") || "", 500);
  const { searchedNotes } = useSearchNotes(debouncedSearch);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: e.target.value });
  };

  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    closeModal();
  };

  return (
    <dialog ref={modalRef} id="search-modal" className="modal " onCancel={closeModal}>
      <div className="modal-box w-9/12 max-w-3xl">
        <div className="flex items-center p-2">
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
          <input onChange={handleSearch} placeholder="Search your notes by name or tag" className="input w-full input-ghost" />
        </div>

        <div className="grid grid-cols-3 gap-1 p-1 mt-2">
          <p>Name:</p>
          <p className="text-center">Tag:</p>
          <p className="text-end">Last updated at:</p>
          <div className="divider col-span-3 my-0"></div>

          <div className="col-span-3">
            {searchedNotes?.map((note) => (
              <div key={note.id} className="flex justify-between items-center p-2 hover:bg-base-200 rounded-md">
                <Link to={`/notes/${note.id}`} onClick={handleCloseModal} className="flex items-center gap-2 text-base-content hover:underline">
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
                      style={{
                        backgroundColor: tag.backgroundColor,
                        color: tag.textColor,
                      }}
                      className="rounded-md px-2 cursor-pointer"
                    >
                      <span className="font-medium text-xs">{tag.name}</span>
                    </span>
                  ))}
                </div>
                <p className="text-info-content text-sm font-thin">
                  {formatDistanceToNow(new Date(note.updatedAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <form method="dialog" onClick={closeModal} className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
