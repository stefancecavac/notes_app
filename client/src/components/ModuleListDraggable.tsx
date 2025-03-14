import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, pointerWithin, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import ModuleComponent from "./moduleComponents/ModuleComponent";
import { createPortal } from "react-dom";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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

  const [modulesData, setModulesData] = useState(() => modules);

  useEffect(() => {
    setModulesData(modules);
  }, [modules]);

  const memoModules = useMemo(() => modules, [modules]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (!memoModules) return;
      const { active, over } = event;

      if (active.id !== over?.id) {
        const oldIndex = memoModules.findIndex((module) => module.id === active.id);
        const newIndex = memoModules.findIndex((module) => module.id === over?.id);

        if (oldIndex !== newIndex) {
          const newOrder = arrayMove(memoModules, oldIndex, newIndex);

          const updatedModules = newOrder.map((module: moduleData, index: number) => {
            const newOrderValue = (index + 1) * 0.1;
            return { ...module, order: newOrderValue };
          });

          setModulesData(updatedModules);
          updateModuleOrder({ modules: updatedModules, noteId: singleNoteId });
        }
      }
      setActiveId(null);
    },
    [memoModules, singleNoteId, updateModuleOrder]
  );

  if (!memoModules) return;

  return (
    <DndContext collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={modulesData} strategy={rectSortingStrategy}>
        <div className="flex flex-col gap-1    ">
          {modulesData.map((module, index) => (
            <ModuleComponent key={module.id} module={module} nextModule={modulesData[index + 1] || null} singleNoteLoading={singleNoteLoading} />
          ))}
        </div>
      </SortableContext>

      {createPortal(
        <DragOverlay>
          {activeId ? (
            <div className="shadow-md rounded-sm border-dashed border-neutral opacity-40  border-2">
              <ModuleComponent singleNoteLoading={singleNoteLoading} key={activeId} module={modulesData.find((module) => module.id === activeId)!} />
            </div>
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
});

export default ModuleListDraggable;
