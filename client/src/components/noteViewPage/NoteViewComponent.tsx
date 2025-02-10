import { useEffect, useState } from "react";
import { useCreateTextModule } from "../../api/modulesApi/TextModuleApi";
import { useUpdateNote } from "../../api/NoteApi";
import { useWideModeStore } from "../../Stores/useWideModeStore";
import { useDebounce } from "use-debounce";
import HeaderComponent from "./HeaderComponent";
import ColorPicker from "./ColorPicker";
import IconPicker from "./IconPicker";
import TagHandleComponent from "./TagHandleComponent";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useLocation } from "react-router-dom";
import ModuleComponent from "../moduleComponents/ModuleComponent";
import { moduleData, noteData } from "../../dataTypes";
import SkeletonLoader from "../loaders/SkeletonLoader";
import { SubPagesComponent } from "./SubPagesComponent";

type noteViewComponentProps = {
  singleNote: noteData;
  singleNoteLoading: boolean;
  moduleList: moduleData[];
};

const NoteViewComponent = ({ singleNote, singleNoteLoading, moduleList }: noteViewComponentProps) => {
  const { updateNote } = useUpdateNote({ noteId: singleNote?.id });
  const { wideMode, toggleWideMode } = useWideModeStore();
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
            className={`${color === "" ? "py-7 " : "py-24 "} mx-5 rounded-lg relative  transition-all flex items-center justify-center   `}
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
                className="focus:outline-hidden text-4xl h-full font-bold bg-transparent input-lg input-ghost  w-full   "
              ></input>
              <TagHandleComponent singleNote={singleNote}></TagHandleComponent>
            </div>
          )}
        </div>
      </div>

      <div className={`flex flex-col flex-1 mb-5   ${!wideMode ? "lg:mx-60" : "lg:mx-20 "} mx-20 relative sm:mx-5  mt-10  transition-all  `}>
        {singleNote?.modules?.length === 0 && (
          <div className="   w-full flex   opacity-0  group-hover/global:opacity-100    transition-all   ">
            <button
              onClick={() => createTextModule({ content: "", order: 1, noteId: singleNote.id })}
              className="rounded-lg flex text-sm  btn btn-sm  btn-soft  items-center gap-3  px-2 py-0.5   scale-0 transition-all group-hover/global:scale-100 "
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
        </SortableContext>

        <SubPagesComponent note={singleNote}></SubPagesComponent>
      </div>
    </div>
  );
};

export default NoteViewComponent;
