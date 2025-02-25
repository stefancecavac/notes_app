import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { noteData } from "../../dataTypes";
import { axiosInstance } from "../../config/ApiClient";
import { useToastStore } from "../../Stores/useToastNotificationToast";

export const useCreateDrawingModule = () => {
  const { noteId } = useParams();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const postDrawingModuleApi = async ({ order, noteId }: { order?: number; noteId?: string }) => {
    const response = await axiosInstance.post(`/api/notes/modules/drawing-module`, { order, noteId }, { withCredentials: true });
    return response.data as noteData;
  };

  const { mutate: createDrawingModule } = useMutation({
    mutationKey: ["drawing-module"],
    mutationFn: postDrawingModuleApi,
    onSuccess: (data) => {
      showToast({ type: "SUCCESS", message: "Drawing module created" });

      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return {
          ...oldData,
          modules: [...oldData.modules, data],
          updatedAt: new Date(),
        };
      });
    },
  });

  return { createDrawingModule };
};

export const useUpdateDrawingModule = ({ noteId }: { noteId: string }) => {
  const queryClient = useQueryClient();

  const updateDrawingModuleApi = async ({ data, order, moduleId, noteId }: { data?: string; order?: number; moduleId: string; noteId: string }) => {
    const response = await axiosInstance.put(
      `/api/notes/modules/drawing-module/update`,
      { data, order, moduleId, noteId },
      { withCredentials: true }
    );
    return response.data;
  };

  const { mutate: updateDrawingModule } = useMutation({
    mutationKey: ["note", noteId],
    mutationFn: updateDrawingModuleApi,
    onSuccess(data) {
      queryClient.setQueryData(["note", noteId], (oldData: noteData | undefined) => {
        if (!oldData) return undefined;
        const updatedModules = oldData.modules?.map((module) => (module.id === data.id ? { ...module, ...data, updatedAt: new Date() } : module));
        return { ...oldData, modules: updatedModules, updatedAt: new Date() };
      });
    },
  });

  return { updateDrawingModule };
};
