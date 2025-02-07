import SearchComponent from "./SearchComponent";
import UserComponent from "./UserComponent";
import ExpandNavbarButton from "./ExpandNavbarButton";
import RecycleBinLink from "./RecycleBinLink";
import SettingsLink from "./SettingsLink";
import NewItemButton from "./NewItemButton";
import AllNotesList from "./AllNotesList";
import FavouriteNotesList from "./FavouriteNotesList";
import { useNavbarExpandedStore } from "../../Stores/useNavbarExpandedStore";
import DashboardLink from "./DashboardLink";

const Navbar = () => {
  const { expanded, toggleExpanded } = useNavbarExpandedStore();

  return (
    <div className={`${expanded ? "w-60      " : "w-0 p-0  "} transition-all relative h-full    flex flex-col `}>
      <div className={`flex items-center justify-between  z-50  p-2 ${expanded ? "" : "px-1"}`}>
        {expanded && <UserComponent></UserComponent>}

        <ExpandNavbarButton expanded={expanded} setExpanded={toggleExpanded}></ExpandNavbarButton>
      </div>
      {expanded && (
        <div className={`px-2  flex  flex-col justify-between  h-full`}>
          <div className={` flex flex-col  gap-1 mt-3 `}>
            <DashboardLink></DashboardLink>
            <SearchComponent></SearchComponent>
            <NewItemButton></NewItemButton>
            <FavouriteNotesList></FavouriteNotesList>
            <AllNotesList></AllNotesList>
          </div>
          <div className={`flex flex-col gap-2 mb-2 `}>
            <RecycleBinLink></RecycleBinLink>
            <SettingsLink></SettingsLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
