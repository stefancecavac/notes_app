import { moduleData, noteData } from "../../dataTypes";
import { useDeleteModule } from "../../api/modulesApi/ModuleApi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import TextModuleComponent from "./TextModuleComponent";
import NewModuleModal from "./NewModuleModal";
import SkeletonLoader from "../loaders/SkeletonLoader";

const ModuleComponent = ({
  module,
  nextModule,
  singleNote,
  singleNoteLoading,
}: {
  module: moduleData;
  nextModule?: moduleData | null;
  singleNote?: noteData;
  singleNoteLoading: boolean;
}) => {
  const { deleteModule } = useDeleteModule();
  const [openMenu, setOpenMenu] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: module?.id,
    data: {
      noteId: module?.noteId,
    },
  });

  // Define styles for the dragged item
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    backgroundColor: isDragging ? " #f5f5f5" : "white",
    textColor: isDragging ? " #f5f5f5" : "",
  };

  if (singleNoteLoading) return <SkeletonLoader height={100} width={"100%"}></SkeletonLoader>;

  return (
    <div style={style} ref={setNodeRef} className={`rounded-lg   bg-white relative group/handle`}>
      {(() => {
        switch (module?.type) {
          case "TEXT":
            return <TextModuleComponent module={module} />;
        }
      })()}
      <div className="absolute  scale-up-center  flex-row-reverse  gap-1  items-center -left-[90px] top-5 px-5 hidden group-hover/handle:flex transition-all">
        <div {...attributes} {...listeners}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 text-neutral-400"
          >
            <circle cx="12" cy="5" r="1" />
            <circle cx="19" cy="5" r="1" />
            <circle cx="5" cy="5" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
            <circle cx="12" cy="19" r="1" />
            <circle cx="19" cy="19" r="1" />
            <circle cx="5" cy="19" r="1" />
          </svg>
        </div>

        <div className="relative flex ">
          <button onClick={() => setOpenMenu((prev) => !prev)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-neutral-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <NewModuleModal
            menuOpen={openMenu}
            setMenuOpen={setOpenMenu}
            module={module}
            nextModule={nextModule}
            singleNote={singleNote}
          ></NewModuleModal>
        </div>

        <button onClick={() => deleteModule({ moduleId: module?.id, noteId: module?.noteId })}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 text-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ModuleComponent;
