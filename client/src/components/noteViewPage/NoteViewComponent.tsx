import { useEffect, useState } from "react";
import { useCreateTextModule } from "../../api/modulesApi/TextModuleApi";
import { useUpdateNote } from "../../api/NoteApi";
import { useWideModeStore } from "../../Stores/useWideModeStore";
import { useDebounce } from "use-debounce";
import HeaderComponent from "./HeaderComponent";
import IconPicker from "./IconPicker";
import TagHandleComponent from "./TagHandleComponent";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useLocation } from "react-router-dom";
import ModuleComponent from "../moduleComponents/ModuleComponent";
import { moduleData, noteData } from "../../dataTypes";
import SkeletonLoader from "../loaders/SkeletonLoader";
import { SubPagesComponent } from "./SubPagesComponent";
import { ColorPicker } from "./ColorPicker";

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

  const [noteState, setNoteState] = useState({
    title: singleNote.title,
    color: singleNote.color,
    selectedIcon: singleNote.icon,
  });

  const [debouncedNoteState] = useDebounce(noteState, 500);

  const location = useLocation();
  if (location.pathname.includes("/notes-split")) {
    if (!wideMode) {
      toggleWideMode();
    }
  }
  useEffect(() => {
    if (!singleNote) return;
    setNoteState({
      title: singleNote.title,
      color: singleNote.color,
      selectedIcon: singleNote.icon,
    });

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
    if (!singleNote || singleNoteLoading) return;

    if (
      debouncedNoteState.title !== singleNote.title ||
      debouncedNoteState.color !== singleNote.color ||
      debouncedNoteState.selectedIcon !== singleNote.icon
    ) {
      updateNote(debouncedNoteState);
    }
  }, [debouncedNoteState]);

  if (singleNoteLoading)
    return (
      <div className="flex flex-col flex-1 gap-2 w-full h-full">
        <div className="p-2">
          <SkeletonLoader height={20} width={150}></SkeletonLoader>
        </div>
        <div className="flex items-center  ml-50 mt-30 mb-30">
          <SkeletonLoader height={70} width={300}></SkeletonLoader>
        </div>
        <div className="flex  justify-center h-full">
          <SkeletonLoader height={300} width={800}></SkeletonLoader>
        </div>
      </div>
    );

  return (
    <div ref={setDroppableRef} className="flex flex-col flex-1 h-full w-full group/global overflow-auto ">
      <HeaderComponent singleNoteLoading={singleNoteLoading} singleNote={singleNote}></HeaderComponent>

      <div className="group/titleItems ">
        <div
          style={{ background: noteState.color }}
          className={`${noteState.color === "" ? "py-7 " : "py-24 "}  relative  transition-all flex items-center justify-center   `}
        >
          <ColorPicker setNoteState={setNoteState}></ColorPicker>
        </div>

        <div
          className={`${!wideMode ? "lg:mx-60 " : "lg:mx-20 "} mx-20 relative sm:mx-5 ${
            noteState.color === "" ? "mt-10" : "mt-14"
          }    transition-all`}
        >
          <div className="flex flex-col  ">
            <IconPicker noteState={noteState} setNoteState={setNoteState}></IconPicker>
            <input
              onChange={(e) => setNoteState((prev) => ({ ...prev, title: e.target.value }))}
              value={noteState.title || singleNote?.title || ""}
              className="focus:outline-hidden text-4xl h-full font-bold bg-transparent input-lg input-ghost  w-full   "
            ></input>
            <TagHandleComponent singleNote={singleNote}></TagHandleComponent>
          </div>
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
