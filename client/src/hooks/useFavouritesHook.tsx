import { useState } from "react";
import { useFavouriteNote, useUnFavouriteNote } from "../api/FavouriteNoteApi";

export const useFavouritesHook = (value?: boolean) => {
  const { addToFavourites } = useFavouriteNote();
  const [favourite, setFavourite] = useState(value);
  const { removeFromFavourites } = useUnFavouriteNote();

  const handleFavourite = ({ noteId }: { noteId?: string }) => {
    if (favourite === true) {
      removeFromFavourites({ favourite: false, noteId: noteId });
      setFavourite(false);
    } else {
      addToFavourites({ favourite: value, noteId: noteId });
      setFavourite(true);
    }
  };

  return { handleFavourite, setFavourite, favourite };
};
