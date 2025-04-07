import { Link } from "react-router-dom";
import { useCreateNote, useGetAllNotes } from "../api/NoteApi";
import SkeletonLoader from "../components/loaders/SkeletonLoader";
import NoteCard from "../components/NoteCard";
import { UseAuthContext } from "../context/AuthContext";
import { useEditorHook } from "../hooks/useEditorHook";

const DashboardPage = () => {
  const editor = useEditorHook();
  const { user } = UseAuthContext();
  const { notes, notesLoading } = useGetAllNotes();

  const { createNote } = useCreateNote();

  const handleCreateNote = () => {
    const editorContent = editor?.getHTML();
    if (!editorContent) {
      return;
    }
    createNote({ title: "New Note", content: editorContent });
  };

  const skeletonArray = Array(3).fill(null);

  return (
    <div className="w-full h-full   overflow-auto ">
      <div className=" m-10 ml-30">
        <h2 className="text-2xl text-base-content">
          Welcome back , <span className="text-primary font-bold">{user?.email}</span>
        </h2>

        <div className="mt-20 flex flex-col gap-5">
          <h2 className="text-info-content flex items-center gap-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Recently Created
          </h2>
          <div className=" grid grid-cols-4 gap-5 ">
            {notesLoading
              ? skeletonArray.map(() => <SkeletonLoader height={150} width={250} />)
              : notes?.map((note) => <NoteCard key={note.id} note={note} />)}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5">
          <h2 className="text-info-content flex items-center gap-2 text-sm">Actions</h2>
          <div className=" grid grid-cols-6 gap-50 ">
            <button onClick={() => handleCreateNote()} className="btn btn-square w-40 h-30 text-info-content">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-8 "
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M9 15h6" />
                <path d="M12 18v-6" />
              </svg>
              Create Note
            </button>

            <Link to="/settings" className="btn btn-square w-40 h-30 text-info-content">
              {" "}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 ">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
