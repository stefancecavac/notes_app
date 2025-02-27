import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { moduleData, noteData } from "../../dataTypes";
import { axiosInstance } from "../../config/ApiClient";
import { useToastStore } from "../../Stores/useToastNotificationToast";

export const useCreateTextModule = () => {
  const { noteId } = useParams();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const postTextModuleApi = async ({ content, order, noteId }: { content: string; order?: number; noteId?: string }) => {
    const response = await axiosInstance.post(`/api/notes/modules/text-module`, { content, order, noteId }, { withCredentials: true });
    return response.data as moduleData;
  };

  const { mutate: createTextModule } = useMutation({
    mutationKey: ["text-module"],
    mutationFn: postTextModuleApi,
    onSuccess: () => {
      showToast({ type: "SUCCESS", message: "Text module created" });
      // queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
      //   return {
      //     ...oldData,
      //     modules: [...oldData.modules, data],
      //     updatedAt: new Date(),
      //   };
      // });

      queryClient.invalidateQueries({ queryKey: ["note", noteId] });
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
        const updatedModules = oldData.modules?.map((module) => (module.id === data.id ? { ...module, ...data, updatedAt: new Date() } : module));
        return { ...oldData, modules: updatedModules, updatedAt: new Date() };
      });
    },
  });

  return { updateTextModule };
};
