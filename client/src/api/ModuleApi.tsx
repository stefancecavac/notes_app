import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateModuleData, moduleData, noteData } from "../dataTypes";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config/ApiClient";
import { useToastStore } from "../Stores/useToastNotificationToast";

export const useCreateModule = () => {
  const { noteId } = useParams();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const postModuleApi = async ({ order, type, properties, noteId }: CreateModuleData) => {
    const response = await axiosInstance.post(`/api/notes/modules/`, { properties, type, order, noteId }, { withCredentials: true });
    return response.data as moduleData;
  };

  const { mutate: createModule } = useMutation({
    mutationKey: ["module"],
    mutationFn: postModuleApi,
    onSuccess: (data) => {
      showToast("Module created");
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return {
          ...oldData,
          modules: [...oldData.modules, data],
        };
      });

      // queryClient.invalidateQueries({ queryKey: ["note", noteId] });
    },
  });

  return { createModule };
};

export const useUpdateModule = ({ noteId }: { noteId: string }) => {
  const queryClient = useQueryClient();

  const updateModuleApi = async ({ properties, moduleId, noteId }: { properties: Record<string, unknown>; moduleId: string; noteId: string }) => {
    const response = await axiosInstance.put(`/api/notes/modules/`, { properties: properties, moduleId, noteId }, { withCredentials: true });
    return response.data;
  };

  const { mutate: updateModule } = useMutation({
    mutationKey: ["note", noteId],
    mutationFn: updateModuleApi,
    onSuccess(data) {
      queryClient.setQueryData(["note", noteId], (oldData: noteData | undefined) => {
        if (!oldData) return undefined;
        const updatedModules = oldData.modules?.map((module) => (module.id === data.id ? { ...module, ...data, updatedAt: new Date() } : module));
        return { ...oldData, modules: updatedModules, updatedAt: new Date() };
      });
    },
  });

  return { updateModule };
};

export const useUpdateModuleOrder = () => {
  const queryClient = useQueryClient();
  const { noteId } = useParams();

  const updateModuleOrderApi = async ({ modules, noteId }: { modules: moduleData[]; noteId: string }) => {
    const response = await axiosInstance.put(`/api/notes/modules/update-module-order`, { modules, noteId }, { withCredentials: true });
    return response.data as moduleData[];
  };

  const { mutate: updateModuleOrder } = useMutation({
    mutationKey: ["module"],
    mutationFn: updateModuleOrderApi,

    onSuccess(data) {
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        console.log("mutation data", data);
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

  const { mutate: deleteModule, isPending: deleteModulePending } = useMutation({
    mutationKey: ["module"],
    mutationFn: deleteModuleApi,
    onSuccess: (data) => {
      showToast(`Module deleted`);
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return {
          ...oldData,
          modules: oldData.modules?.filter((module: moduleData) => module.id !== data.id),
        };
      });
    },
  });

  return { deleteModule, deleteModulePending };
};
