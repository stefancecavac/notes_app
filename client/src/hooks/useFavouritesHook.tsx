import { useFavouriteNote } from "../api/FavouriteNoteApi";

export const useFavouritesHook = () => {
  const { toggleFavourite } = useFavouriteNote();

  const handleFavourite = ({ noteId }: { noteId?: string }) => {
    toggleFavourite({ noteId: noteId });
  };

  return { handleFavourite };
};
