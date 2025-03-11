import { useEditorHook } from "../../hooks/useEditorHook";
import { useCreateNote } from "../../api/NoteApi";
import React, { useMemo } from "react";

const NewItemButton = React.memo(() => {
  const editor = useEditorHook();
  const { createNote } = useCreateNote();

  const handleCreateNote = useMemo(() => {
    return () => {
      const editorContent = editor?.getHTML();
      if (!editorContent) {
        return;
      }
      createNote({ title: "New Note", content: editorContent });
    };
  }, [editor, createNote]);

  return (
    <button
      id="newItemId"
      title="hello"
      onClick={handleCreateNote}
      className={` btn-soft   hover:bg-base-300 w-full  text-info-content  btn btn-sm justify-start p-1 rounded-lg flex items-center gap-4`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 text-info-content "
      >
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M9 15h6" />
        <path d="M12 18v-6" />
      </svg>
      Add new Note
    </button>
  );
});

export default NewItemButton;
