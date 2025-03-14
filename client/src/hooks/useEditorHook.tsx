import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../components/textEditor/Editor.css";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import FloatingMenu from "@tiptap/extension-floating-menu";
import { useMemo } from "react";

export const useEditorHook = (content = "") => {
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        codeBlock: { HTMLAttributes: { class: "custom-codeBlock" } },
        dropcursor: { class: "drop-cursor" },
        paragraph: { HTMLAttributes: { class: "custom-paragraph" } },
        heading: { levels: [1, 2, 3] as const },
        listItem: { HTMLAttributes: { class: "custom-list-item" } },
        bulletList: { HTMLAttributes: { class: "custom-unordered-list" } },
        orderedList: { HTMLAttributes: { class: "custom-ordered-list" } },
      }),
      FloatingMenu.configure({
        shouldShow: ({ editor }) => editor.isActive("paragraph"),
      }),
      TextStyle,
      Highlight.configure({ HTMLAttributes: { class: "custom-mark" } }),
      Underline,
      Color,
      Placeholder.configure({ showOnlyCurrent: true, placeholder: "Write something interesting" }),
      Link.configure({ HTMLAttributes: { class: "custom-link" } }),
      TextAlign.configure({ types: ["heading", "paragraph", "taskList", "listItem", "bulletList"] }),
    ],
    []
  );

  return useEditor({
    extensions,
    content,
    editorProps: { attributes: { style: "outline: none; height: 100%;" } },
  });
};
