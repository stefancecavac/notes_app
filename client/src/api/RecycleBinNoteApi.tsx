import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { noteData } from "../dataTypes";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/ApiClient";
import { useToastStore } from "../Stores/useToastNotificationToast";

export const useGetRecycleBinNotes = () => {
  const fetchAllNotes = async () => {
    const response = await axiosInstance.get("/api/notes/recycle-bin");
    return response.data as noteData[];
  };

  const {
    data: recycleBinNotes,
    isLoading: recycleBinNotesLoading,
    isError: recycleBinError,
  } = useQuery({
    queryKey: ["recycleBinNotes"],
    queryFn: fetchAllNotes,
    retry: false,
  });

  return { recycleBinNotes, recycleBinNotesLoading, recycleBinError };
};

export const useMoveTorecycleBin = () => {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();

  const moveNoteToRecycleBin = async ({ value, noteId }: { value: boolean; noteId: string }) => {
    const response = await axiosInstance.put("/api/notes/recycle-bin/move-to-recycle-bin", {
      value,
      noteId,
    });

    return response.data;
  };

  const { mutate: moveToRecycleBin } = useMutation({
    mutationKey: ["recycleBinNotes"],
    mutationFn: moveNoteToRecycleBin,
    onSuccess: (data) => {
      navigate("/dashboard");
      showToast({ message: "Note moved to recycle bin", type: "WARNING" });
      queryClient.setQueryData(["notes"], (oldData: noteData[] | undefined) => {
        if (!oldData) return [data];
        return oldData.filter((dData) => dData.id !== data.id);
      });
      queryClient.setQueryData(["favouriteNotes"], (oldData: noteData[] | undefined) => {
        if (!oldData) return [data];
        return oldData.filter((dData) => dData.id !== data.id);
      });
    },
  });

  return { moveToRecycleBin };
};

export const useRestoreFromRecycleBin = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();

  const restoreNoteFromRecycleBin = async ({ value, noteId }: { value: boolean; noteId?: string }) => {
    const response = await axiosInstance.put("/api/notes/recycle-bin/restore-from-recycle-bin", {
      value,
      noteId,
    });

    return response.data;
  };

  const { mutate: restoreFromRecycleBin } = useMutation({
    mutationKey: ["recycleBinNotes"],
    mutationFn: restoreNoteFromRecycleBin,
    onSuccess: () => {
      showToast({ message: "Note successfully restored", type: "SUCCESS" });
      queryClient.resetQueries({ queryKey: ["recycleBinNotes"] });
      queryClient.resetQueries({ queryKey: ["notes"] });
      queryClient.resetQueries({ queryKey: ["favouriteNotes"] });
    },
  });

  return { restoreFromRecycleBin };
};
