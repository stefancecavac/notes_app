import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { noteData } from "../dataTypes";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config/ApiClient";

export const useGetAllFavouriteNotes = () => {
  const fetchAllNotes = async () => {
    const response = await axiosInstance.get(`/api/notes/favourite`);
    return response.data as noteData[];
  };

  const {
    data: favouriteNotes,
    isLoading: favouriteNotesLoading,
    isError: favouriteNotesError,
  } = useQuery({
    queryKey: ["favouriteNotes"],
    queryFn: fetchAllNotes,
  });

  return { favouriteNotes, favouriteNotesLoading, favouriteNotesError };
};

export const useFavouriteNote = () => {
  const { noteId } = useParams();
  const queryClient = useQueryClient();

  const updateFavourite = async ({ noteId }: { noteId?: string }) => {
    const response = await axiosInstance.put(`/api/notes/favourite/`, {
      noteId,
    });
    return response.data as noteData;
  };

  const { mutate: toggleFavourite } = useMutation({
    mutationKey: ["favouriteNote"],
    mutationFn: updateFavourite,
    onSuccess: (data) => {
      queryClient.setQueryData(["notes"], (oldData: noteData[] | undefined) => {
        if (!oldData) return [data];
        return oldData.map((oData) => (oData.id === data.id ? { ...oData, ...data } : oData));
      });
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return { ...oldData, isFavourite: data.isFavourite };
      });
      queryClient.setQueryData(["favouriteNotes"], (oldData: noteData[] | undefined) => {
        if (!oldData) return [data];
        if (data.isFavourite === true) return [...oldData, data];
        if (data.isFavourite === false) return oldData.filter((oData) => oData.id !== data.id);
      });

      queryClient.setQueryData(["favouriteNote", noteId], (oldData: noteData) => {
        return { ...oldData, favourite: data.isFavourite };
      });
    },
  });

  return { toggleFavourite };
};
