import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { noteData } from "../../dataTypes";
import { axiosInstance } from "../api";

export const useCreateTextModule = () => {
  const { noteId } = useParams();
  const queryClient = useQueryClient();

  const postTextModuleApi = async ({ content, order, noteId }: { content: string; order?: number; noteId: string }) => {
    const response = await axiosInstance.post(`/api/notes/modules/text-module`, { content, order, noteId }, { withCredentials: true });
    return response.data as noteData;
  };

  const { mutate: createTextModule } = useMutation({
    mutationKey: ["text-module"],
    mutationFn: postTextModuleApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return {
          ...oldData,
          modules: [...oldData.modules, data],
          updatedAt: new Date(),
        };
      });
    },
  });

  return { createTextModule };
};

export const useUpdateTextModule = ({ noteId }: { noteId: string }) => {
  const queryClient = useQueryClient();

  const updateTextModuleApi = async ({
    content,
    order,
    moduleId,
    noteId,
  }: {
    content?: string;
    order?: number;
    moduleId: string;
    noteId: string;
  }) => {
    const response = await axiosInstance.put(
      `/api/notes/modules/text-module/update`,
      { content, order, moduleId, noteId },
      { withCredentials: true }
    );
    return response.data;
  };

  const { mutate: updateTextModule } = useMutation({
    mutationKey: ["note", noteId],
    mutationFn: updateTextModuleApi,
    onSuccess(data) {
      queryClient.setQueryData(["note", noteId], (oldData: noteData | undefined) => {
        if (!oldData) return undefined;

        console.log("new Data", data);
        console.log("old data", oldData);

        const updatedModules = oldData.modules.map((module) => (module.id === data.id ? { ...module, ...data } : module));

        console.log(updatedModules);

        return { ...oldData, modules: updatedModules };
      });
    },
  });

  return { updateTextModule };
};
