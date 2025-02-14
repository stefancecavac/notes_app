import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moduleData, noteData } from "../../dataTypes";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/ApiClient";
import { useToastStore } from "../../Stores/useToastNotificationToast";
export const useUpdateModuleOrder = () => {
  const queryClient = useQueryClient();
  const { noteId } = useParams();

  const updateModuleOrderApi = async ({ modules, noteId }: { modules: moduleData[]; noteId: string }) => {
    const response = await axiosInstance.put(`/api/notes/modules/update-module-order`, { modules, noteId }, { withCredentials: true });
    return response.data;
  };

  const { mutate: updateModuleOrder } = useMutation({
    mutationKey: ["module"],
    mutationFn: updateModuleOrderApi,
    onSuccess(data) {
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        console.log(oldData);
        return { ...oldData, modules: data };
      });
    },
  });

  return { updateModuleOrder };
};

export const useDeleteModule = () => {
  const queryClient = useQueryClient();
  const { noteId } = useParams();
  const { showToast } = useToastStore();

  const deleteModuleApi = async ({ moduleId, noteId }: { moduleId: string; noteId: string }) => {
    const response = await axiosInstance.delete(`/api/notes/modules/delete-module`, {
      data: { moduleId, noteId },
      withCredentials: true,
    });
    return response.data;
  };

  const { mutate: deleteModule } = useMutation({
    mutationKey: ["module"],
    mutationFn: deleteModuleApi,
    onSuccess: (data) => {
      showToast({ type: "WARNING", message: `Module deleted` });
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return {
          ...oldData,
          modules: oldData.modules.filter((module: moduleData) => module.id !== data.id),
        };
      });
    },
  });

  return { deleteModule };
};
