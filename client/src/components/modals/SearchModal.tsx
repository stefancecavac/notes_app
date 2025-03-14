import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useCreateNote, useSearchNotes } from "../../api/NoteApi";
import { formatDistanceToNow } from "date-fns";
import { useDebounceHook } from "../../hooks/useDebounceHook";
import { useEditorHook } from "../../hooks/useEditorHook";

type searchModalProps = {
  closeModal: () => void;
};

const SearchModal = ({ closeModal }: searchModalProps) => {
  const editor = useEditorHook();
  const { createNote, pendingCreateNote } = useCreateNote();

  const handleCreateNote = (title: string) => {
    const editorContent = editor?.getHTML();
    if (!editorContent) {
      return;
    }
    createNote({ title: title, content: editorContent });
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const { debouncedValue, isDebouncing } = useDebounceHook(searchParams.get("q") || "", 500);
  const { searchedNotes } = useSearchNotes(debouncedValue);

  const [selectedIndex, setSeletctedIndex] = useState(-1);

  const [totalItems, setTotalItems] = useState(3);

  useEffect(() => {
    setTotalItems(searchedNotes?.length === 0 ? 3 : 3 + (searchedNotes?.length || 0));
  }, [searchedNotes]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: e.target.value });
  };

  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
      setSearchParams({ q: "" });
    }
  }, []);

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    closeModal();
    setSearchParams({});
  };

  const navigate = useNavigate();
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSeletctedIndex((prev) => (prev + 1) % totalItems);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSeletctedIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else if (e.key === "Enter") {
      if (selectedIndex === 0) {
        closeModal();
        document.getElementById("newItemId")?.click();
      }
      if (selectedIndex === 1) {
        closeModal();
        document.getElementById("settingsId")?.click();
      }
      if (selectedIndex === 2) {
        closeModal();
        document.getElementById("newItemifNoNoteId")?.click();
      } else {
        if (searchedNotes) {
          closeModal();
          navigate(`/notes/${searchedNotes[selectedIndex - 2].id}`);
        }
      }
    }
  };

  return (
    <dialog ref={modalRef} id="search-modal" className="modal " onCancel={handleCloseModal} onKeyDown={handleKey}>
      <div className="modal-box w-9/12 max-w-3xl bg-base-200 border border-neutral p-0">
        <div className="flex items-center p-2 px-5  gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            id="searchId"
            onChange={handleSearch}
            placeholder="Search your notes by name , tag or simply by the contents of the note"
            className="input w-full input-ghost focus:outline-0 focus:bg-base-200"
          />
        </div>
        <div className="divider my-0 px-3"></div>

        <div className="flex flex-col gap-1 p-1 mt-2 overflow-auto max-h-100 m-3">
          <p className="text-info-content text-sm m-1 ">Actions:</p>

          <div className="flex flex-col items-center gap-1">
            <button
              id="newItemId"
              title="hello"
              onClick={() => handleCreateNote("Empty note")}
              className={` btn-ghost ${
                selectedIndex === 0 ? "bg-base-300" : ""
              }   hover:bg-base-300 w-full  text-info-content  btn btn-sm justify-start p-1 rounded-lg flex items-center gap-4`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 text-info-content "
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M9 15h6" />
                <path d="M12 18v-6" />
              </svg>
              Add new Note
            </button>
            <NavLink
              id="settingsId"
              to={"/settings"}
              className={`hover:bg-base-300 btn btn-ghost btn-sm justify-start p-1   w-full   rounded-lg flex items-center gap-4 text-info-content ${
                selectedIndex === 1 ? "bg-base-300" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-info-content "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Settings
            </NavLink>
          </div>
        </div>

        <div className="flex flex-col gap-1 p-1 mt-2 overflow-auto max-h-100 m-3">
          <p className="text-info-content text-sm m-1 ">
            Notes: <span className="kbd"> {searchedNotes?.length ? searchedNotes.length : 0}</span>
          </p>
          <div className="flex flex-col items-center bg-base-100 rounded-lg p-2 border border-neutral">
            {isDebouncing ? (
              <span className="flex justify-center items-center  my-3 grow loading loading-spinner text-primary "></span>
            ) : searchedNotes?.length === 0 ? (
              <div className="flex flex-col gap-2 w-full">
                <p className="text-info-content text-center">No notes found</p>
                <button
                  id="newItemifNoNoteId"
                  title="hello"
                  onClick={() => handleCreateNote(searchParams.get("q")!)}
                  className={` btn-ghost ${
                    selectedIndex === 2 ? "bg-base-300" : ""
                  }   hover:bg-base-300 w-full  text-info-content  btn btn-sm justify-start p-1 rounded-lg flex items-center gap-4`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5 text-info-content "
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M9 15h6" />
                    <path d="M12 18v-6" />
                  </svg>
                  Create note {searchParams.get("q")}
                </button>
              </div>
            ) : (
              searchedNotes?.map((note, index) => (
                <div
                  key={note.id}
                  className={`flex w-full justify-between  items-center p-2 hover:bg-base-300 rounded-md ${
                    index + 2 === selectedIndex ? "bg-base-300" : ""
                  }`}
                >
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
                  <p className="text-info-content text-xs  ">
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
        <div className="flex items-center gap-5 border-t border-neutral px-5 py-2">
          <div className=" text-info-content flex items-center gap-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 kbd ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
            <p>Navigate</p>
          </div>

          <div className=" text-info-content flex items-center gap-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 kbd">
              <path strokeLinecap="round" strokeLinejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
            </svg>

            <p>Open</p>
          </div>

          <div className=" text-info-content flex items-center gap-2 text-sm">
            <p className="kbd">esc</p>
            <p>Close</p>
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
