import { Editor, EditorContent } from "@tiptap/react";

const EditorComponent = ({ editor }: { editor: Editor }) => {
  return (
    <EditorContent
      editor={editor}
      style={{
        maxWidth: "100%",
        whiteSpace: "normal",
        wordBreak: "break-word",
      }}
    />
  );
};

export default EditorComponent;
