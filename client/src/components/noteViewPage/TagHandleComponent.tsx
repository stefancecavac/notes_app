import { useEffect, useRef, useState } from "react";
import { noteData, tagSchema } from "../../dataTypes";
import { useCreateTags, useDeleteTag } from "../../api/TagApi";
import FetchedTags from "./FetchedTags";

const TagHandleComponent = ({ singleNote }: { singleNote: noteData | undefined }) => {
  const [tagModal, setTagModal] = useState(false);
  const [tagName, setTagName] = useState("");

  const { addTag } = useCreateTags();
  const { deleteTag } = useDeleteTag();

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleAddTag = () => {
    const backgroundR = Math.floor(Math.random() * 56) + 200;
    const backgroundG = Math.floor(Math.random() * 56) + 200;
    const backgroundB = Math.floor(Math.random() * 56) + 200;

    const textR = Math.max(0, backgroundR - 60);
    const textG = Math.max(0, backgroundG - 60);
    const textB = Math.max(0, backgroundB - 60);

    const backgroundColor = `rgb(${backgroundR} ${backgroundG} ${backgroundB} )`;
    const textColor = `rgb(${textR} ${textG} ${textB})`;

    const validationResult = tagSchema.safeParse({ name: tagName });
    if (!validationResult.success) {
      return;
    }
    setTagModal(false);
    addTag({ name: tagName, textColor: textColor, backgroundColor: backgroundColor });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current !== event.target) {
        setTagModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className=" pt-2 flex items-center gap-3 text-xs text-gray-500 ">
      {singleNote?.tags?.map((tag, index) => (
        <span
          onClick={() => deleteTag(tag.id)}
          style={{ backgroundColor: tag.backgroundColor, color: tag.textColor }}
          key={index}
          className="rounded-md px-2 py-1 bg-gray-200 cursor-pointer"
        >
          <p className="font-medium">{tag.name}</p>
        </span>
      ))}
      {!tagModal ? (
        <button
          ref={buttonRef}
          onClick={() => setTagModal(true)}
          className="flex items-center gap-1 text-xs relative rounded-full px-2 py-0.5 text-neutral-400 dark:hover:bg-neutral-700 hover:bg-neutral-100 "
        >
          <p>Add Tags</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      ) : (
        <div ref={menuRef} className="flex flex-col slide-bottom  z-50  relative w-full ">
          <div className=" absolute -top-3 border-2 bg-white transition-all flex flex-col  rounded-lg   shadow-md z-50 ">
            <div className="flex items-center gap-2 border-b-2 p-3">
              <input value={tagName} onChange={(e) => setTagName(e.target.value)} className="focus:outline-none" placeholder="eg. Work"></input>
              <button className="flex items-center gap-1 text-neutral-500 rounded-md hover:bg-neutral-100 p-1" onClick={handleAddTag}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                add tag
              </button>
            </div>
            <FetchedTags addTag={addTag}></FetchedTags>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagHandleComponent;
