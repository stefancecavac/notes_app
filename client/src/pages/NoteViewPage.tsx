import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleNote } from "../api/NoteApi";
import NoteViewComponent from "../components/noteViewPage/NoteViewComponent";
import React, { useEffect } from "react";

// import { useDebounceHook } from "../hooks/useDebounceHook";

const NoteViewPage = React.memo(() => {
  const { noteId } = useParams();
  const { singleNote, singleNoteLoading, singleNoteError } = useGetSingleNote({ noteId: noteId! });
  const navigate = useNavigate();

  useEffect(() => {
    if (!singleNoteError) return;
    navigate("/dashboard");
  }, [navigate, singleNoteError]);

  if (!singleNote) {
    return null;
  }

  return <NoteViewComponent singleNote={singleNote} singleNoteLoading={singleNoteLoading}></NoteViewComponent>;
});

export default NoteViewPage;
