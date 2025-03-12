import { Editor, EditorContent } from "@tiptap/react";
import React from "react";

const EditorComponent = React.memo(({ editor }: { editor: Editor }) => {
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
});

export default EditorComponent;
