import { moduleData } from "../../dataTypes";
import React, { useState } from "react";
import { useUpdateModule } from "../../api/ModuleApi";

const ToDoModuleComponent = React.memo(({ module }: { module: moduleData }) => {
  const { updateModule } = useUpdateModule({ noteId: module.noteId });
  const [title, setTitle] = useState("");

  const handleAddTodo = () => {
    updateModule({
      type: "to-do",
      moduleId: module.id,
      noteId: module.noteId,
      properties: { items: [...module.properties.items, { id: Math.random().toString(16).substring(2, 9), title: title, completed: false }] },
    });
    setTitle("");
  };

  const handleCheckTodo = (todo: { id: string; title: string; completed: boolean }) => {
    const updatedItems = module.properties.items.map((item: { id: string; title: string; completed: boolean }) =>
      item.id === todo.id ? { ...item, completed: !item.completed } : item
    );

    updateModule({
      type: "to-do",
      moduleId: module.id,
      noteId: module.noteId,
      properties: { items: updatedItems },
      order: 0,
    });
  };

  const handleRemoveTodo = (todo: { id: string; title: string; completed: boolean }) => {
    const filteredTodos = module.properties.items.filter((item: { id: string; title: string; completed: boolean }) => item.id !== todo.id);

    updateModule({
      type: "to-do",
      moduleId: module.id,
      noteId: module.noteId,
      properties: { items: filteredTodos },
      order: 0,
    });
  };

  return (
    <div className="rounded  bg-base-100">
      <div className="flex flex-col gap-1 mb-2">
        {module.properties.items.map((todo: { id: string; title: string; completed: boolean }) => (
          <label
            key={todo.id}
            className={`flex items-center relative p-1 justify-between  rounded-lg hover:cursor-pointer group/todo hover:bg-base-200   gap-5 ${"bg-base-200l"} `}
          >
            <div className="flex items-center gap-2">
              <input
                checked={todo.completed}
                onChange={() => handleCheckTodo(todo)}
                type="checkbox"
                className="checkbox checkbox-xs rounded-sm  checkbox-primary peer"
              />
              <p className=" text-base-content text-sm font-medium peer-checked:line-through peer-checked:text-info-content w-fit">{todo?.title}</p>
            </div>
            <button
              onClick={() => handleRemoveTodo(todo)}
              className=" btn absolute right-0  btn-xs btn-error btn-square btn-soft hidden group-hover/todo:flex"
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
        ))}
      </div>
      <div className="flex items-center gap-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && title.trim()) {
              e.preventDefault();
              handleAddTodo();
            }
          }}
          placeholder="Add task"
          className="input border-none input-sm focus-within:appearance-none focus-within:outline-none focus-within:border"
        ></input>
        <button onClick={handleAddTodo} className="btn btn-primary btn-xs">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add
        </button>
      </div>
    </div>
  );
});

export default ToDoModuleComponent;
