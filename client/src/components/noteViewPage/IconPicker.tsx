import { Dispatch, SetStateAction, useState } from "react";
import { icons } from "../../util/Icons";
import { useWideModeStore } from "../../Stores/useWideModeStore";

const IconPicker = ({
  selectedIcon,
  setSelectedIcon,
}: {
  selectedIcon: string | undefined;
  setSelectedIcon: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const [hidden, setHidden] = useState(true);
  const { wideMode } = useWideModeStore();
  const [iconsArray, setIconArray] = useState(icons);

  const handleIconPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIcon(e.target.value);
    setHidden(true);
  };
  const handleColorPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorChangedArray = iconsArray.map((icon) => ({
      ...icon,
      svg: icon.svg.replace(/fill=['"]#[a-fA-F0-9]{3,6}['"]/, `fill='${e.target.value}'`),
    }));
    setIconArray(colorChangedArray);
  };

  return hidden ? (
    <button
      onClick={() => setHidden((prev) => !prev)}
      className={`${
        selectedIcon ? `${wideMode ? "-left-0  -top-14" : "  -left-24"} flex ` : "hidden  -left-16"
      }  scale-up-center absolute  rounded-lg p-1 hover:bg-neutral-100/50  dark:hover:bg-neutral-700 group-hover/titleItems:flex transition-all`}
    >
      {selectedIcon === "" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-8 text-neutral-300 dark:text-neutral-600"
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
      ) : (
        <div className=" size-14 " dangerouslySetInnerHTML={{ __html: selectedIcon! }}></div>
      )}
    </button>
  ) : (
    <div
      onMouseLeave={() => setHidden(true)}
      className={`${
        selectedIcon ? `${wideMode ? "-left-5  -top-24 " : ""}  -left-24` : " -left-20  -"
      } absolute z-50 slide-bottom w-fit  bg-white  rounded-lg border-2 shadow-md `}
    >
      <div className="flex items-center w-lg justify-between border-b-2 p-1">
        <p className="text-neutral-500 text-xs">Select Icon</p>
        <button
          className="text-neutral-500 text-xs rounded-md p-1 hover:cursor-pointer hover:bg-neutral-100 "
          onClick={() => {
            setSelectedIcon("");
            setHidden(true);
          }}
        >
          Remove
        </button>
      </div>
      <div className="grid grid-cols-5 gap-1 p-2">
        <label className="bg-[#a3a3a3]  shadow-md rounded-lg hover:cursor-pointer size-6">
          <input onChange={handleColorPick} value={"#a3a3a3"} name="color" type="radio" className="appearance-none "></input>
        </label>
        <label className="bg-orange-500 rounded-lg hover:cursor-pointer size-6">
          <input onChange={handleColorPick} value={"#F97316"} name="color" type="radio" className="appearance-none"></input>
        </label>

        <label className="bg-yellow-400 rounded-lg hover:cursor-pointer size-6">
          <input onChange={handleColorPick} value={"#FACC15"} name="color" type="radio" className="appearance-none"></input>
        </label>

        <label className="bg-green-600 rounded-lg hover:cursor-pointer size-6">
          <input onChange={handleColorPick} value={"#16A34A"} name="color" type="radio" className="appearance-none"></input>
        </label>

        <label className="bg-blue-600 rounded-lg hover:cursor-pointer size-6">
          <input onChange={handleColorPick} value={"#2563EB"} name="color" type="radio" className="appearance-none"></input>
        </label>

        <label className="bg-indigo-500 rounded-lg hover:cursor-pointer size-6">
          <input onChange={handleColorPick} value={"#6366F1"} name="color" type="radio" className="appearance-none"></input>
        </label>

        <label className="bg-purple-600 rounded-lg hover:cursor-pointer size-6">
          <input onChange={handleColorPick} value={"#9333EA"} name="color" type="radio" className="appearance-none"></input>
        </label>

        <label className="bg-pink-600 rounded-lg hover:cursor-pointer size-6">
          <input onChange={handleColorPick} value={"#DB2777"} name="color" type="radio" className="appearance-none"></input>
        </label>

        <label className="bg-teal-500 rounded-lg hover:cursor-pointer size-6">
          <input onChange={handleColorPick} value={"#14B8A6"} name="color" type="radio" className="appearance-none"></input>
        </label>

        <label className="bg-lime-500 rounded-lg hover:cursor-pointer size-6">
          <input onChange={handleColorPick} value={"#84CC16"} name="color" type="radio" className="appearance-none"></input>
        </label>

        <label className="bg-rose-500 rounded-lg hover:cursor-pointer size-6">
          <input onChange={handleColorPick} value={"#F43F5E"} name="color" type="radio" className="appearance-none"></input>
        </label>
      </div>
      <div className="grid  grid-cols-4 gap-1 p-2 ">
        {iconsArray.map((icon, index) => (
          <label key={index}>
            <input onChange={handleIconPick} className="hidden" value={icon.svg} name="group" type="radio"></input>
            <div
              className="size-8  text-neutral-600  rounded-md hover:bg-neutral-100 hover:cursor-pointer p-1"
              dangerouslySetInnerHTML={{ __html: icon.svg }}
            ></div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default IconPicker;
