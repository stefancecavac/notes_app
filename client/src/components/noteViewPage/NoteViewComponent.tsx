import React, { useEffect, useState } from "react";
import { useUpdateNote } from "../../api/NoteApi";
import { useWideModeStore } from "../../Stores/useWideModeStore";
import HeaderComponent from "./HeaderComponent";
import IconPicker from "./IconPicker";
import TagHandleComponent from "./TagHandleComponent";
import { useDroppable } from "@dnd-kit/core";
import { noteData, UpdateData } from "../../dataTypes";
import { SubPagesComponent } from "./SubPagesComponent";
import { ColorPicker } from "./ColorPicker";
import { useDebounceHook } from "../../hooks/useDebounceHook";

import ModuleListDraggable from "../ModuleListDraggable";
import SkeletonLoader from "../loaders/SkeletonLoader";
import { useCreateModule } from "../../api/ModuleApi";

type noteViewComponentProps = {
  singleNote: noteData;
  singleNoteLoading: boolean;
};

const NoteViewComponent = React.memo(({ singleNote, singleNoteLoading }: noteViewComponentProps) => {
  const { updateNote } = useUpdateNote({ noteId: singleNote?.id });
  const { wideMode } = useWideModeStore();
  const { createModule } = useCreateModule();
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: singleNote.id,
  });

  const [noteState, setNoteState] = useState<UpdateData>(() => ({
    noteTitle: singleNote.noteTitle,
    noteColor: singleNote.noteColor,
    noteIcon: singleNote.noteIcon,
  }));

  const { debouncedValue: debouncedNoteState } = useDebounceHook(noteState, 500);

  useEffect(() => {
    if (!singleNote && singleNoteLoading) return;
    document.title = singleNote.noteTitle!;

    const favicon = document.getElementById("favicon") as HTMLLinkElement | null;

    if (!favicon && singleNote.noteIcon === "") return;
    const svg = singleNote.noteIcon!.trim();
    const encoded = encodeURIComponent(svg).replace(/'/g, "%27").replace(/"/g, "%22");

    const dataUrl = `data:image/svg+xml,${encoded}`;
    favicon!.type = "image/svg+xml";
    favicon!.href = dataUrl;
  }, [singleNote, singleNoteLoading]);

  useEffect(() => {
    if (!singleNote) return;
    setNoteState({
      noteTitle: singleNote.noteTitle,
      noteColor: singleNote.noteColor,
      noteIcon: singleNote.noteIcon,
    });
  }, [singleNote]);

  useEffect(() => {
    if (!singleNote || singleNoteLoading) return;

    if (
      debouncedNoteState.noteTitle !== singleNote.noteTitle ||
      debouncedNoteState.noteColor !== singleNote.noteColor ||
      debouncedNoteState.noteIcon !== singleNote.noteIcon
    ) {
      updateNote(debouncedNoteState);
    }
  }, [debouncedNoteState]); // this needs to be only dependency , it gets buggy if other dependencies are included

  return (
    <div ref={setDroppableRef} className="flex flex-col flex-1 h-full w-full group/global overflow-auto ">
      <HeaderComponent breadCrumbs={singleNote.breadCrumbs} singleNote={singleNote} singleNoteLoading={singleNoteLoading} />

      <div className="group/titleItems ">
        <div
          style={{ background: noteState.noteColor }}
          className={`${noteState.noteColor === "" ? "py-7 " : "py-24 "}  relative  transition-all flex items-center justify-center   `}
        ></div>

        <div
          className={`${!wideMode ? "lg:mx-60 " : "lg:mx-25 "} mx-25 relative   ${noteState.noteColor === "" ? "mt-5" : "mt-12"}    transition-all`}
        >
          <div className="group-hover/titleItems:flex absolute hidden items-center -top-8 gap-2 scale-up-center z-100 ">
            <IconPicker noteState={noteState} setNoteState={setNoteState}></IconPicker>
            <ColorPicker setNoteState={setNoteState}></ColorPicker>
          </div>

          <div className="flex items-center gap-3">
            {singleNoteLoading ? (
              <SkeletonLoader height={70} width={70}></SkeletonLoader>
            ) : (
              singleNote.noteIcon !== "" && <div className=" size-12 " dangerouslySetInnerHTML={{ __html: noteState.noteIcon! }}></div>
            )}

            <div className="flex flex-col w-full h-20">
              {singleNoteLoading ? (
                <SkeletonLoader height={45} width={300}></SkeletonLoader>
              ) : (
                <>
                  <input
                    onChange={(e) => setNoteState((prev) => ({ ...prev, noteTitle: e.target.value }))}
                    value={noteState.noteTitle}
                    placeholder="Empty note"
                    className="focus:outline-hidden text-[2.5rem] h-full font-bold bg-transparent input-lg input-ghost text-base-content  w-full   "
                  ></input>
                  <TagHandleComponent singleNote={singleNote}></TagHandleComponent>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col flex-1 mb-5 h-full   ${
          !wideMode ? "lg:mr-60 lg:ml-40" : "lg:mx-25 lg:ml-5 "
        } mx-25 relative    pt-10  transition-all  `}
      >
        {singleNote?.modules?.length === 0 && (
          <div className="   w-full  flex    ">
            <button
              onClick={() => createModule({ properties: { content: "" }, type: "text", order: 1, noteId: singleNote.id })}
              className="w-full h-10 text-info-content text-xs btn btn-ghost "
            >
              Add content
            </button>
          </div>
        )}

        <ModuleListDraggable modules={singleNote.modules} singleNoteId={singleNote.id} singleNoteLoading={singleNoteLoading} />

        <SubPagesComponent note={singleNote}></SubPagesComponent>
      </div>
    </div>
  );
});

export default NoteViewComponent;
