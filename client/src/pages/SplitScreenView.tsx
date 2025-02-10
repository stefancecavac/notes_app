import { useParams } from "react-router-dom";
import { useGetSingleNote } from "../api/NoteApi";
import NoteViewComponent from "../components/noteViewPage/NoteViewComponent";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useRef, useState } from "react";
import { closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { useDragStore } from "../Stores/useDragStore";
import { createPortal } from "react-dom";
import ModuleComponent from "../components/moduleComponents/ModuleComponent";
import { useUpdateModuleOrder } from "../api/modulesApi/ModuleApi";
import { useDebounce } from "use-debounce";

const SplitScreenView = () => {
  const { updateModuleOrder } = useUpdateModuleOrder();

  const { noteId1, noteId2 } = useParams();
  const { singleNote: singleNote1, singleNoteLoading: singleNoteLoading1 } = useGetSingleNote({ noteId: noteId1! });
  const { singleNote: singleNote2, singleNoteLoading: singleNoteLoading2 } = useGetSingleNote({ noteId: noteId2! });
  const { activeModule, setActiveModule } = useDragStore();

  const [moduleList1, setModuleList1] = useState(singleNote1?.modules || []);
  const [moduleList2, setModuleList2] = useState(singleNote2?.modules || []);

  const [debouncedModuleList1] = useDebounce(moduleList1, 1000);
  const [debouncedModuleList2] = useDebounce(moduleList2, 1000);

  useEffect(() => {
    if (singleNote1) {
      setModuleList1(singleNote1.modules);
    } else {
      setModuleList1([]);
    }
  }, [singleNote1]);

  useEffect(() => {
    if (singleNote2) {
      setModuleList2(singleNote2.modules);
    } else {
      setModuleList2([]);
    }
  }, [singleNote2]);

  useEffect(() => {
    if (singleNote1 && debouncedModuleList1 !== singleNote1.modules) {
      updateModuleOrder({ modules: debouncedModuleList1, noteId: singleNote1.id });
    }
    if (singleNote2 && debouncedModuleList2 !== singleNote2.modules) {
      updateModuleOrder({ modules: debouncedModuleList2, noteId: singleNote2.id });
    }
  }, [debouncedModuleList1, debouncedModuleList2]);

  const handleDragStart = (event: DragStartEvent) => {
    const activeNoteId = event.active.data?.current?.noteId;
    const sourceModules = activeNoteId === noteId1 ? moduleList1 : moduleList2;
    const module = sourceModules.find((m) => m.id === event.active.id);
    setActiveModule(module);
  };

  const handleDragOver = (event: DragEndEvent) => {
    const { active, over } = event;

    const sourceNoteId = activeModule?.noteId;
    const targetNoteId = over?.data?.current?.noteId;

    if (!sourceNoteId && !targetNoteId) return;

    if (targetNoteId === undefined) return;
    if (sourceNoteId !== targetNoteId) {
      const sourceModules = sourceNoteId === noteId1 ? [...moduleList1] : [...moduleList2];
      const targetModules = targetNoteId === noteId1 ? [...moduleList1] : [...moduleList2];

      const updatedSourceModules = sourceModules.filter((module) => module.id !== active.id);

      const hoverIndex = targetModules.findIndex((module) => module.id === over?.id);

      let updatedTargetModules: any[];

      const targetWithoutDraggedModule = targetModules.filter((module) => module.id !== active.id);

      if (hoverIndex !== -1) {
        updatedTargetModules = [
          ...targetWithoutDraggedModule.slice(0, hoverIndex),
          { ...activeModule, noteId: targetNoteId, id: activeModule?.id },
          ...targetWithoutDraggedModule.slice(hoverIndex),
        ];
      } else {
        updatedTargetModules = [...targetWithoutDraggedModule, { ...activeModule, noteId: targetNoteId, id: activeModule?.id }];
      }

      const reorderedTargetModules = updatedTargetModules.map((module, index) => ({
        ...module,
        order: (index + 1) * 0.1,
      }));

      if (sourceNoteId === noteId1) setModuleList1(updatedSourceModules);
      if (sourceNoteId === noteId2) setModuleList2(updatedSourceModules);

      if (targetNoteId === noteId1) setModuleList1(reorderedTargetModules);
      if (targetNoteId === noteId2) setModuleList2(reorderedTargetModules);
    }
    if (sourceNoteId === targetNoteId) {
      const sourceModules = sourceNoteId === noteId1 ? moduleList1 : moduleList2;
      const oldIndex = sourceModules.findIndex((module) => module.id === active.id);
      const newIndex = sourceModules.findIndex((module) => module.id === over?.id);

      if (oldIndex !== newIndex) {
        const newOrder = arrayMove(sourceModules, oldIndex, newIndex);
        const updatedModules = newOrder.map((module, index) => ({
          ...module,
          order: (index + 1) * 0.1,
        }));

        if (sourceNoteId === noteId1) setModuleList1(updatedModules);
        if (sourceNoteId === noteId2) setModuleList2(updatedModules);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over || !activeModule) return;

    const sourceNoteId = activeModule.noteId;
    const targetNoteId = over.data?.current?.noteId;

    if (!sourceNoteId || !targetNoteId) return;

    if (sourceNoteId === targetNoteId) {
      const sourceModules = sourceNoteId === noteId1 ? moduleList1 : moduleList2;
      const oldIndex = sourceModules.findIndex((module) => module.id === active.id);
      const newIndex = sourceModules.findIndex((module) => module.id === over.id);

      if (oldIndex !== newIndex) {
        const newOrder = arrayMove(sourceModules, oldIndex, newIndex);
        const updatedModules = newOrder.map((module, index) => ({
          ...module,
          order: (index + 1) * 0.1,
        }));

        if (sourceNoteId === noteId1) setModuleList1(updatedModules);
        if (sourceNoteId === noteId2) setModuleList2(updatedModules);
      }
    }
  };

  const [dividerPosition, setDividerPosition] = useState(50);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging.current) return;

    const newDividerPosition = (event.clientX / window.innerWidth) * 100;

    if (newDividerPosition > 20 && newDividerPosition < 80) {
      setDividerPosition(newDividerPosition);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  if (!singleNote1 || !singleNote2) return null;

  return (
    <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <div className="flex max-w-full h-screen ">
        <div style={{ width: `${dividerPosition}%` }} className=" overflow-visible">
          <NoteViewComponent key={noteId1} moduleList={moduleList1} singleNote={singleNote1} singleNoteLoading={singleNoteLoading1} />
        </div>

        <div className="w-1 bg-neutral-200 hover:bg-neutral-400 cursor-col-resize transition-all" onMouseDown={handleMouseDown} />

        <div style={{ width: `100 - ${dividerPosition}%` }} className=" overflow-visible transition-all">
          <NoteViewComponent key={noteId2} moduleList={moduleList2} singleNote={singleNote2} singleNoteLoading={singleNoteLoading2} />
        </div>
      </div>
      {createPortal(
        <DragOverlay>
          {activeModule ? (
            <div className="shadow-md rounded-sm border-dashed border-neutral-400  border-2">
              <ModuleComponent key={activeModule.id} module={activeModule} />
            </div>
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default SplitScreenView;
