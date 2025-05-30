import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { noteData } from "../dataTypes";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/ApiClient";
import { useToastStore } from "../Stores/useToastNotificationToast";
import { useTreeViewStore } from "../Stores/useTreeViewStore";

export const useSearchNotes = (q: string | null) => {
  const fetchAllNotes = async () => {
    const response = await axiosInstance.get(`/api/notes/search`, {
      params: { q },
    });

    return response.data as noteData[];
  };

  const { data: searchedNotes } = useQuery({
    queryKey: ["notes", q],
    queryFn: fetchAllNotes,
  });

  return { searchedNotes };
};

export const useGetAllNotesTreeView = () => {
  const fetchAllNotes = async () => {
    const response = await axiosInstance.get(`/api/notes`, {});

    return response.data as noteData[];
  };

  const { data: notes, isLoading: notesLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchAllNotes,
  });

  return { notes, notesLoading };
};

export const useGetAllNotes = () => {
  const fetchAllNotes = async () => {
    const response = await axiosInstance.get(`/api/notes/all`);

    return response.data as noteData[];
  };

  const { data: allNotes } = useQuery({
    queryKey: ["allNotes"],
    queryFn: fetchAllNotes,
  });

  return { allNotes };
};

export const useGetSingleNote = ({ noteId }: { noteId: string }) => {
  const fetchSingleNote = async () => {
    const response = await axiosInstance.get(`/api/notes/${noteId}`);

    return response.data as noteData;
  };

  const {
    data: singleNote,
    isFetching: singleNoteLoading,
    isError: singleNoteError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: fetchSingleNote,
    staleTime: 0,
  });

  return { singleNote, singleNoteLoading, singleNoteError };
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const { setOpenTreeView } = useTreeViewStore();

  const addNoteToParent = (notes: noteData[], newNote: noteData) => {
    return notes.map((note): noteData => {
      if (note.id === newNote.parentNoteId) {
        return {
          ...note,
          childNotes: note.childNotes ? [...note.childNotes, newNote] : [newNote],
        };
      }

      if (note.childNotes) {
        return {
          ...note,
          childNotes: addNoteToParent(note.childNotes, newNote),
        };
      }

      return note;
    });
  };

  const postNoteFunction = async ({ noteTitle, parentNoteId }: { noteTitle: string; parentNoteId?: string }) => {
    const response = await axiosInstance.post(`/api/notes`, { noteTitle, parentNoteId });
    return response.data as noteData;
  };

  const { mutate: createNote, isPending: pendingCreateNote } = useMutation({
    mutationKey: ["notes"],
    mutationFn: postNoteFunction,
    onSuccess: (data) => {
      navigate(`/notes/${data.id}`);
      showToast("New note created");
      setOpenTreeView(data.parentNoteId);
      queryClient.setQueryData(["notes"], (oldData: noteData[] | undefined) => {
        if (!oldData) return [data];
        if (!data.parentNoteId) return [data, ...oldData];
        if (data.parentNoteId) return addNoteToParent(oldData, data);
      });
    },
  });

  return { createNote, pendingCreateNote };
};

export const useDuplicateNote = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const duplicateNoteApi = async ({ noteId }: { noteId: string }) => {
    const response = await axiosInstance.post(`/api/notes/duplicate`, { noteId });

    return response.data;
  };

  const { mutate: duplicateNote } = useMutation({
    mutationKey: ["notes"],
    mutationFn: duplicateNoteApi,
    onSuccess: (data) => {
      navigate(`/notes/${data.id}/${data.title}`);
      queryClient.setQueryData(["notes"], (oldData: noteData[] | undefined) => {
        if (!oldData) return [data];
        return [...oldData, data];
      });
      queryClient.setQueryData(["favouriteNotes"], (oldData: noteData[] | undefined) => {
        if (!oldData) return data.favourite ? [data] : [];

        if (data.favourite) {
          return [...oldData, data];
        }

        return oldData;
      });
    },
  });

  return { duplicateNote };
};

export const useUpdateNote = ({ noteId }: { noteId: string }) => {
  const queryClient = useQueryClient();

  const updateNoteFunction = async ({ noteTitle, noteColor, noteIcon }: { noteTitle?: string; noteColor?: string; noteIcon?: string }) => {
    const response = await axiosInstance.put(`/api/notes/${noteId}`, { noteTitle, noteColor, noteIcon });

    return response.data;
  };

  const { mutate: updateNote, isPending: updatePending } = useMutation({
    mutationKey: ["note", noteId],
    mutationFn: updateNoteFunction,
    onSuccess: (data) => {
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return { ...oldData, ...data, icon: data.icon };
      });
      queryClient.setQueryData(["notes"], (oldData: noteData[]) => {
        const updateNoteRecursively = (notes: noteData[]): noteData[] => {
          return notes.map((note) => {
            if (note.id === data.id) {
              return {
                ...note,
                ...data,
                childNotes: note.childNotes,
              };
            }

            if (note.childNotes && note.childNotes.length > 0) {
              return {
                ...note,
                childNotes: updateNoteRecursively(note.childNotes),
              };
            }

            return note;
          });
        };

        return updateNoteRecursively(oldData);
      });
      queryClient.setQueryData(["favouriteNotes"], (oldData: noteData[]) => {
        return oldData.map((oData) => (oData.id === data.id ? { ...oData, ...data } : oData));
      });
    },
  });
  return { updateNote, updatePending };
};

export const useMoveNote = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const updateNoteFunction = async ({ noteId, parentNoteId }: { noteId: string; parentNoteId: string | null }) => {
    const response = await axiosInstance.put(`/api/notes/move`, { noteId, parentNoteId });

    return response.data;
  };

  const { mutate: moveNote } = useMutation({
    mutationKey: ["notes"],
    mutationFn: updateNoteFunction,
    onSuccess: () => {
      showToast("Note Moved");

      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["favouriteNotes"] });
    },
  });

  return { moveNote };
};
