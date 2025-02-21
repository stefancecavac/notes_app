import { useCreateTextModule } from "../../api/modulesApi/TextModuleApi";
import { moduleData, noteData } from "../../dataTypes";
import { useCreateNote } from "../../api/NoteApi";
import { useParams } from "react-router-dom";
import { useCreateImageModule } from "../../api/modulesApi/ImageModuleApi";
import { useCreateTodoModule } from "../../api/modulesApi/TodoModuleApi";
import { useCreateDrawingModule } from "../../api/modulesApi/DrawingModuleApi";

type newModuleModalProps = {
  module?: moduleData;
  nextModule?: moduleData | null;
  singleNote: noteData | undefined;
};

export const NewModuleModal = ({ module, nextModule, singleNote }: newModuleModalProps) => {
  const { createTextModule } = useCreateTextModule();
  const { createNote } = useCreateNote();
  const { createImageModule } = useCreateImageModule();
  const { createTodoModule } = useCreateTodoModule();
  const { createDrawingModule } = useCreateDrawingModule();

  const { noteId } = useParams();

  const calculateOrder = (currentModuleOrder: number, nextModuleOrder: number | undefined) => {
    if (nextModuleOrder !== undefined) {
      return (currentModuleOrder + nextModuleOrder) / 2;
    }

    return currentModuleOrder + 1;
  };

  const handleOpenMoveModal = () => {
    const modal = document.getElementById("module-modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const handleUploadPic = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      createImageModule({ imagePath: base64Image, order: calculateOrder(module!.order, nextModule?.order), noteId: singleNote?.id });
    };
  };

  return (
    <>
      <button className="btn btn-xs btn-square btn-ghost m-1 text-info-content" onClick={() => handleOpenMoveModal()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      <dialog id="module-modal" className="modal " onMouseLeave={() => (document.getElementById("module-modal") as HTMLDialogElement).close()}>
        <div className="modal-box p-3  max-w-sm">
          <div className="flex flex-col p-1 text-start">
            <h2 className="text-sm text-base-content font-bold">Modules</h2>
            <p className="text-info-content text-xs">Choose what modules to insert</p>
          </div>

          <div className="flex flex-col my-5 ">
            <button
              onClick={() => createNote({ title: "New page", content: "", parentNoteId: noteId })}
              className=" items-center btn btn-ghost  h-full justify-start  flex p-1  gap-5"
            >
              <div className="rounded-lg  p-1 bg-neutral/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 "
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
                <p className="text-xs text-info-content font-thin">Embed a sub-page indside this page </p>
              </div>
            </button>

            <button
              onClick={() => createTextModule({ content: "", order: calculateOrder(module!.order, nextModule?.order), noteId: singleNote?.id })}
              className=" items-center btn btn-ghost  h-full justify-start  flex p-1  gap-5"
            >
              <div className="rounded-lg p-1 bg-neutral/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 "
                >
                  <polyline points="4 7 4 4 20 4 20 7" />
                  <line x1="9" x2="15" y1="20" y2="20" />
                  <line x1="12" x2="12" y1="4" y2="20" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-sm">Text </p>
                <p className="text-xs text-info-content font-thin">Add text block </p>
              </div>
            </button>
            <label className=" items-center btn btn-ghost  h-full justify-start  flex p-1  gap-5">
              <input onChange={handleUploadPic} type="file" className="appearance-none hidden input"></input>
              <div className="rounded-lg  p-1 bg-neutral/50">
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
                  className="size-5 "
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-sm">Image </p>
                <p className="text-xs text-info-content font-thin">Insert an image </p>
              </div>
            </label>
            <button
              onClick={() => createTodoModule({ order: calculateOrder(module!.order, nextModule?.order), noteId: singleNote?.id })}
              className=" items-center btn btn-ghost  h-full justify-start  flex p-1  gap-5"
            >
              <div className="rounded-lg  p-1 bg-neutral/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-sm">To Do </p>
                <p className="text-xs text-info-content font-thin">Add todo list</p>
              </div>
            </button>

            <button
              onClick={() => createDrawingModule({ order: calculateOrder(module!.order, nextModule?.order), noteId: singleNote?.id })}
              className=" items-center btn btn-ghost  h-full justify-start  flex p-1  gap-5"
            >
              <div className="rounded-lg  p-1 bg-neutral/50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-sm">Drawing </p>
                <p className="text-xs text-info-content font-thin">Add Drawing</p>
              </div>
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
