import { useEffect, useState } from "react";
import { useCreateTextModule } from "../../api/modulesApi/TextModuleApi";
import { useUpdateNote } from "../../api/NoteApi";
import { useWideModeStore } from "../../Stores/useWideModeStore";
import HeaderComponent from "./HeaderComponent";
import IconPicker from "./IconPicker";
import TagHandleComponent from "./TagHandleComponent";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useLocation } from "react-router-dom";
import ModuleComponent from "../moduleComponents/ModuleComponent";
import { moduleData, noteData, UpdateData } from "../../dataTypes";
import { SubPagesComponent } from "./SubPagesComponent";
import { ColorPicker } from "./ColorPicker";
import { useDynamicTitleAndFaviconHook } from "../../hooks/useDynamicTitleAndFavicontHook";
import { useDebounceHook } from "../../hooks/useDebounceHook";

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

  const [noteState, setNoteState] = useState<UpdateData>({
    title: singleNote.title,
    color: singleNote.color,
    icon: singleNote.icon,
  });

  const { debouncedValue: debouncedNoteState } = useDebounceHook(noteState, 500);

  useDynamicTitleAndFaviconHook(singleNote.title, singleNote.icon);

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
      icon: singleNote.icon,
    });
  }, [singleNote]);

  useEffect(() => {
    if (!singleNote || singleNoteLoading) return;

    if (
      debouncedNoteState.title !== singleNote.title ||
      debouncedNoteState.color !== singleNote.color ||
      debouncedNoteState.icon !== singleNote.icon
    ) {
      updateNote(debouncedNoteState);
    }
  }, [debouncedNoteState]); // this needs to be only dependency , it gets buggy if other dependencies are included

  if (singleNoteLoading)
    return (
      <div className="flex items-center justify-center w-full">
        <span className="loading loading-spinner text-primary loading-xl"></span>
      </div>
    );

  return (
    <div ref={setDroppableRef} className="flex flex-col flex-1 h-full w-full group/global overflow-auto ">
      <HeaderComponent singleNote={singleNote}></HeaderComponent>

      <div className="group/titleItems ">
        <div
          style={{ background: noteState.color }}
          className={`${noteState.color === "" ? "py-7 " : "py-24 "}  relative  transition-all flex items-center justify-center   `}
        ></div>

        <div className={`${!wideMode ? "lg:mx-60 " : "lg:mx-25 "} mx-25 relative  ${noteState.color === "" ? "mt-5" : "mt-12"}    transition-all`}>
          <div className="group-hover/titleItems:flex absolute hidden items-center -top-8 gap-2 scale-up-center z-100 ">
            <IconPicker noteState={noteState} setNoteState={setNoteState}></IconPicker>
            <ColorPicker setNoteState={setNoteState}></ColorPicker>
          </div>
          <div className="flex items-center gap-3">
            {singleNote.icon !== "" && <div className=" size-12 " dangerouslySetInnerHTML={{ __html: noteState.icon! }}></div>}

            <div className="flex flex-col w-full">
              <input
                onChange={(e) => setNoteState((prev) => ({ ...prev, title: e.target.value }))}
                value={noteState.title}
                placeholder="Empty note"
                className="focus:outline-hidden text-4xl h-full font-bold bg-transparent input-lg input-ghost text-base-content  w-full   "
              ></input>
              <TagHandleComponent singleNote={singleNote}></TagHandleComponent>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex flex-col flex-1 mb-5   ${!wideMode ? "lg:mx-60" : "lg:mx-25 "} mx-25 relative   mt-10  transition-all  `}>
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
