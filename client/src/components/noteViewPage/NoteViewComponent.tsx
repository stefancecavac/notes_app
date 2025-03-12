import React, { useEffect, useState } from "react";
import { useCreateTextModule } from "../../api/modulesApi/TextModuleApi";
import { useUpdateNote } from "../../api/NoteApi";
import { useWideModeStore } from "../../Stores/useWideModeStore";
import HeaderComponent from "./HeaderComponent";
import IconPicker from "./IconPicker";
import TagHandleComponent from "./TagHandleComponent";
import { useDroppable } from "@dnd-kit/core";
import { noteData, UpdateData } from "../../dataTypes";
import { SubPagesComponent } from "./SubPagesComponent";
import { ColorPicker } from "./ColorPicker";
import { useDynamicTitleAndFaviconHook } from "../../hooks/useDynamicTitleAndFavicontHook";
import { useDebounceHook } from "../../hooks/useDebounceHook";
import NoteViewSkeleton from "../loaders/NoteViewSkeleton";

import ModuleListDraggable from "../ModuleListDraggable";

type noteViewComponentProps = {
  singleNote: noteData;
  singleNoteLoading: boolean;
};

const NoteViewComponent = React.memo(({ singleNote, singleNoteLoading }: noteViewComponentProps) => {
  const { updateNote } = useUpdateNote({ noteId: singleNote?.id });
  const { wideMode } = useWideModeStore();
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

  // useDynamicTitleAndFaviconHook(singleNote.title, singleNote.icon);

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

  if (singleNoteLoading) return <NoteViewSkeleton />;

  return (
    <div ref={setDroppableRef} className="flex flex-col flex-1 h-full w-full group/global overflow-auto ">
      <HeaderComponent breadCrumbs={singleNote.breadCrumbs} singleNote={singleNote} />

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
                className="focus:outline-hidden text-[2.5rem] h-full font-bold bg-transparent input-lg input-ghost text-base-content  w-full   "
              ></input>
              <TagHandleComponent singleNote={singleNote}></TagHandleComponent>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex flex-col flex-1 mb-5    ${!wideMode ? "lg:mr-60 ml-40" : "lg:mr-25 ml-5 "} mx-25 relative    pt-5  transition-all  `}>
        {singleNote?.modules?.length === 0 && (
          <div className="   w-full h-full flex   opacity-0  group-hover/global:opacity-100    transition-all   ">
            <button
              onClick={() => createTextModule({ content: "", order: 1, noteId: singleNote.id })}
              className="w-full h-full hover:cursor-text scale-0 transition-all group-hover/global:scale-100 "
            ></button>
          </div>
        )}

        <ModuleListDraggable modules={singleNote.modules} singleNoteId={singleNote.id} singleNoteLoading={singleNoteLoading} />

        <SubPagesComponent note={singleNote}></SubPagesComponent>
      </div>
    </div>
  );
});

export default NoteViewComponent;
