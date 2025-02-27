import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSearchNotes } from "../../api/NoteApi";
import { formatDistanceToNow } from "date-fns";
import { useDebounceHook } from "../../hooks/useDebounceHook";

type searchModalProps = {
  closeModal: () => void;
};

const SearchModal = ({ closeModal }: searchModalProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debouncedValue, isDebouncing } = useDebounceHook(searchParams.get("q") || "", 500);
  const { searchedNotes } = useSearchNotes(debouncedValue);

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
    setSearchParams({});
  };

  return (
    <dialog ref={modalRef} id="search-modal" className="modal " onCancel={handleCloseModal}>
      <div className="modal-box w-9/12 max-w-3xl bg-base-200 border border-neutral p-0">
        <div className="flex items-center p-2 px-5  gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            onChange={handleSearch}
            placeholder="Search your notes by name or tag"
            className="input w-full input-ghost focus:outline-0 focus:bg-base-200"
          />
        </div>
        <div className="divider my-0 px-3"></div>

        <div className="flex flex-col gap-1 p-1 mt-2 overflow-auto max-h-100 m-3">
          <p className="text-info-content text-sm m-3 ">
            Notes: <span className="border border-neutral rounded w-3 h-3 bg-neutral p-1"> {searchedNotes?.length ? searchedNotes.length : 0}</span>
          </p>
          <div className="flex flex-col items-center">
            {isDebouncing ? (
              <span className="flex justify-center items-center  my-3 grow loading loading-spinner text-primary "></span>
            ) : (
              searchedNotes?.map((note) => (
                <div key={note.id} className="flex w-full justify-between  items-center p-2 hover:bg-base-300 rounded-md">
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
                    <p className="truncate w-50">{note.title}</p>
                  </Link>
                  <div className="flex gap-2  ">
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
                  <p className="text-info-content text-xs font-thin ">
                    Edited{" "}
                    {formatDistanceToNow(new Date(note.updatedAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <form method="dialog" onClick={handleCloseModal} className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default SearchModal;
