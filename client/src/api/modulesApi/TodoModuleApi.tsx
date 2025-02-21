import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useToastStore } from "../../Stores/useToastNotificationToast";
import { axiosInstance } from "../../config/ApiClient";
import { moduleData, noteData } from "../../dataTypes";

export const useCreateTodoModule = () => {
  const { noteId } = useParams();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const postTodoModuleApi = async ({ order, noteId }: { order?: number; noteId?: string }) => {
    const response = await axiosInstance.post(`/api/notes/modules/todo-module`, { order, noteId }, { withCredentials: true });
    return response.data as noteData;
  };

  const { mutate: createTodoModule } = useMutation({
    mutationKey: ["todo-module"],
    mutationFn: postTodoModuleApi,
    onSuccess: (data) => {
      showToast({ type: "SUCCESS", message: "Todo module created" });
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return {
          ...oldData,
          modules: [...oldData.modules, data],
          updatedAt: new Date(),
        };
      });
    },
  });

  return { createTodoModule };
};

export const useAddTodoInModule = () => {
  const { noteId } = useParams();
  const queryClient = useQueryClient();

  const postTodoModuleApi = async ({ title, priority, noteId, moduleId }: { title: string; priority: string; noteId: string; moduleId: string }) => {
    const response = await axiosInstance.post(
      `/api/notes/modules/todo-module/addTodo`,
      { title, priority, moduleId, noteId },
      { withCredentials: true }
    );
    return response.data as moduleData;
  };

  const { mutate: addTodo } = useMutation({
    mutationKey: ["todo-module"],
    mutationFn: postTodoModuleApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        const updatedModules = oldData.modules.map((module) => {
          if (module.id === data.id) {
            return { ...module, TodoModule: data.TodoModule };
          }
          return module;
        });

        return {
          ...oldData,
          modules: updatedModules,
          updatedAt: new Date(),
        };
      });
    },
  });

  return { addTodo };
};

export const useCheckTodo = () => {
  const { noteId } = useParams();
  const queryClient = useQueryClient();

  const putCheckTodoApi = async ({ completed, noteId, todoId }: { completed: boolean; noteId?: string; todoId?: string }) => {
    const response = await axiosInstance.put(`/api/notes/modules/todo-module/check`, { completed, todoId, noteId }, { withCredentials: true });
    return response.data as noteData;
  };

  const { mutate: checkTodo } = useMutation({
    mutationKey: ["todo-module"],
    mutationFn: putCheckTodoApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return {
          ...oldData,
          modules: oldData.modules.map((module) => {
            if (module.type === "TODO" && module.TodoModule) {
              return {
                ...module,
                TodoModule: module.TodoModule.map((todo) => (todo?.id === data.id ? data : todo)),
              };
            }
            return module;
          }),
          updatedAt: new Date(),
        };
      });
      console.log(queryClient.getQueryData(["note", noteId]));
    },
  });

  return { checkTodo };
};
