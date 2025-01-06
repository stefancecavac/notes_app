import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { noteData } from "../dataTypes";
import { useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllFavouriteNotes = () => {
  const fetchAllNotes = async () => {
    const response = await fetch(`${API_BASE_URL}/api/notes/favourite`, {
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as noteData[];
  };

  const { data: favouriteNotes, isLoading: favouriteNotesLoading } = useQuery({
    queryKey: ["favouriteNotes"],
    queryFn: fetchAllNotes,
  });

  return { favouriteNotes, favouriteNotesLoading };
};

export const useFavouriteNote = () => {
  const { noteId } = useParams();
  const queryClient = useQueryClient();

  const updateFavourite = async ({ favourite, noteId }: { favourite?: boolean; noteId?: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/notes/favourite/addFavourites`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ favourite, noteId }),
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as noteData;
  };

  const { mutate: addToFavourites } = useMutation({
    mutationKey: ["favouriteNote", noteId],
    mutationFn: updateFavourite,
    onSuccess: (data) => {
      queryClient.setQueryData(["notes"], (oldData: noteData[] | undefined) => {
        if (!oldData) return [data];
        return oldData.map((oData) => (oData.id === data.id ? { ...oldData, ...data } : oData));
      });
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return { ...oldData, favourite: data.favourite };
      });
      queryClient.setQueryData(["favouriteNotes"], (oldData: noteData[] | undefined) => {
        if (!oldData) return [data];
        return [...oldData, data];
      });

      queryClient.setQueryData(["favouriteNote", noteId], (oldData: noteData) => {
        return { ...oldData, favourite: data.favourite };
      });
    },
  });

  return { addToFavourites };
};

export const useUnFavouriteNote = () => {
  const { noteId } = useParams();
  const queryClient = useQueryClient();

  const updateFavourite = async ({ favourite, noteId }: { favourite?: boolean; noteId?: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/notes/favourite/removeFavourites`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ favourite, noteId }),
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as noteData;
  };

  const { mutate: removeFromFavourites } = useMutation({
    mutationKey: ["removeFavourite", noteId],
    mutationFn: updateFavourite,
    onSuccess: (data) => {
      queryClient.setQueryData(["notes"], (oldData: noteData[] | undefined) => {
        if (!oldData) return oldData;

        return oldData.map((oData) => (oData.id === data.id ? { ...oData, favourite: false } : oData));
      });
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return { ...oldData, favourite: data.favourite };
      });

      queryClient.setQueryData(["favouriteNotes"], (oldData: noteData[]) => {
        return oldData.filter((oData) => oData.id !== data.id);
      });
    },
  });

  return { removeFromFavourites };
};
