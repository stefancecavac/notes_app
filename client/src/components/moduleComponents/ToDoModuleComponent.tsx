import { useParams } from "react-router-dom";
import { useAddTodoInModule, useCheckTodo } from "../../api/modulesApi/TodoModuleApi";
import { moduleData, todoModuleData } from "../../dataTypes";
import { useEffect, useState } from "react";

export const ToDoModuleComponent = ({ module }: { module: moduleData }) => {
  const { addTodo } = useAddTodoInModule();

  const [title, setTitle] = useState<string>("");
  const [sortedTodos, setSortedTodos] = useState(module?.TodoModule || []);
  const [sortCompleted, setSortCompleted] = useState<"completedFirst" | "completedLast">("completedFirst");

  useEffect(() => {
    const storedTodos = localStorage.getItem(`sorted-${module.id}`);
    if (storedTodos) {
      setSortedTodos(JSON.parse(storedTodos));
    } else {
      setSortedTodos(module?.TodoModule || []);
    }
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

      localStorage.setItem(`sorted-${module.id}`, JSON.stringify(sorted));
      return sorted;
    });
    setSortCompleted((prev) => (prev === "completedFirst" ? "completedLast" : "completedFirst"));
  };

  return (
    <div className="rounded p-1 bg-base-100">
      <h2 className="font-bold text-lg mb-2">Your To Do</h2>

      <div className="flex items-center justify-between gap-5">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-primary btn-xs">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Task
          </div>
          <div tabIndex={0} className="dropdown-content menu bg-base-300 mt-2 rounded-box z-1 w-100 p-2 shadow-sm">
            <form onSubmit={handleAddTodo} className="flex items-center gap-2">
              <input onChange={(e) => setTitle(e.target.value)} type="text" className="input input-sm w-full"></input>

              <button className="btn btn-sm btn-primary">Add</button>
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
          <TodoModuleCard key={todo?.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

const TodoModuleCard = ({ todo }: { todo?: todoModuleData }) => {
  const { checkTodo } = useCheckTodo();
  const [completed, setCompleted] = useState(todo?.completed);
  const { noteId } = useParams();

  useEffect(() => {
    setCompleted(todo?.completed);
  }, [todo]);

  function handleCheck() {
    const storedTodos = JSON.parse(localStorage.getItem(`sorted-${todo?.moduleId}`) || "[]");
    const updatedTodo = storedTodos.map((t: todoModuleData) => (t.id === todo?.id ? { ...t, completed: !completed } : t));
    localStorage.setItem(`sorted-${todo?.moduleId}`, JSON.stringify(updatedTodo));

    setCompleted((prev) => !prev);
    checkTodo({ completed: !completed, noteId: noteId, todoId: todo?.id });
  }

  return (
    <label className={`flex items-center p-1  rounded-lg hover:cursor-pointer hover:bg-base-200  gap-5 ${completed ? "bg-base-200l" : ""} `}>
      <input checked={completed} onChange={handleCheck} type="checkbox" className="checkbox checkbox-sm checkbox-primary peer" />
      <p className=" text-base-content text-sm font-medium peer-checked:line-through peer-checked:text-info-content w-full  ">{todo?.title}</p>
    </label>
  );
};
