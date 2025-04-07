import React, { Suspense, useMemo } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useFavouritesHook } from "../../hooks/useFavouritesHook";
import { NotesData } from "../../dataTypes";
import SkeletonLoader from "../loaders/SkeletonLoader";

const NoteViewMenu = React.lazy(() => import("./NoteViewMenu"));

type HeaderComponentProps = {
  singleNote: NotesData;
  singleNoteLoading: boolean;
  breadCrumbs: NotesData["breadCrumbs"];
};

const HeaderComponent = React.memo(({ singleNote, singleNoteLoading, breadCrumbs }: HeaderComponentProps) => {
  const { favourite, handleFavourite } = useFavouritesHook(singleNote?.favourite);

  const renderBreadcrumbs = useMemo(() => {
    if (!breadCrumbs) return null;

    return breadCrumbs.map((crumb, index, array) => {
      const shouldRender = index === 0 || index === array.length - 1 || index === array.length - 2 || array.length <= 4;

      if (shouldRender) {
        return (
          <div key={crumb.id} className="flex items-center gap-2 pl-3">
            {array.length > 4 && index === array.length - 2 && <p className="text-info-content text-sm">...</p>}
            <Link
              className={`${
                index === array.length - 1 ? "font-bold text-base-content" : ""
              } text-info-content hover:underline gap-2 text-xs flex items-center`}
              to={`/notes/${crumb.id}`}
            >
              {crumb.icon ? (
                <div className="size-4 " dangerouslySetInnerHTML={{ __html: crumb.icon }}></div>
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
              <p className="truncate w-fit"> {crumb.title}</p>
            </Link>
            {array.length > index + 1 && <p className="text-xl text-neutral">/</p>}
          </div>
        );
      }
      return null;
    });
  }, [breadCrumbs]);

  return (
    <div className={`sticky top-0 min-w-full flex h-10 pl-7   z-60 items-center justify-between text-sm bg-base-100 px-3  py-2`}>
      <div className="flex items-center gap-2">
        {singleNoteLoading ? <SkeletonLoader height={20} width={150}></SkeletonLoader> : renderBreadcrumbs}
      </div>

      <div className="flex items-center gap-2 text-xs">
        <p className="text-info-content">Edited {formatDistanceToNow(new Date(singleNote?.updatedAt).toISOString(), { addSuffix: true })}</p>

        {!location.pathname.includes("notes-split") && (
          <>
            <svg
              onClick={() => handleFavourite({ noteId: singleNote.id })}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`size-5 hover:cursor-pointer  ${favourite ? "fill-amber-400 text-amber-400" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <Suspense fallback>
              <NoteViewMenu singleNote={singleNote}></NoteViewMenu>
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
});

export default HeaderComponent;
