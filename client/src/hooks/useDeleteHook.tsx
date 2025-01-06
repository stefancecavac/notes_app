import { useMoveTorecycleBin } from "../api/RecycleBinNoteApi";

export const useDeleteHook = () => {
  const { moveToRecycleBin } = useMoveTorecycleBin();

  const handleDeleteNote = (noteId: string) => {
    moveToRecycleBin({ value: true, noteId });
  };

  return { handleDeleteNote };
};
