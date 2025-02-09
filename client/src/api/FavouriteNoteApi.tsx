import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { noteData, notesData } from "../dataTypes";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config/ApiClient";

export const useGetAllFavouriteNotes = () => {
  const fetchAllNotes = async () => {
    const response = await axiosInstance.get(`/api/notes/favourite`);
    return response.data as notesData[];
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
    const response = await axiosInstance.put(`/api/notes/favourite/addFavourites`, {
      favourite,
      noteId,
    });
    return response.data as noteData;
  };

  const { mutate: addToFavourites } = useMutation({
    mutationKey: ["favouriteNote", noteId],
    mutationFn: updateFavourite,
    onSuccess: (data) => {
      queryClient.setQueryData(["notes"], (oldData: noteData[] | undefined) => {
        if (!oldData) return [data];
        return oldData.map((oData) => (oData.id === data.id ? { ...oData, ...data } : oData));
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
    const response = await axiosInstance.put(`/api/notes/favourite/removeFavourites`, {
      favourite,
      noteId,
    });
    return response.data as noteData;
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
