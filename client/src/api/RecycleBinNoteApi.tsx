import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { noteData } from "../dataTypes";
import { UseToastContext } from "../context/ToastNotificationContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRecycleBinNotes = () => {
  const fetchAllNotes = async () => {
    const response = await fetch(`${API_BASE_URL}/api/notes/recycle-bin`, {
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as noteData[];
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
  const { showToast } = UseToastContext();
  const queryClient = useQueryClient();

  const moveNoteToRecycleBin = async ({ value, noteId }: { value: boolean; noteId: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/notes/recycle-bin/move-to-recycle-bin`, {
      method: "PUT",
      body: JSON.stringify({ value, noteId }),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  };

  const { mutate: moveToRecycleBin } = useMutation({
    mutationKey: ["recycleBinNotes"],
    mutationFn: moveNoteToRecycleBin,
    onSuccess: (data) => {
      navigate("/notes-explorer");
      showToast({ message: "Note moved to recycle bin", type: "WARNING" });
      queryClient.setQueryData(["notes"], (oldData: noteData[] | undefined) => {
        if (!oldData) return [data];
        return oldData.filter((dData) => dData.id === data.id);
      });
      queryClient.setQueryData(["favouriteNotes"], (oldData: noteData[] | undefined) => {
        if (!oldData) return [data];
        return oldData.filter((dData) => dData.id === data.id);
      });
    },
  });

  return { moveToRecycleBin };
};

export const useRestoreFromRecycleBin = () => {
  const { showToast } = UseToastContext();
  const queryClient = useQueryClient();
  const restoreNoteFromRecycleBin = async ({ value, noteId }: { value: boolean; noteId?: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/notes/recycle-bin/restore-from-recycle-bin`, {
      method: "PUT",
      body: JSON.stringify({ value, noteId }),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  };

  const { mutate: restoreFromRecycleBin } = useMutation({
    mutationKey: ["recycleBinNotes"],
    mutationFn: restoreNoteFromRecycleBin,
    onSuccess: () => {
      showToast({ message: "Note successfuly restored", type: "SUCCESS" });
      queryClient.resetQueries({ queryKey: ["recycleBinNotes"] });
    },
  });

  return { restoreFromRecycleBin };
};
