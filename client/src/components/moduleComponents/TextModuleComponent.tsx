import EditorComponent from "../textEditor/EditorComponent";
import { useEditorHook } from "../../hooks/useEditorHook";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { moduleData } from "../../dataTypes";
import BubbleMenuBar from "../textEditor/BubbleMenuBar";
import { FloatingMenuBar } from "../textEditor/FloatingMenuBar";
import { useUpdateModule } from "../../api/ModuleApi";

const TextModuleComponent = React.memo(({ module }: { module: moduleData }) => {
  const { updateModule } = useUpdateModule({ noteId: module.noteId });

  const editor = useEditorHook();
  const [content, setContent] = useState<string | undefined>(module.properties?.content);
  const [debouncedContent] = useDebounce(content, 500);

  useEffect(() => {
    if (!module) return;
    if (!editor) return;
    const { from, to } = editor.state.selection;
    editor.commands.setContent(module.properties.content, false, {
      preserveWhitespace: "full",
    });
    editor.commands.setTextSelection({ from, to });
  }, [module, editor]);

  useEffect(() => {
    if (editor) {
      const handleEditorChange = () => {
        const newContent = editor.getHTML();
        setContent(newContent);
      };
      editor.on("update", handleEditorChange);
      return () => {
        editor.off("update", handleEditorChange);
      };
    }
  }, [editor]);

  useEffect(() => {
    if (module) {
      const titleChanged = content !== module.properties.content;

      if (titleChanged) {
        updateModule({
          moduleId: module.id!,
          properties: { content: debouncedContent },
          noteId: module.noteId,
        });
      }
    }
  }, [debouncedContent]);
  return (
    <div className={`h-fit relative  rounded-lg  bg-base-100    flex flex-col hover:cursor-text`}>
      <FloatingMenuBar editor={editor!} />
      <BubbleMenuBar editor={editor!} />
      <EditorComponent editor={editor!} />
    </div>
  );
});

export default TextModuleComponent;
