import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { moduleData, noteData } from "../../dataTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateTextModule = () => {
  const { noteId } = useParams();

  const queryClient = useQueryClient();
  const postTextModuleApi = async ({ content, order, noteId }: { content: string; order?: number; noteId: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/notes/modules/text-module`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ content, order, noteId }),
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json as noteData;
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
    const response = await fetch(`${API_BASE_URL}/api/notes/modules/text-module/update`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ content, order, moduleId, noteId }),
      credentials: "include",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  };

  const { mutate: updateTextModule } = useMutation({
    mutationKey: ["note", noteId],
    mutationFn: updateTextModuleApi,
    onSuccess(data) {
      queryClient.setQueryData(["note", noteId], (oldData: noteData | undefined) => {
        if (!oldData) return undefined;

        console.log("new Data", data);
        console.log("old data", oldData);

        // Assuming 'data' contains the updated module, you can merge this into your note data
        const updatedModules = oldData.modules.map((module) => (module.id === data.id ? { ...module, ...data } : module));

        console.log(updatedModules);

        return { ...oldData, modules: updatedModules };
      });
    },
  });

  return { updateTextModule };
};
