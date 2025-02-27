import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { noteData, tagData } from "../dataTypes";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config/ApiClient";

export const useGetAllTags = () => {
  const getAllTagsApi = async () => {
    const response = await axiosInstance.get("/api/tags");
    return response.data as tagData[];
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

  const postTagApi = async ({ name, textColor, backgroundColor }: { name: string; textColor?: string; backgroundColor?: string }) => {
    const response = await axiosInstance.put(`/api/tags/${noteId}`, {
      name,
      textColor,
      backgroundColor,
    });

    return response.data as noteData;
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
    const response = await axiosInstance.delete(`/api/tags/${noteId}`, {
      data: { tagId },
    });

    return response.data as noteData;
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
