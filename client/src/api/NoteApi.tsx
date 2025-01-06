import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { noteData } from "../dataTypes";
import { useNavigate, useParams } from "react-router-dom";
import { UseToastContext } from "../context/ToastNotificationContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchNotes = (q: string) => {
  const fetchAllNotes = async () => {
    const response = await fetch(`${API_BASE_URL}/api/notes/search?q=${q}`, {
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as noteData[];
  };

  const { data: searchedNotes } = useQuery({
    queryKey: ["notes", q],
    queryFn: fetchAllNotes,
  });

  return { searchedNotes };
};

export const useGetAllNotes = () => {
  const fetchAllNotes = async () => {
    const response = await fetch(`${API_BASE_URL}/api/notes`, {
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as noteData[];
  };

  const { data: notes, isLoading: notesLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchAllNotes,
  });

  return { notes, notesLoading };
};

export const useGraphNotes = () => {
  const fetchGraphNotes = async () => {
    const response = await fetch(`${API_BASE_URL}/api/notes/graph`, {
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as noteData[];
  };

  const { data: graphNotes } = useQuery({
    queryKey: ["graphNotes"],
    queryFn: fetchGraphNotes,
  });

  return { graphNotes };
};

export const useGetSingleNote = ({ noteId }: { noteId: string }) => {
  const fetchSingleNote = async () => {
    const response = await fetch(`${API_BASE_URL}/api/notes/${noteId}`, {
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as noteData;
  };

  const { data: singleNote, isFetching: singleNoteLoading } = useQuery({
    queryKey: ["note", noteId],
    queryFn: fetchSingleNote,
    enabled: !!noteId,
  });

  return { singleNote, singleNoteLoading };
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const postNoteFunction = async ({ title, content, parentNoteId }: { title: string; content: string; parentNoteId?: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title, content, parentNoteId }),
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as noteData;
  };

  const { mutate: createNote, isPending: pendingCreateNote } = useMutation({
    mutationKey: ["notes"],
    mutationFn: postNoteFunction,
    onSuccess: (data) => {
      navigate(`/notes/${data.id}/${data.title}`);
      queryClient.setQueryData(["notes"], (oldData: noteData[] | undefined) => {
        if (!oldData) return [data];
        if (!data.parentNoteId) return [...oldData, data];
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
    const response = await fetch(`${API_BASE_URL}/api/notes/duplicate`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ noteId }),
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
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

  const updateNoteFunction = async ({ title, content, color, icon }: { title?: string; content?: string; color?: string; icon?: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title, content, color, icon }),
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  };

  const { mutate: updateNote, isPending: updatePending } = useMutation({
    mutationKey: ["notes"],
    mutationFn: updateNoteFunction,

    onSuccess: (data) => {
      queryClient.setQueryData(["notes"], (oldData: noteData[]) => {
        return oldData.map((oData) => (oData.id === data.id ? { ...oData, ...data } : oData));
      });
      queryClient.setQueryData(["favouriteNotes"], (oldData: noteData[]) => {
        return oldData.map((oData) => (oData.id === data.id ? { ...oData, ...data } : oData));
      });
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return { ...oldData, ...data };
      });
    },
  });

  return { updateNote, updatePending };
};

export const useMoveNote = () => {
  const queryClient = useQueryClient();
  const { noteId } = useParams();
  const { showToast } = UseToastContext();

  const updateNoteFunction = async ({ noteId, parentNoteId }: { noteId: string; parentNoteId: string | null }) => {
    const response = await fetch(`${API_BASE_URL}/api/notes/move`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ noteId, parentNoteId }),
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  };

  const { mutate: moveNote } = useMutation({
    mutationKey: ["notes"],
    mutationFn: updateNoteFunction,

    onSuccess: () => {
      showToast({ message: "Note Moved", type: "SUCCESS" });

      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["favouriteNotes"] });
      queryClient.invalidateQueries({ queryKey: ["note", noteId] });
    },
  });

  return { moveNote };
};
