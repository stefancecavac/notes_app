import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleNote } from "../api/NoteApi";
import NoteViewComponent from "../components/noteViewPage/NoteViewComponent";
import { DndContext, DragEndEvent, DragOverlay, pointerWithin, UniqueIdentifier } from "@dnd-kit/core";
import { useCallback, useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { moduleData } from "../dataTypes";
import { createPortal } from "react-dom";
import ModuleComponent from "../components/moduleComponents/ModuleComponent";
import { useUpdateModuleOrder } from "../api/modulesApi/ModuleApi";
import { DragStartEvent } from "@dnd-kit/core";
import { useDebounceHook } from "../hooks/useDebounceHook";

const NoteViewPage = () => {
  const { noteId } = useParams();
  const { updateModuleOrder } = useUpdateModuleOrder();
  const { singleNote, singleNoteLoading, singleNoteError } = useGetSingleNote({ noteId: noteId! });

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [moduleList, setModuleList] = useState(singleNote?.modules || []);

  const { debouncedValue: debouncedModuleList } = useDebounceHook(moduleList, 1000);

  const navigate = useNavigate();

  useEffect(() => {
    if (singleNote) {
      setModuleList(singleNote.modules);
    } else {
      setModuleList([]);
    }
  }, [singleNote]);

  useEffect(() => {
    if (singleNote) {
      if (debouncedModuleList !== singleNote.modules) {
        updateModuleOrder({ modules: debouncedModuleList, noteId: singleNote.id });
      }
    }
  }, [debouncedModuleList]);

  useEffect(() => {
    if (!singleNoteError) return;
    navigate("/dashboard");
  }, [navigate, singleNoteError]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
        const oldIndex = moduleList.findIndex((module) => module.id === active.id);
        const newIndex = moduleList.findIndex((module) => module.id === over?.id);

        if (oldIndex !== newIndex) {
          const newOrder = arrayMove(moduleList, oldIndex, newIndex);

          const updatedModules = newOrder.map((module: moduleData, index: number) => {
            const newOrderValue = (index + 1) * 0.1;
            return { ...module, order: newOrderValue };
          });

          setModuleList(updatedModules);
        }
      }
      setActiveId(null);
    },
    [moduleList]
  );

  if (!singleNote) {
    return null;
  }

  return (
    <DndContext collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <NoteViewComponent moduleList={moduleList} singleNote={singleNote} singleNoteLoading={singleNoteLoading}></NoteViewComponent>
      {createPortal(
        <DragOverlay>
          {activeId ? (
            <div className="shadow-md rounded-sm border-dashed border-neutral opacity-40  border-2">
              <ModuleComponent singleNoteLoading={singleNoteLoading} key={activeId} module={moduleList.find((module) => module.id === activeId)!} />
            </div>
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default NoteViewPage;
