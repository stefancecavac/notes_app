import { noteData } from "../../dataTypes";
import { Link } from "react-router-dom";
import { useNavbarExpandedStore } from "../../Stores/useNavbarExpandedStore";
import NoteViewMenu from "./NoteViewMenu";
import { formatDistanceToNow } from "date-fns";
import SkeletonLoader from "../loaders/SkeletonLoader";

const HeaderComponent = ({ singleNote, singleNoteLoading }: { singleNote: noteData; singleNoteLoading: boolean }) => {
  const { expanded } = useNavbarExpandedStore();

  return (
    <div
      className={`${
        expanded ? "" : "pl-10"
      } sticky top-0  bg-white min-w-full flex z-20 items-center justify-between text-sm dark:bg-neutral-900 px-3 py-2`}
    >
      {singleNoteLoading ? (
        <SkeletonLoader height={20} width={90}></SkeletonLoader>
      ) : (
        <div className="flex items-center gap-2">
          {singleNote?.breadCrumbs?.map((crumb, index, array) => {
            const shouldRender = index === 0 || index === array.length - 1 || index === array.length - 2 || array.length <= 4;

            return shouldRender ? (
              <div key={crumb.noteId} className="flex items-center gap-2">
                {singleNote?.breadCrumbs?.length > 4 && index === array.length - 2 && <p className="text-neutral-400 text-sm">...</p>}

                <Link
                  className={`${
                    index === array.length - 1 && "font-medium text-neutral-700"
                  } text-neutral-400 hover:underline gap-2 text-xs flex items-center`}
                  to={`/notes/${crumb.noteId}/${crumb.noteTitle}`}
                >
                  {crumb.icon ? (
                    <div className="size-4 text-neutral-500" dangerouslySetInnerHTML={{ __html: crumb.icon }}></div>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4 group-hover:hidden"
                    >
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      <path d="M10 9H8" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                    </svg>
                  )}
                  {crumb.noteTitle}
                </Link>

                {array.length > index + 1 ? <p className="text-xl text-neutral-300">/</p> : null}
              </div>
            ) : null;
          })}
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-neutral-400">
        {singleNoteLoading ? (
          <SkeletonLoader height={20} width={120}></SkeletonLoader>
        ) : (
          <p>Edited {formatDistanceToNow(new Date(singleNote?.updatedAt).toISOString(), { addSuffix: true })}</p>
        )}

        <p className="font-medium text-xs text-neutral-600 rounded-lg bg-neutral-100 p-1 border">Private</p>
        <NoteViewMenu singleNote={singleNote}></NoteViewMenu>
      </div>
    </div>
  );
};

export default HeaderComponent;
