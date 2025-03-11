import React, { useState } from "react";
import { noteData, tagSchema } from "../../dataTypes";
import { useCreateTags, useDeleteTag } from "../../api/TagApi";
import FetchedTags from "./FetchedTags";

const TagHandleComponent = React.memo(({ singleNote }: { singleNote: noteData | undefined }) => {
  const [tagName, setTagName] = useState("");
  const [menu, setMenu] = useState(false);

  const { addTag } = useCreateTags();
  const { deleteTag } = useDeleteTag();

  const handleAddTag = () => {
    const backgroundR = Math.floor(Math.random() * 156) + 100;
    const backgroundG = Math.floor(Math.random() * 156) + 100;
    const backgroundB = Math.floor(Math.random() * 156) + 100;

    const textR = Math.max(0, backgroundR - 80);
    const textG = Math.max(0, backgroundG - 80);
    const textB = Math.max(0, backgroundB - 80);

    const backgroundColor = `rgb(${backgroundR} ${backgroundG} ${backgroundB} )`;
    const textColor = `rgb(${textR} ${textG} ${textB})`;

    const validationResult = tagSchema.safeParse({ name: tagName });
    if (!validationResult.success) {
      return;
    }
    addTag({ name: tagName, textColor: textColor, backgroundColor: backgroundColor });
  };

  return (
    <div className=" pt-2 flex items-center gap-3 text-xs text-info-content h-5  z-50">
      {singleNote?.tags?.map((tag, index) => (
        <span
          onClick={() => deleteTag(tag.id)}
          style={{ backgroundColor: tag.backgroundColor, color: tag.textColor }}
          key={index}
          className="rounded-md px-2 py-1  cursor-pointer "
        >
          <p className="font-medium"># {tag.name}</p>
        </span>
      ))}

      <div onClick={() => setMenu(true)} className="dropdown hidden group-hover/titleItems:flex scale-up-center">
        <div tabIndex={0} role="button" className="flex items-center gap-1 text-xs relative  btn btn-xs btn-ghost text-info-content">
          <p>Add Tags</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1  p-2 shadow-md border border-neutral">
          <div className="flex items-center gap-2  p-1">
            <input
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              className="focus:outline-hidden input input-sm w-50"
              placeholder="eg. Work"
            ></input>
            <button className="btn btn-xs " onClick={handleAddTag}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              add tag
            </button>
          </div>
          {menu && <FetchedTags addTag={addTag} />}
        </ul>
      </div>
    </div>
  );
});

export default TagHandleComponent;
