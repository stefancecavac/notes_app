import { useParams } from "react-router-dom";
import { useAddTodoInModule, useCheckTodo } from "../../api/modulesApi/TodoModuleApi";
import { moduleData, todoModuleData } from "../../dataTypes";
import { useEffect, useState } from "react";

export const ToDoModuleComponent = ({ module }: { module: moduleData }) => {
  const { addTodo } = useAddTodoInModule();

  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState("medium");
  const [sortedTodos, setSortedTodos] = useState(module?.TodoModule || []);
  const [sortOrder, setSortOrder] = useState<"hardestFirst" | "easiestFirst">("hardestFirst");
  const [sortCompleted, setSortCompleted] = useState<"completedFirst" | "completedLast">("completedFirst");

  useEffect(() => {
    setSortedTodos(module?.TodoModule || []);
  }, [module?.TodoModule]);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({ title, priority, moduleId: module.id, noteId: module.noteId });
  };

  const sortByPriority = () => {
    const priorityOrder = { low: 1, medium: 2, high: 3 };

    setSortedTodos((prevTodos) =>
      [...prevTodos].sort((a, b) => {
        return sortOrder === "hardestFirst"
          ? priorityOrder[b?.priority as keyof typeof priorityOrder] - priorityOrder[a?.priority as keyof typeof priorityOrder]
          : priorityOrder[a?.priority as keyof typeof priorityOrder] - priorityOrder[b?.priority as keyof typeof priorityOrder];
      })
    );

    setSortOrder((prev) => (prev === "hardestFirst" ? "easiestFirst" : "hardestFirst"));
  };
  const sortByCompleted = () => {
    setSortedTodos((prevTodos) =>
      [...prevTodos].sort((a, b) => {
        if (sortCompleted === "completedFirst") {
          return (b?.completed ? 1 : 0) - (a?.completed ? 1 : 0);
        } else {
          return (a?.completed ? 1 : 0) - (b?.completed ? 1 : 0);
        }
      })
    );
    setSortCompleted((prev) => (prev === "completedFirst" ? "completedLast" : "completedFirst"));
  };

  return (
    <div className="rounded p-1 bg-base-100">
      <h2 className="font-bold text-lg">Your To Do</h2>
      <div className="divider my-3"></div>

      <div className="flex items-center justify-between gap-5">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-primary btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Task
          </div>
          <div tabIndex={0} className="dropdown-content menu bg-base-300 mt-2 rounded-box z-1 w-100 p-2 shadow-sm">
            <form onSubmit={handleAddTodo} className="flex items-center gap-2">
              <input onChange={(e) => setTitle(e.target.value)} type="text" className="input input-sm w-full"></input>
              <select onChange={(e) => setPriority(e.target.value)} defaultValue="medium" className="select select-sm">
                <option disabled={true}>Choose priority</option>
                <option value={"low"}>low</option>
                <option value={"medium"}>medium</option>
                <option value={"high"}>high</option>
              </select>
              <button className="btn btn-sm btn-primary">Add</button>
            </form>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <button className="btn btn-primary btn-soft btn-sm text-xs" onClick={sortByCompleted}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
            <p className="">Sort by Completed</p>
          </button>

          <button className="btn btn-primary btn-soft btn-sm" onClick={sortByPriority}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
            <p>Sort by Priority</p>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-10">
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
    setCompleted((prev) => !prev);
    checkTodo({ completed: !completed, noteId: noteId, todoId: todo?.id });
  }

  return (
    <label className={`flex items-center p-1  rounded-lg hover:cursor-pointer hover:bg-base-200  gap-5 ${completed ? "bg-base-200l" : ""} `}>
      <input checked={completed} onChange={handleCheck} type="checkbox" className="checkbox checkbox-sm checkbox-primary peer" />
      <p className=" text-base-content text-sm font-medium peer-checked:line-through peer-checked:text-info-content w-full  ">{todo?.title}</p>
      <div
        className={`rounded-lg p-0.5 flex gap-1 text-xs text-neutral font-semibold  ${
          todo?.priority === "low" ? "bg-green-400" : todo?.priority === "medium" ? "bg-yellow-400" : "bg-red-500"
        }`}
      >
        <p className="flex">{todo?.priority}</p>
        <p>priority</p>
      </div>
    </label>
  );
};
