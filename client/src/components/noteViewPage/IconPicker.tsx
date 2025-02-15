import { Dispatch, SetStateAction, useState } from "react";
import { icons } from "../../util/Icons";

type iconPickerProps = {
  setNoteState: Dispatch<SetStateAction<{ title: string; color: string; icon: string }>>;
  noteState: { title: string; color: string; icon: string };
};

export const IconPicker = ({ setNoteState, noteState }: iconPickerProps) => {
  const [iconsArray, setIconArray] = useState(icons);

  const handleIconPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteState((prev) => ({ ...prev, icon: e.target.value }));
  };
  const colors = ["#ef4444", "#3b82f6", "#eab308", "#22c55e", "#a855f7", "#14b8a6"];

  const handleColorPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorChangedArray = iconsArray.map((icon) => ({
      ...icon,
      svg: icon.svg.replace(/fill=['"]#[a-fA-F0-9]{3,6}['"]/, `fill='${e.target.value}'`),
    }));
    setIconArray(colorChangedArray);
  };

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1 p-1  btn-sm  btn-ghost text-info-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 "
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
          <path d="M14 3v4a2 2 0 0 0 2 2h4" />
          <path d="M8 13h.01" />
          <path d="M16 13h.01" />
          <path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1" />
        </svg>
        Pick icon
      </div>
      <ul tabIndex={0} className="dropdown-content w-45  menu bg-base-100 rounded-box z-1 p-2 shadow-md border border-neutral ">
        <div className="flex items-center w-full justify-between border-b-2 border-neutral p-1">
          <p className=" text-xs text-info-content font-bold">Select Icon</p>
          <button
            className="btn btn-xs   "
            onClick={() => {
              setNoteState((prev) => ({ ...prev, icon: "" }));
            }}
          >
            Remove
          </button>
        </div>
        <div className="grid grid-cols-5 gap-1 p-2">
          {colors.map((color, index) => (
            <label key={index} style={{ backgroundColor: color }} className="  shadow-md rounded-lg hover:cursor-pointer size-6">
              <input onChange={handleColorPick} value={color} name="color" type="radio" className="appearance-none input hidden "></input>
            </label>
          ))}
        </div>
        <div className="grid  grid-cols-4 gap-1 p-2 w-fit ">
          {iconsArray.map((icon, index) => (
            <label
              key={index}
              className={`hover:bg-base-300 rounded-lg border border-transparent ${
                noteState.icon === icon.svg ? "bg-base-300  border-base-content " : ""
              }`}
            >
              <input
                onChange={handleIconPick}
                className="hidden "
                value={icon.svg}
                checked={noteState.icon === icon.svg}
                name="group"
                type="radio"
              ></input>
              <div className="size-8   rounded-md  hover:cursor-pointer p-1" dangerouslySetInnerHTML={{ __html: icon.svg }}></div>
            </label>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default IconPicker;
