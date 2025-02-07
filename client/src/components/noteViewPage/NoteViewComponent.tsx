import { useEffect, useState } from "react";
import { useCreateTextModule } from "../../api/modulesApi/TextModuleApi";
import { useUpdateNote } from "../../api/NoteApi";
import { useDeleteHook } from "../../hooks/useDeleteHook";
import { useWideModeStore } from "../../Stores/useWideModeStore";
import { useDebounce } from "use-debounce";
import HeaderComponent from "./HeaderComponent";
import ColorPicker from "./ColorPicker";
import IconPicker from "./IconPicker";
import TagHandleComponent from "./TagHandleComponent";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Link, useLocation } from "react-router-dom";
import ModuleComponent from "../moduleComponents/ModuleComponent";
import { moduleData, noteData } from "../../dataTypes";
import SkeletonLoader from "../loaders/SkeletonLoader";

const NoteViewComponent = ({
  singleNote,
  singleNoteLoading,
  moduleList,
}: {
  singleNote: noteData;
  singleNoteLoading: boolean;
  moduleList: moduleData[];
}) => {
  const { updateNote } = useUpdateNote({ noteId: singleNote?.id });
  const { wideMode, toggleWideMode } = useWideModeStore();
  const { handleDeleteNote } = useDeleteHook();
  const { createTextModule } = useCreateTextModule();
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: singleNote.id,
  });

  const [editable, setEditable] = useState(false); // TODO make notes not editable to other users

  const [title, setTitle] = useState<string | undefined>(singleNote?.title);
  const [color, setColor] = useState<string | undefined>(singleNote?.color);
  const [selectedIcon, setSelectedIcon] = useState<string | undefined>(singleNote?.icon);
  const [debouncedTitle] = useDebounce(title, 500);
  const [debouncedColor] = useDebounce(color, 500);
  const [debouncedIcon] = useDebounce(selectedIcon, 500);

  const location = useLocation();
  if (location.pathname.includes("/notes-split")) {
    if (!wideMode) {
      toggleWideMode();
    }
  }
  useEffect(() => {
    if (!singleNote) return;
    setColor(singleNote?.color);
    setTitle(singleNote?.title);
    setSelectedIcon(singleNote?.icon);

    document.title = singleNote.title === "" ? "New note" : singleNote.title;

    const link = (document.querySelector("link[rel='icon']") as HTMLLinkElement) || document.createElement("link");

    link.type = "image/svg+xml";
    link.rel = "icon";

    if (singleNote.icon && singleNote.icon.trim() !== "") {
      link.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(singleNote.icon)}`;
    } else {
      const fallbackSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#a3a3a3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>`;
      link.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fallbackSvg)}`;
    }

    if (!document.head.contains(link)) {
      document.head.appendChild(link);
    }
  }, [singleNote]);

  useEffect(() => {
    if (singleNote && !singleNoteLoading) {
      const titleChanged = title !== singleNote.title;
      const colorChanged = color !== singleNote.color;
      const iconChanged = selectedIcon !== singleNote.icon;

      if (titleChanged || colorChanged || iconChanged) {
        // navigate(`/notes/${singleNote.id}/${encodeURIComponent(title as string)}`); TODO: this doesnt work in split screen need better way
        updateNote({
          title: debouncedTitle,
          color: debouncedColor,
          icon: debouncedIcon,
        });
      }
    }
  }, [debouncedColor, debouncedTitle, debouncedIcon]);

  return (
    <div ref={setDroppableRef} className="flex flex-col flex-1 h-full w-full group/global overflow-auto ">
      <HeaderComponent singleNoteLoading={singleNoteLoading} singleNote={singleNote}></HeaderComponent>

      <div className="group/titleItems ">
        {singleNoteLoading ? (
          <SkeletonLoader height={200} width={"100%"}></SkeletonLoader>
        ) : (
          <div
            style={{ background: color }}
            className={`${
              color === "" ? "py-7 " : "py-24 "
            } mx-5 rounded-lg relative  transition-all flex items-center justify-center text-neutral-300  `}
          >
            <ColorPicker setColor={setColor}></ColorPicker>
          </div>
        )}

        <div className={`${!wideMode ? "lg:mx-60 " : "lg:mx-20 "} mx-20 relative sm:mx-5 ${color === "" ? "mt-10" : "mt-14"}    transition-all`}>
          {singleNoteLoading ? (
            <div className="flex flex-col gap-2">
              <SkeletonLoader height={40} width={300}></SkeletonLoader>
              <SkeletonLoader height={20} width={100}></SkeletonLoader>
            </div>
          ) : (
            <div className="flex flex-col  ">
              <IconPicker selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon}></IconPicker>
              <input
                onMouseDown={() => setEditable(true)}
                onChange={(e) => setTitle(e.target.value)}
                value={title || singleNote?.title || ""}
                className="focus:outline-hidden text-4xl font-bold bg-transparent  text-neutral-600 dark:text-neutral-200 w-full   "
              ></input>
              <TagHandleComponent singleNote={singleNote}></TagHandleComponent>
            </div>
          )}
        </div>
      </div>

      <div className={`flex flex-col flex-1 mb-5   ${!wideMode ? "lg:mx-60" : "lg:mx-20 "} mx-20 relative sm:mx-5  mt-10  transition-all  `}>
        {singleNote?.modules?.length === 0 && (
          <div className="   w-full flex   opacity-0 h-0 my-0 duration-300 ease-in-out group-hover/global:opacity-100   group-hover/global:my-10   transition-all   ">
            <button
              onClick={() => createTextModule({ content: "", order: 1, noteId: singleNote.id })}
              className="rounded-lg flex text-sm    items-center gap-3  px-2 py-0.5  bg-white text-neutral-400 scale-0 duration-300 ease-in-out group-hover/global:scale-100 "
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <p className="">Add new module</p>
            </button>
          </div>
        )}

        <SortableContext items={moduleList} strategy={rectSortingStrategy}>
          <div className="flex flex-col gap-1    ">
            {moduleList?.map((module, index) => (
              <ModuleComponent
                key={module.id}
                module={module}
                nextModule={moduleList[index + 1] || null}
                singleNote={singleNote}
                singleNoteLoading={singleNoteLoading}
              />
            ))}
          </div>
          {singleNote?.childNotes?.length !== 0 && (
            <div className="flex flex-col mt-10 p-1  ">
              <p className="mb-1 text-neutral-400  dark:text-neutral-200 py-2 font-medium border-b-2 dark:border-neutral-700">Pages:</p>
              {singleNote?.childNotes?.map((note) => (
                <div
                  key={note.id}
                  className="flex items-center justify-between gap-3 my-1  group dark:hover:bg-neutral-800 hover:bg-neutral-100 rounded-lg p-1"
                >
                  <Link
                    className="flex items-center  text-neutral-400 dark:text-neutral-200  gap-2 hover:underline "
                    to={`/notes/${note.id}/${note.title}`}
                  >
                    {note.icon ? (
                      <div className="size-5 text-neutral-500" dangerouslySetInnerHTML={{ __html: note.icon }}></div>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4 text-neutral-400 dark:text-neutral-200  "
                      >
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                        <path d="M10 9H8" />
                        <path d="M16 13H8" />
                        <path d="M16 17H8" />
                      </svg>
                    )}

                    <p className="text-neutral-400 dark:text-neutral-200 text-sm ">{note.title}</p>
                  </Link>
                  <button onClick={() => handleDeleteNote(note.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
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
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default NoteViewComponent;
