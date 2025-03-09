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
    onSuccess: () => {
      showToast("Todo module created");
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

  return { createTodoModule };
};

export const useAddTodoInModule = () => {
  const { noteId } = useParams();
  const queryClient = useQueryClient();

  const postTodoModuleApi = async ({ title, noteId, moduleId }: { title: string; noteId: string; moduleId: string }) => {
    const response = await axiosInstance.post(`/api/notes/modules/todo-module/addTodo`, { title, moduleId, noteId }, { withCredentials: true });
    return response.data as moduleData;
  };

  const { mutate: addTodo, isSuccess: addTodoFinished } = useMutation({
    mutationKey: ["todo-module"],
    mutationFn: postTodoModuleApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        const updatedModules = oldData.modules?.map((module: moduleData) => {
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

  return { addTodo, addTodoFinished };
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
          modules: oldData.modules?.map((module) => {
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
    },
  });

  return { checkTodo };
};

export const useDeleteOneTodo = () => {
  const { noteId } = useParams();
  const queryClient = useQueryClient();

  const deleteOneTodoApi = async ({ noteId, todoId }: { noteId?: string; todoId?: string }) => {
    const response = await axiosInstance.delete(`/api/notes/modules/todo-module/delete`, { data: { noteId, todoId } });
    return response.data as noteData;
  };

  const { mutate: deleteOneTodo } = useMutation({
    mutationKey: ["todo-module"],
    mutationFn: deleteOneTodoApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["note", noteId], (oldData: noteData) => {
        return {
          ...oldData,
          modules: oldData.modules?.map((module) => {
            if (module.type === "TODO" && module.TodoModule) {
              return {
                ...module,
                TodoModule: module.TodoModule.filter((todo) => todo?.id !== data.id),
              };
            }
            return module;
          }),
          updatedAt: new Date(),
        };
      });
    },
  });

  return { deleteOneTodo };
};
