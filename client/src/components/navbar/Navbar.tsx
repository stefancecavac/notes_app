import SearchComponent from "./SearchComponent";
import UserComponent from "./UserComponent";
import ExpandNavbarButton from "./ExpandNavbarButton";
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
  const { favouriteNotes, favouriteNotesLoading, favouriteNotesError } = useGetAllFavouriteNotes();

  return (
    <div className={`${expanded ? "w-60    " : "w-0 p-0"} transition-all relative  flex flex-col `}>
      <div className={`flex items-center justify-between  z-70  pl-2 py-2`}>
        {expanded && <UserComponent></UserComponent>}

        {expanded && <ExpandNavbarButton setExpanded={toggleExpanded}></ExpandNavbarButton>}
      </div>
      {expanded && (
        <div className="pl-2 flex flex-col grow overflow-hidden h-full min-h-0">
          <div className="flex flex-col border-b border-neutral pb-2">
            <NewItemButton />
            <SearchComponent />
            <DashboardLink />
            <SettingsLink />
            <RecycleBinComponent />
          </div>
          <div className="flex flex-col grow overflow-auto  min-h-0 custom-scrollbar">
            <NotesList notes={notes} notesLoading={notesLoading} text="Private" />

            {!favouriteNotesError && favouriteNotes?.length !== 0 && (
              <NotesList notes={favouriteNotes} notesLoading={favouriteNotesLoading} text="Favourites" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
