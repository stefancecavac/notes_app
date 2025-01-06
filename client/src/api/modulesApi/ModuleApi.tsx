import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moduleData, noteData } from "../../dataTypes";
import { useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUpdateModuleOrder = () => {
  const queryClient = useQueryClient();
  const { noteId } = useParams();

  const updateModuleOrderApi = async ({ modules, noteId }: { modules: moduleData[]; noteId: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/notes/modules/update-module-order`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ modules, noteId }),
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
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

  const deleteModuleApi = async ({ moduleId, noteId }: { moduleId: string; noteId: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/notes/modules/delete-module`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ moduleId, noteId }),
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  };

  const { mutate: deleteModule } = useMutation({
    mutationKey: ["module"],
    mutationFn: deleteModuleApi,
    onSuccess: (data) => {
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
