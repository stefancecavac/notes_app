import { useGetAllNotes } from "../api/NoteApi";
import NoteCard from "../components/NoteCard";
import { UseAuthContext } from "../context/AuthContext";

const DashboardPage = () => {
  const { user } = UseAuthContext();
  const { notes } = useGetAllNotes();

  return (
    <div className="w-full h-full ">
      <div className="m-3 mx-10">
        <h2 className="text-2xl text-primary-content">
          Welcome back , <span className="text-primary font-bold">{user?.email}</span>
        </h2>

        <div className=" grid grid-cols-4 gap-5 mt-20">
          {notes?.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
