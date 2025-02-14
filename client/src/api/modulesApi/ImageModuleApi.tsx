import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { noteData } from "../../dataTypes";
import { axiosInstance } from "../../config/ApiClient";
import { useToastStore } from "../../Stores/useToastNotificationToast";

export const useCreateImageModule = () => {
  const { noteId } = useParams();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const postImageModuleApi = async ({ imagePath, order, noteId }: { imagePath: string; order?: number; noteId?: string }) => {
    const response = await axiosInstance.post(`/api/notes/modules/image-module`, { imagePath, order, noteId }, { withCredentials: true });
    return response.data as noteData;
  };

  const { mutate: createImageModule } = useMutation({
    mutationKey: ["text-module"],
    mutationFn: postImageModuleApi,
    onSuccess: (data) => {
      showToast({ type: "SUCCESS", message: "Image module created" });

      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return {
          ...oldData,
          modules: [...oldData.modules, data],
          updatedAt: new Date(),
        };
      });
    },
  });

  return { createImageModule };
};

export const useUpdateImageModule = ({ noteId }: { noteId: string }) => {
  const queryClient = useQueryClient();

  const updateImageModuleApi = async ({
    width,
    height,
    order,
    moduleId,
    noteId,
  }: {
    width: number;
    height: number;
    order?: number;
    moduleId: string;
    noteId: string;
  }) => {
    const response = await axiosInstance.put(
      `/api/notes/modules/image-module/update`,
      { width, height, order, moduleId, noteId },
      { withCredentials: true }
    );
    return response.data;
  };

  const { mutate: updateImageModule } = useMutation({
    mutationKey: ["note", noteId],
    mutationFn: updateImageModuleApi,
    onSuccess(data) {
      queryClient.setQueryData(["note", noteId], (oldData: noteData | undefined) => {
        if (!oldData) return undefined;
        const updatedModules = oldData.modules.map((module) => (module.id === data.id ? { ...module, ...data, updatedAt: new Date() } : module));
        return { ...oldData, modules: updatedModules, updatedAt: new Date() };
      });
    },
  });

  return { updateImageModule };
};
