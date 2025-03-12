import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, pointerWithin, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import ModuleComponent from "./moduleComponents/ModuleComponent";
import { createPortal } from "react-dom";
import React, { useCallback, useState } from "react";
import { moduleData } from "../dataTypes";
import { useUpdateModuleOrder } from "../api/modulesApi/ModuleApi";

type ModuleListDraggapleProps = {
  modules: moduleData[];
  singleNoteId: string;
  singleNoteLoading: boolean;
};

const ModuleListDraggable = React.memo(({ modules, singleNoteId, singleNoteLoading }: ModuleListDraggapleProps) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const { updateModuleOrder } = useUpdateModuleOrder();

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (!modules) return;
      const { active, over } = event;

      if (active.id !== over?.id) {
        const oldIndex = modules.findIndex((module) => module.id === active.id);
        const newIndex = modules.findIndex((module) => module.id === over?.id);

        if (oldIndex !== newIndex) {
          const newOrder = arrayMove(modules, oldIndex, newIndex);

          const updatedModules = newOrder.map((module: moduleData, index: number) => {
            const newOrderValue = (index + 1) * 0.1;
            return { ...module, order: newOrderValue };
          });

          updateModuleOrder({ modules: updatedModules, noteId: singleNoteId });
        }
      }
      setActiveId(null);
    },
    [modules, singleNoteId, updateModuleOrder]
  );

  return (
    <DndContext collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={modules} strategy={rectSortingStrategy}>
        <div className="flex flex-col gap-1    ">
          {modules.map((module, index) => (
            <ModuleComponent key={module.id} module={module} nextModule={modules[index + 1] || null} singleNoteLoading={singleNoteLoading} />
          ))}
        </div>
      </SortableContext>

      {createPortal(
        <DragOverlay>
          {activeId ? (
            <div className="shadow-md rounded-sm border-dashed border-neutral opacity-40  border-2">
              <ModuleComponent singleNoteLoading={singleNoteLoading} key={activeId} module={modules.find((module) => module.id === activeId)!} />
            </div>
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
});

export default ModuleListDraggable;
