import { Link } from "react-router-dom";
import { moduleData } from "../../dataTypes";

const PageLinkModuleComponent = ({ module }: { module: moduleData }) => {
  console.log(module.LinkModule?.childNote.title);
  return (
    <Link to={`/notes/${module.LinkModule?.childNoteId}/${module.LinkModule?.childNote.title}`} className="">
      {module.LinkModule?.childNote.title}
    </Link>
  );
};

export default PageLinkModuleComponent;
