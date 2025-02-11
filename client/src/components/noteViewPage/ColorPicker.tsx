import { Dispatch, SetStateAction } from "react";

type colorPickerProps = {
  setNoteState: Dispatch<SetStateAction<{ title: string; color: string; icon: string }>>;
};

export const ColorPicker = ({ setNoteState }: colorPickerProps) => {
  const handleColorPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteState((prev) => ({ ...prev, color: e.target.value }));
  };

  const colors = ["#ef4444", "#3b82f6", "#eab308", "#22c55e", "#a855f7", "#14b8a6"];

  return (
    <div className="dropdown  dropdown-center">
      <div tabIndex={0} role="button" className="btn btn-sm btn-ghost text-info-content">
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
      <ul tabIndex={0} className="dropdown-content menu flex flex-col  shadow-md  border border-neutral mt-2    bg-base-100 rounded-box z-1   p-2 ">
        <div className="flex items-center gap-2 ">
          {colors.map((color, index) => (
            <label key={index} style={{ backgroundColor: color }} className=" rounded-lg hover:cursor-pointer size-8 shadow-md">
              <input onChange={(e) => handleColorPick(e)} value={color} name="color" type="radio" className="appearance-none "></input>
            </label>
          ))}
          <button
            className="btn btn-sm"
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
