import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { noteData, tagData } from "../dataTypes";
import { useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllTags = () => {
  const getAllTagsApi = async () => {
    const response = await fetch(`${API_BASE_URL}/api/tags`, {
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as tagData[];
  };

  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: getAllTagsApi,
  });

  return { tags };
};

export const useCreateTags = () => {
  const { noteId } = useParams();
  const queryClient = useQueryClient();

  const postTagApi = async ({ name, textColor, backgroundColor }: tagData) => {
    const response = await fetch(`${API_BASE_URL}/api/tags/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, textColor, backgroundColor }),
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as noteData;
  };

  const { mutate: addTag } = useMutation({
    mutationKey: ["tags"],
    mutationFn: postTagApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return { ...oldData, tags: data.tags };
      });
    },
  });

  return { addTag };
};

export const useDeleteTag = () => {
  const { noteId } = useParams();
  const queryClient = useQueryClient();

  const deleteTagApi = async (tagId: string | undefined) => {
    const response = await fetch(`${API_BASE_URL}/api/tags/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ tagId }),
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as noteData;
  };

  const { mutate: deleteTag } = useMutation({
    mutationKey: ["tags"],
    mutationFn: deleteTagApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return { ...oldData, tags: data.tags };
      });
    },
  });

  return { deleteTag };
};
