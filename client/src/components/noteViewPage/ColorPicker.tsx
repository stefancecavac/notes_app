import { Dispatch, SetStateAction } from "react";

type colorPickerProps = {
  setNoteState: Dispatch<SetStateAction<{ title: string; color: string; selectedIcon: string }>>;
};

export const ColorPicker = ({ setNoteState }: colorPickerProps) => {
  const handleColorPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("color picked");
    setNoteState((prev) => ({ ...prev, color: e.target.value }));
  };

  return (
    <div className="dropdown dropdown-end hidden absolute  group-hover/titleItems:flex   transition-all">
      <div tabIndex={0} role="button" className="btn btn-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          <path d="M16 5h6" />
          <path d="M19 2v6" />
          <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          <circle cx="9" cy="9" r="2" />
        </svg>
        Change Cover
      </div>
      <ul tabIndex={0} className="dropdown-content menu  bg-base-100 rounded-box z-1   p-2 shadow-sm">
        <div className="flex items-center justify-between border-b-2 border-neutral  p-1 ">
          <p className=" font-medium text-sm text-info-content">Select Background color</p>
        </div>
        <p className=" px-3 pt-1 text-xs font-medium  ">Solid colors:</p>
        <div className="grid grid-cols-5 gap-3 ">
          <label className="bg-red-500 rounded-lg hover:cursor-pointer size-10">
            <input onChange={(e) => handleColorPick(e)} value={"#ef4444"} name="color" type="radio" className="appearance-none "></input>
          </label>

          <label className="bg-blue-500 rounded-lg hover:cursor-pointer size-10 ">
            <input onChange={(e) => handleColorPick(e)} value={"#3b82f6"} name="color" type="radio" className="appearance-none"></input>
          </label>

          <label className="bg-yellow-500 rounded-lg hover:cursor-pointer size-10">
            <input onChange={(e) => handleColorPick(e)} value={"#eab308"} name="color" type="radio" className="appearance-none"></input>
          </label>

          <label className="bg-green-500 rounded-lg hover:cursor-pointer size-10">
            <input onChange={(e) => handleColorPick(e)} value={"#22c55e"} name="color" type="radio" className="appearance-none"></input>
          </label>

          <label className="bg-purple-500 rounded-lg hover:cursor-pointer size-10">
            <input onChange={(e) => handleColorPick(e)} value={"#a855f7"} name="color" type="radio" className="appearance-none"></input>
          </label>

          <label className="bg-teal-500 rounded-lg hover:cursor-pointer size-10">
            <input onChange={(e) => handleColorPick(e)} value={"#14b8a6"} name="color" type="radio" className="appearance-none"></input>
          </label>
        </div>
        <p className="text-info-content px-3 pt-3 text-xs font-medium">Gradient colors:</p>
        <div className="grid grid-cols-4 gap-1 px-3">
          <label
            style={{ background: "linear-gradient(to right, hsla(33, 100%, 53%, 1) 0%, hsla(58, 100%, 68%, 1) 100%)" }}
            className=" rounded-lg hover:cursor-pointer size-10"
          >
            <input
              onChange={(e) => handleColorPick(e)}
              value={"linear-gradient(to right, hsla(33, 100%, 53%, 1) 0%, hsla(58, 100%, 68%, 1) 100%)"}
              name="color"
              type="radio"
              className="appearance-none "
            ></input>
          </label>

          <label
            style={{
              background: "linear-gradient(90deg, hsla(191, 88%, 81%, 1) 0%, hsla(260, 72%, 82%, 1) 50%, hsla(247, 73%, 69%, 1) 100%)",
            }}
            className="rounded-lg hover:cursor-pointer size-10"
          >
            <input
              onChange={(e) => handleColorPick(e)}
              value={"linear-gradient(90deg, hsla(191, 88%, 81%, 1) 0%, hsla(260, 72%, 82%, 1) 50%, hsla(247, 73%, 69%, 1) 100%)"}
              name="color"
              type="radio"
              className="appearance-none"
            ></input>
          </label>

          <label
            style={{
              background: "linear-gradient(90deg, hsla(113, 96%, 81%, 1) 0%, hsla(188, 90%, 51%, 1) 100%)",
            }}
            className=" rounded-lg hover:cursor-pointer size-10"
          >
            <input
              onChange={(e) => handleColorPick(e)}
              value={"linear-gradient(90deg, hsla(113, 96%, 81%, 1) 0%, hsla(188, 90%, 51%, 1) 100%)"}
              name="color"
              type="radio"
              className="appearance-none"
            ></input>
          </label>

          <label
            style={{
              background: "linear-gradient(90deg, hsla(217, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)",
            }}
            className=" rounded-lg hover:cursor-pointer size-10"
          >
            <input
              onChange={(e) => handleColorPick(e)}
              value={"linear-gradient(90deg, hsla(217, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)"}
              name="color"
              type="radio"
              className="appearance-none"
            ></input>
          </label>

          <label
            style={{
              background: "linear-gradient(90deg, hsla(120, 6%, 90%, 1) 0%, hsla(229, 47%, 7%, 1) 100%)",
            }}
            className=" rounded-lg hover:cursor-pointer size-10"
          >
            <input
              onChange={(e) => handleColorPick(e)}
              value={"linear-gradient(90deg, hsla(120, 6%, 90%, 1) 0%, hsla(229, 47%, 7%, 1) 100%)"}
              name="color"
              type="radio"
              className="appearance-none"
            ></input>
          </label>
        </div>
        <div className=" border-t-2 p-1">
          <button
            className="text-neutral-500 text-sm rounded-md p-1 hover:cursor-pointer hover:bg-neutral-100 "
            onClick={() => {
              setNoteState((prev) => ({ ...prev, color: "" }));
            }}
          >
            Remove
          </button>
        </div>
      </ul>
    </div>
  );
};
