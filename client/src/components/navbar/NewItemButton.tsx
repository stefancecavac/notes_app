import { useEditorHook } from "../../hooks/useEditorHook";
import { useCreateNote } from "../../api/NoteApi";

const NewItemButton = () => {
  const editor = useEditorHook();
  const { createNote, pendingCreateNote } = useCreateNote();

  const handleCreateNote = () => {
    const editorContent = editor?.getHTML();
    if (!editorContent) {
      return;
    }
    createNote({ title: "New Note", content: editorContent });
  };

  return (
    <>
      <button
        onClick={handleCreateNote}
        className={`  flex items-center gap-3 text-[13px] font-semibold  transition-all  px-1 py-1 rounded-lg text-[#5f5e5b] hover:bg-stone-200/50  dark:hover:bg-neutral-700 dark:text-neutral-400  `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 text-neutral-400"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M9 15h6" />
          <path d="M12 18v-6" />
        </svg>
        Add new Note
      </button>
    </>
  );
};

export default NewItemButton;
