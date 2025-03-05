import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/ApiClient";
import { useToastStore } from "../Stores/useToastNotificationToast";
import { NotesData } from "../dataTypes";

export const useGetRecycleBinNotes = () => {
  const fetchAllNotes = async () => {
    const response = await axiosInstance.get("/api/notes/recycle-bin");
    return response.data as NotesData[];
  };

  const {
    data: recycleBinNotes,
    isLoading: recycleBinNotesLoading,
    error: recycleBinError,
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
    onSuccess: () => {
      navigate("/dashboard");
      showToast({ message: "Note moved to recycle bin", type: "WARNING" });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
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

export const useDeleteFromRecycleBin = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();

  const removeFromRecycleBinApi = async ({ noteId }: { noteId: string }) => {
    const response = await axiosInstance.delete("/api/notes/recycle-bin/", { data: { noteId: noteId } });

    return response.data;
  };

  const { mutate: deleteFromRecycleBin } = useMutation({
    mutationKey: ["recycleBinNotes"],
    mutationFn: removeFromRecycleBinApi,
    onSuccess: () => {
      showToast({ message: "Note Removed", type: "SUCCESS" });
      queryClient.resetQueries({ queryKey: ["recycleBinNotes"] });
      queryClient.resetQueries({ queryKey: ["notes"] });
      queryClient.resetQueries({ queryKey: ["favouriteNotes"] });
    },
  });

  return { deleteFromRecycleBin };
};
