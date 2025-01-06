import { useCreateTextModule } from "../../api/modulesApi/TextModuleApi";
import { moduleData, noteData } from "../../dataTypes";
import { useCreateNote } from "../../api/NoteApi";
import { useParams } from "react-router-dom";

const NewModuleModal = ({
  menuOpen,
  setMenuOpen,
  module,
  nextModule,
  singleNote,
}: {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  module?: moduleData;
  nextModule?: moduleData | null;
  singleNote: noteData;
}) => {
  const { createTextModule } = useCreateTextModule();
  const { createNote } = useCreateNote();

  const { noteId } = useParams();

  const calculateOrder = (currentModuleOrder: number, nextModuleOrder: number | undefined) => {
    if (nextModuleOrder !== undefined) {
      return (currentModuleOrder + nextModuleOrder) / 2;
    }

    return currentModuleOrder + 1;
  };

  return (
    menuOpen && (
      <div
        onMouseLeave={() => setMenuOpen(false)}
        className={`${
          menuOpen ? "slide-bottom" : " scale-0"
        }   flex flex-col gap-2 transition-all absolute  w-max  bg-neutral-50 dark:bg-neutral-800  dark:text-neutral-300  rounded-lg  p-1  shadow-[0_4px_6px_rgba(0,0,0,0.1),0_-4px_6px_rgba(0,0,0,0.1)]`}
      >
        <div className="flex flex-col p-2 text-start">
          <h2 className="text-sm">Modules</h2>
          <p className="text-neutral-400 text-xs">Choose what modules to insert</p>
        </div>

        <div className="flex flex-col  ">
          <button
            onClick={() => createNote({ title: "New page", content: "", parentNoteId: noteId })}
            className=" items-center  text-neutral-700 rounded-lg hover:bg-neutral-300/20 dark:hover:bg-neutral-700 transition-all p-1 dark:text-neutral-200  flex  gap-2"
          >
            <div className="rounded-lg bg-neutral-100  dark:bg-neutral-900 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 text-neutral-500"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm">Page </p>
              <p className="text-xs text-neutral-500">Embed a sub-page indside this page </p>
            </div>
          </button>

          <button
            onClick={() => createTextModule({ content: "", order: calculateOrder(module!.order, nextModule?.order), noteId: singleNote.id })}
            className=" items-center  text-neutral-700 rounded-lg hover:bg-neutral-300/20 dark:hover:bg-neutral-700 transition-all p-1 dark:text-neutral-200  flex  gap-2"
          >
            <div className="rounded-lg bg-neutral-100  dark:bg-neutral-900 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 text-neutral-500"
              >
                <polyline points="4 7 4 4 20 4 20 7" />
                <line x1="9" x2="15" y1="20" y2="20" />
                <line x1="12" x2="12" y1="4" y2="20" />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm">Text </p>
              <p className="text-xs text-neutral-500">Add text block </p>
            </div>
          </button>
          <button className="rounded-lg items-center text-neutral-700 p-1 hover:bg-neutral-300/20 dark:hover:bg-neutral-700 transition-all dark:text-neutral-200 flex  gap-2">
            <div className="rounded-lg bg-neutral-100  dark:bg-neutral-900 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 text-neutral-500"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm">Image </p>
              <p className="text-xs text-neutral-500">Insert an image </p>
            </div>
          </button>
          <button className="rounded-lg items-center text-neutral-700 p-1 hover:bg-neutral-300/20 dark:hover:bg-neutral-700 transition-all dark:text-neutral-200  flex  gap-2">
            <div className="rounded-lg bg-neutral-100  dark:bg-neutral-900 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 text-neutral-500"
              >
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                <rect x="2" y="6" width="14" height="12" rx="2" />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm">Video </p>
              <p className="text-xs text-neutral-500">Embed a video</p>
            </div>
          </button>
        </div>
      </div>
    )
  );
};

export default NewModuleModal;
