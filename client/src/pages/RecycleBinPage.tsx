import { useGetRecycleBinNotes } from "../api/RecycleBinNoteApi";
import LoaderComponent from "../components/LoaderComponent";
import NoteCard from "../components/NoteCard";

const RecycleBinPage = () => {
  const { recycleBinNotes, recycleBinNotesLoading, recycleBinError } = useGetRecycleBinNotes();

  <div></div>;

  return (
    <div className="p-5 flex flex-col h-full px-20 overflow-auto">
      <h2 className="text-3xl font-bold">Recycle Bin</h2>
      <p className="text-gray-500 mt-2">All your deleted notes are here. You can restore or permanently delete them.</p>
      <p className="text-gray-500">Notes will be automatically deleted after 7 days in the recycle bin.</p>

      <div className="mt-5 flex flex-col  ">
        {recycleBinError && (
          <div className="text-gray-400 flex items-center justify-center  mt-20 gap-5">
            <svg
              className="size-20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22v-9" />
              <path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z" />
              <path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13" />
              <path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z" />
            </svg>
            <p className="text-xl">No notes in Recycle Bin</p>
          </div>
        )}
        {recycleBinNotesLoading && <LoaderComponent></LoaderComponent>}
        <div className="grid grid-cols-3 gap-5 mt-5">
          {recycleBinNotes?.map((note) => (
            <NoteCard key={note.id} note={note}></NoteCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecycleBinPage;
