import SearchComponent from "./SearchComponent";
import UserComponent from "./UserComponent";
import ExpandNavbarButton from "./ExpandNavbarButton";
import SettingsLink from "./SettingsLink";
import NewItemButton from "./NewItemButton";
import { useNavbarExpandedStore } from "../../Stores/useNavbarExpandedStore";
import { NotesList } from "./NotesListComponents/NotesList";
import { useGetAllFavouriteNotes } from "../../api/FavouriteNoteApi";
import RecycleBinComponent from "./RecycleBinComponent";
import React, { useEffect, useRef, useState } from "react";
import { useGetAllNotesTreeView } from "../../api/NoteApi";
import { DashboardLink } from "./DashboardLink";

const Navbar = () => {
  const { expanded, toggleExpanded, setWidth, width } = useNavbarExpandedStore();
  const { notes, notesLoading } = useGetAllNotesTreeView();
  const { favouriteNotes, favouriteNotesLoading, favouriteNotesError } = useGetAllFavouriteNotes();
  const [resizing, setResizing] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expanded && navRef.current) {
      navRef.current.style.width = "";
    } else if (expanded && navRef.current) {
      navRef.current.style.width = `${width}px`;
    }
  }, [expanded, width]);

  const handleResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!navRef.current) return;
    let newWidth = e.clientX;

    if (newWidth > 500) newWidth = 500;
    if (newWidth < 260) newWidth = 260;
    navRef.current.style.width = `${newWidth}px`;
    setWidth(newWidth);
    setResizing(true);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    setResizing(false);
  };

  return (
    <div
      ref={navRef}
      style={{ width: width }}
      className={` ${expanded ? `px-3 w-50` : "w-0"}  flex flex-col ${resizing ? "" : "transition-all"} relative`}
    >
      <div className={`flex items-center justify-between  relative z-70 h-10   py-2 pr-7`}>
        {expanded && <UserComponent></UserComponent>}

        <div className="relative  ">
          <ExpandNavbarButton setExpanded={toggleExpanded}></ExpandNavbarButton>
        </div>
      </div>
      {expanded && (
        <div className="flex flex-col grow overflow-hidden h-full mt-5 min-h-0">
          <div className="flex flex-col gap-1 ">
            <DashboardLink />
            <NewItemButton />
            <SearchComponent />
            <SettingsLink />
            <RecycleBinComponent />
          </div>
          <div className="flex flex-col grow overflow-auto  min-h-0  mt-5">
            <NotesList notes={notes} notesLoading={notesLoading} text="Private" />

            {!favouriteNotesError && favouriteNotes?.length !== 0 && (
              <NotesList notes={favouriteNotes} notesLoading={favouriteNotesLoading} text="Favourites" />
            )}
          </div>
        </div>
      )}
      <div onMouseDown={handleResize} className="w-0.5 bg-neutral h-full absolute transition-all -right-0 hover:cursor-col-resize hover:w-1.5"></div>
    </div>
  );
};

export default Navbar;
