import SearchComponent from "./SearchComponent";
import UserComponent from "./UserComponent";
import ExpandNavbarButton from "./ExpandNavbarButton";
import RecycleBinLink from "./RecycleBinComponent";
import SettingsLink from "./SettingsLink";
import NewItemButton from "./NewItemButton";
import { useNavbarExpandedStore } from "../../Stores/useNavbarExpandedStore";
import DashboardLink from "./DashboardLink";
import { NotesList } from "./NotesListComponents/NotesList";
import { useGetAllNotes } from "../../api/NoteApi";
import { useGetAllFavouriteNotes } from "../../api/FavouriteNoteApi";
import RecycleBinComponent from "./RecycleBinComponent";

const Navbar = () => {
  const { expanded, toggleExpanded } = useNavbarExpandedStore();
  const { notes, notesLoading } = useGetAllNotes();
  const { favouriteNotes, favouriteNotesLoading } = useGetAllFavouriteNotes();

  return (
    <div className={`${expanded ? "w-60      " : "w-0 p-0  "} transition-all relative     flex flex-col `}>
      <div className={`flex items-center justify-between  z-70  p-2 ${expanded ? "" : "px-1"}`}>
        {expanded && <UserComponent></UserComponent>}

        <ExpandNavbarButton expanded={expanded} setExpanded={toggleExpanded}></ExpandNavbarButton>
      </div>
      {expanded && (
        <div className={`pl-2  flex  flex-col justify-between  h-full`}>
          <div className={` flex flex-col gap-1  mt-3 `}>
            <NewItemButton />
            <DashboardLink />
            <SearchComponent />
            <div className="overflow-auto  h-130">
              <NotesList notes={favouriteNotes} notesLoading={favouriteNotesLoading} text="Favourites"></NotesList>
              <NotesList notes={notes} notesLoading={notesLoading} text="All notes"></NotesList>
            </div>
          </div>
          <div className={`flex flex-col gap-1 mb-2 `}>
            <RecycleBinComponent />
            <SettingsLink />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
