import { BubbleMenu, Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

const BubbleMenuBar = ({ editor }: { editor: Editor }) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      const currentColor = editor.getAttributes("textStyle").color || "";
      setSelectedColor(currentColor);
    };

    editor.on("selectionUpdate", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor]);

  const colors = [
    { color: "", border: "#eae8e8" },
    { color: "#958DF1", border: "#958DF1" },
    { color: "#5e87c9", border: "#5e87c9" },
    { color: "#ca9849", border: "#ca9849" },
    { color: "#df5452", border: "#df5452" },
    { color: "#529e72", border: "#529e72" },
  ];
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu editor={editor}>
      <div className=" flex  z-50 bg-base-200 rounded-md shadow-md p-1 border border-neutral w-fit  ">
        <div className="flex  items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`btn btn-square btn-xs btn-ghost relative group ${editor.isActive("bold") ? "bg-base-300" : ""}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path
                strokeLinejoin="round"
                d="M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z"
              />
            </svg>

            <span className="group-hover:flex hidden   shadow-md px-2 py-1 text-sm bg-base-100 text-base-content border-neutral font-medium border rounded-md absolute  top-8 whitespace-nowrap   items-center  ">
              Bold Style
            </span>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`btn btn-square btn-xs btn-ghost p-1 relative group ${editor.isActive("italic") ? "bg-base-300" : ""}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.248 20.246H9.05m0 0h3.696m-3.696 0 5.893-16.502m0 0h-3.697m3.697 0h3.803" />
            </svg>

            <span className="group-hover:flex hidden   shadow-md px-2 py-1 text-sm bg-base-100 text-base-content border-neutral font-medium border rounded-md absolute  top-8 whitespace-nowrap   items-center  ">
              Italic Style
            </span>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`btn btn-square btn-xs btn-ghost p-1 relative group ${editor.isActive("underline") ? "bg-base-300" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M6 4v6a6 6 0 0 0 12 0V4" />
              <line x1="4" x2="20" y1="20" y2="20" />
            </svg>
            <span className="group-hover:flex hidden   shadow-md px-2 py-1 text-sm bg-base-100 text-base-content border-neutral font-medium border rounded-md absolute  top-8 whitespace-nowrap   items-center  ">
              Underline Style
            </span>
          </button>
        </div>
        <div className="divider divider-horizontal mx-0 "></div>

        <div className="flex  items-center gap-1 ">
          <div className="dropdown">
            <div style={{ borderColor: selectedColor }} tabIndex={0} role="button" className="btn m-1 flex btn-xs  flex-col btn-square  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: selectedColor }}
                className={`size-4 ${selectedColor ? `text-[${selectedColor}]` : "text-[#eae8e8]"}`}
              >
                <path d="M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z" />
              </svg>
              <span className="group-hover:flex hidden   shadow-md px-2 py-1 text-sm bg-base-100 text-base-content border-neutral font-medium border rounded-md absolute  top-8 whitespace-nowrap   items-center  ">
                Text Color
              </span>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <div className="grid grid-cols-4 my-2 gap-3">
                {colors.map(({ color, border }) => (
                  <button
                    key={color}
                    onClick={() => {
                      editor.chain().focus().setColor(color).run();
                      setSelectedColor(color);
                    }}
                    className={`btn btn-xs btn-square border-[${border}] flex p-1 `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: color }}
                      className={`size-4 ${color ? `text-[${color}]` : "text-[#eae8e8]"}`}
                    >
                      <path d="M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z" />
                    </svg>
                  </button>
                ))}
              </div>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight({ color: "#faf594" }).run()}
            className={`btn btn-square btn-xs btn-ghost p-1 relative group ${editor.isActive("highlight") ? "bg-base-300" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="m9 11-6 6v3h9l3-3" />
              <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
            </svg>

            <span className="group-hover:flex hidden   shadow-md px-2 py-1 text-sm bg-base-100 text-base-content border-neutral font-medium border rounded-md absolute  top-8 whitespace-nowrap   items-center  ">
              Text Highlight
            </span>
          </button>
        </div>
        <div className="divider divider-horizontal mx-0 "></div>

        {/* text aligns */}

        <div className="flex  items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={` btn btn-square btn-xs btn-ghost p-1 relative group ${editor.isActive({ textAlign: "left" }) ? "bg-base-300" : ""}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>

            <span className="group-hover:flex hidden   shadow-md px-2 py-1 text-sm bg-base-100 text-base-content border-neutral font-medium border rounded-md absolute  top-8 whitespace-nowrap   items-center  ">
              Left Align
            </span>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`btn btn-square btn-xs btn-ghost p-1 relative group ${editor.isActive({ textAlign: "center" }) ? "bg-base-300" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 12H7" />
              <path d="M19 18H5" />
              <path d="M21 6H3" />
            </svg>

            <span className="group-hover:flex hidden   shadow-md px-2 py-1 text-sm bg-base-100 text-base-content border-neutral font-medium border rounded-md absolute  top-8 whitespace-nowrap   items-center  ">
              Center Align
            </span>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`btn btn-square btn-xs btn-ghost p-1 relative group ${editor.isActive({ textAlign: "right" }) ? "bg-base-300" : ""}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
            </svg>

            <span className="group-hover:flex hidden   shadow-md px-2 py-1 text-sm bg-base-100 text-base-content border-neutral font-medium border rounded-md absolute  top-8 whitespace-nowrap   items-center  ">
              Right Align
            </span>
          </button>
        </div>

        <div className="divider divider-horizontal mx-0 "></div>

        {/* headingsss */}
        <div className="flex  items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`btn btn-square btn-xs btn-ghost p-1 relative grou ${editor.isActive("heading", { level: 1 }) ? "bg-base-300" : ""}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501m4.501-8.627 2.25-1.5v10.126m0 0h-2.25m2.25 0h2.25"
              />
            </svg>

            <span className="group-hover:flex hidden   shadow-md px-2 py-1 text-sm bg-base-100 text-base-content border-neutral font-medium border rounded-md absolute  top-8 whitespace-nowrap   items-center  ">
              Heading 1
            </span>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`btn btn-square btn-xs btn-ghost p-1 relative group ${editor.isActive("heading", { level: 2 }) ? "bg-base-300" : ""}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 19.5H16.5v-1.609a2.25 2.25 0 0 1 1.244-2.012l2.89-1.445c.651-.326 1.116-.955 1.116-1.683 0-.498-.04-.987-.118-1.463-.135-.825-.835-1.422-1.668-1.489a15.202 15.202 0 0 0-3.464.12M2.243 4.492v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501"
              />
            </svg>

            <span className="group-hover:flex hidden   shadow-md px-2 py-1 text-sm bg-base-100 text-base-content border-neutral font-medium border rounded-md absolute  top-8 whitespace-nowrap   items-center  ">
              Heading 2
            </span>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`btn btn-square btn-xs btn-ghost p-1 relative group ${editor.isActive("heading", { level: 3 }) ? "bg-base-300" : ""}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.905 14.626a4.52 4.52 0 0 1 .738 3.603c-.154.695-.794 1.143-1.504 1.208a15.194 15.194 0 0 1-3.639-.104m4.405-4.707a4.52 4.52 0 0 0 .738-3.603c-.154-.696-.794-1.144-1.504-1.209a15.19 15.19 0 0 0-3.639.104m4.405 4.708H18M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501"
              />
            </svg>

            <span className="group-hover:flex hidden   shadow-md px-2 py-1 text-sm bg-base-100 text-base-content border-neutral font-medium border rounded-md absolute  top-8 whitespace-nowrap   items-center  ">
              Heading 3
            </span>
          </button>
        </div>
        <div className="divider divider-horizontal mx-0 "></div>

        <div className="flex  items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`btn btn-square btn-xs btn-ghost p-1 relative group ${editor.isActive("bulletList") ? "bg-base-300" : ""}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <span className="group-hover:flex hidden   shadow-md px-2 py-1 text-sm bg-base-100 text-base-content border-neutral font-medium border rounded-md absolute  top-8 whitespace-nowrap   items-center  ">
              Unordered List
            </span>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`btn btn-square btn-xs btn-ghost p-1 relative group ${editor.isActive("orderedList") ? "bg-base-300" : ""}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
              />
            </svg>

            <span className="group-hover:flex hidden   shadow-md px-2 py-1 text-sm bg-base-100 text-base-content border-neutral font-medium border rounded-md absolute  top-8 whitespace-nowrap   items-center  ">
              Ordered List
            </span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={`btn btn-square btn-xs btn-ghost p-1 relative group ${editor.isActive("taskList") ? "bg-base-300" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5" />
              <path d="m9 11 3 3L22 4" />
            </svg>

            <span className="group-hover:flex hidden   shadow-md px-2 py-1 text-sm bg-base-100 text-base-content border-neutral font-medium border rounded-md absolute  top-8 whitespace-nowrap   items-center  ">
              Task List
            </span>
          </button>
        </div>

        <div className="divider divider-horizontal mx-0 "></div>

        <div className="flex  items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`btn btn-square btn-xs btn-ghost p-1 relative group ${editor.isActive("codeBlock") ? "bg-base-300" : ""}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
            <span className="group-hover:flex hidden   shadow-md px-2 py-1 text-sm bg-base-100 text-base-content border-neutral font-medium border rounded-md absolute  top-8 whitespace-nowrap   items-center  ">
              Toggle CodeBlock
            </span>
          </button>
        </div>
      </div>
    </BubbleMenu>
  );
};

export default BubbleMenuBar;
