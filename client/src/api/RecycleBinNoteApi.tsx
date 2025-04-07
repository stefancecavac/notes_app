import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/ApiClient";
import { useToastStore } from "../Stores/useToastNotificationToast";
import { NotesData } from "../dataTypes";

export const useGetRecycleBinNotes = () => {
  const fetchAllNotes = async () => {
    const response = await axiosInstance.get("/api/notes/recycleBin");
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

  const moveNoteToRecycleBin = async ({ noteId }: { noteId: string }) => {
    const response = await axiosInstance.put("/api/notes/recycleBin/", {
      noteId,
    });

    return response.data;
  };

  const { mutate: moveToRecycleBin } = useMutation({
    mutationKey: ["recycleBinNotes"],
    mutationFn: moveNoteToRecycleBin,
    onSuccess: () => {
      navigate("/dashboard");
      showToast("Note moved to recycle bin");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return { moveToRecycleBin };
};

export const useRestoreFromRecycleBin = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();

  const restoreNoteFromRecycleBin = async ({ noteId }: { noteId?: string }) => {
    const response = await axiosInstance.put("/api/notes/recycleBin/restore", {
      noteId,
    });

    return response.data;
  };

  const { mutate: restoreFromRecycleBin } = useMutation({
    mutationKey: ["recycleBinNotes"],
    mutationFn: restoreNoteFromRecycleBin,
    onSuccess: () => {
      showToast("Note successfully restored");
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
    const response = await axiosInstance.delete("/api/notes/recycleBin/", { data: { noteId: noteId } });

    return response.data;
  };

  const { mutate: deleteFromRecycleBin } = useMutation({
    mutationKey: ["recycleBinNotes"],
    mutationFn: removeFromRecycleBinApi,
    onSuccess: () => {
      showToast("Note Removed");
      queryClient.resetQueries({ queryKey: ["recycleBinNotes"] });
    },
  });

  return { deleteFromRecycleBin };
};
