import { useParams } from "react-router-dom";
import { useAddTodoInModule, useCheckTodo, useDeleteOneTodo } from "../../api/modulesApi/TodoModuleApi";
import { moduleData, todoModuleData } from "../../dataTypes";
import { useEffect, useState } from "react";

export const ToDoModuleComponent = ({ module }: { module: moduleData }) => {
  const { addTodo } = useAddTodoInModule();

  const [title, setTitle] = useState<string>("");
  const [sortedTodos, setSortedTodos] = useState(module?.TodoModule || []);
  const [sortCompleted, setSortCompleted] = useState<"completedFirst" | "completedLast">("completedFirst");

  useEffect(() => {
    setSortedTodos(module?.TodoModule || []);
  }, [module?.TodoModule]);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({ title, moduleId: module.id, noteId: module.noteId });
  };

  const sortByCompleted = () => {
    setSortedTodos((prevTodos) => {
      const sorted = [...prevTodos].sort((a, b) => {
        if (sortCompleted === "completedFirst") {
          return (b?.completed ? 1 : 0) - (a?.completed ? 1 : 0);
        } else {
          return (a?.completed ? 1 : 0) - (b?.completed ? 1 : 0);
        }
      });

      return sorted;
    });
    setSortCompleted((prev) => (prev === "completedFirst" ? "completedLast" : "completedFirst"));
  };

  return (
    <div className="rounded p-1 bg-base-100">
      <div className="flex items-center justify-between gap-5">
        <div className="dropdown">
          <button className="btn btn-primary btn-xs">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Task
          </button>
          <div tabIndex={0} className="dropdown-content menu bg-base-300 mt-2 rounded-lg border border-neutral z-1 w-100 p-2 shadow-md">
            <form onSubmit={handleAddTodo} className="flex flex-col  items-end gap-2">
              <textarea
                rows={5}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task name here"
                className="input input-sm min-w-full resize-none h-20  input-ghost focus:outline-hidden bg-transparent focus:bg-transparent"
              ></textarea>

              <div className="flex items-center gap-2">
                <button className="btn btn-xs btn-primary w-fit ">Add</button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <button className="btn  btn-soft btn-xs text-info-content" onClick={sortByCompleted}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
          </button>
        </div>
      </div>
      <div className="divider my-1"></div>

      <div className="flex flex-col gap-1 mt-5">
        {sortedTodos.map((todo) => (
          <TodoModuleCard key={todo?.id} todo={todo} module={module} />
        ))}
      </div>
    </div>
  );
};

const TodoModuleCard = ({ todo, module }: { todo?: todoModuleData; module: moduleData }) => {
  const { checkTodo } = useCheckTodo();
  const { deleteOneTodo } = useDeleteOneTodo();
  const [completed, setCompleted] = useState(todo?.completed);
  const { noteId } = useParams();

  useEffect(() => {
    setCompleted(todo?.completed);
  }, [todo]);

  function handleCheck() {
    setCompleted((prev) => !prev);
    checkTodo({ completed: !completed, noteId: noteId, todoId: todo?.id });
  }

  return (
    <label
      className={`flex items-center p-1 justify-between h-6  rounded-lg hover:cursor-pointer group/todo hover:bg-base-200  gap-5 ${
        completed ? "bg-base-200l" : ""
      } `}
    >
      <div className="flex items-center gap-2">
        <input checked={completed} onChange={handleCheck} type="checkbox" className="checkbox checkbox-xs  checkbox-primary peer" />
        <p className=" text-base-content text-sm font-medium peer-checked:line-through peer-checked:text-info-content w-full  ">{todo?.title}</p>
      </div>
      <button
        onClick={() => deleteOneTodo({ noteId: module.noteId, todoId: todo?.id })}
        className=" btn  btn-xs btn-error btn-square btn-soft hidden group-hover/todo:flex"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </label>
  );
};
