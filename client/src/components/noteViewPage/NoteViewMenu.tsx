import React, { useState } from "react";
import { useWideModeStore } from "../../Stores/useWideModeStore";
import { noteData } from "../../dataTypes";
import { formatDistanceToNow } from "date-fns";
import { FavouriteButton } from "../MenuButtons/FavouriteButton";
import { AddSubPageButton } from "../MenuButtons/AddSubPageButton";
import { DuplicateNoteButton } from "../MenuButtons/DuplicateNoteButton";
import { MoveNoteButton } from "../MenuButtons/MoveNoteButton";
import { DeleteButton } from "../MenuButtons/DeleteButton";

const NoteViewMenu = React.memo(({ singleNote }: { singleNote: noteData }) => {
  const { toggleWideMode, wideMode } = useWideModeStore();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="drawer drawer-end w-fit">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label onClick={() => setMenuOpen(true)} htmlFor="my-drawer" className="rounded-md btn  btn-square btn-xs btn-ghost  hover:bg-base-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </label>
      </div>
      {menuOpen && (
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="bg-base-200 text-base-content min-h-full w-55 mx-3 px-2 border-l-2 border-neutral">
            <div className={`flex flex-col gap-1  `}>
              <p className=" py-2  font-medium text-info-content/50">Actions</p>
              {!location.pathname.includes("/notes-split") && (
                <label className="text-xs flex items-center gap-3  hover:cursor-pointer hover:bg-base-300 rounded p-1 border border-transparent hover:border-neutral">
                  <input type="checkbox" onChange={toggleWideMode} checked={wideMode} className="toggle toggle-primary toggle-xs" />
                  <p>Wide mode</p>
                </label>
              )}

              <FavouriteButton note={singleNote} />

              <AddSubPageButton note={singleNote} />
              <div className="divider my-0"></div>

              <DuplicateNoteButton note={singleNote} />

              <MoveNoteButton note={singleNote} />

              <div className="divider my-0"></div>

              <DeleteButton note={singleNote} />
              <div className="flex flex-col gap-2  mt-3">
                <p className=" py-2  font-medium  text-info-content">Note Details</p>

                <div className="flex items-center gap-2 ">
                  <p className=" text-xs font-medium text-info-content">Tags: </p>
                  <div className="grid grid-cols-2 gap-2">
                    {singleNote?.tags?.map((tag, index) => (
                      <span
                        style={{ backgroundColor: tag.backgroundColor, color: tag.textColor }}
                        key={index}
                        className="rounded-md px-2 py-1 cursor-pointer"
                      >
                        <p className="font-medium text-xs">{tag.name}</p>
                      </span>
                    ))}
                  </div>
                </div>

                <p className=" text-xs font-medium   text-base-content">
                  <span className="text-info-content">Created:</span>{" "}
                  {formatDistanceToNow(new Date(singleNote?.createdAt).toISOString(), { addSuffix: true })}
                </p>

                <p className=" text-xs font-medium   text-base-content">
                  <span className="text-info-content">Edited:</span>{" "}
                  {formatDistanceToNow(new Date(singleNote?.updatedAt).toISOString(), { addSuffix: true })}
                </p>
              </div>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
});

export default NoteViewMenu;
