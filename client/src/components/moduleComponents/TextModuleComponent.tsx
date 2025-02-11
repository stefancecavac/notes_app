import EditorComponent from "../textEditor/EditorComponent";
import { useEditorHook } from "../../hooks/useEditorHook";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useUpdateTextModule } from "../../api/modulesApi/TextModuleApi";
import { moduleData } from "../../dataTypes";
import BubbleMenuBar from "../textEditor/BubbleMenuBar";
import { FloatingMenuBar } from "../textEditor/FloatingMenuBar";

const TextModuleComponent = ({ module }: { module: moduleData }) => {
  const { updateTextModule } = useUpdateTextModule({ noteId: module.noteId });

  const editor = useEditorHook();
  const [content, setContent] = useState<string | undefined>(module.textModule?.content);
  const [debouncedContent] = useDebounce(content, 500);

  useEffect(() => {
    if (!module.textModule) return;
    if (!editor) return;
    const { from, to } = editor.state.selection;
    editor.commands.setContent(module.textModule.content, false, {
      preserveWhitespace: "full",
    });
    editor.commands.setTextSelection({ from, to });
  }, [module, editor, module.textModule]);

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
    if (module.textModule) {
      const titleChanged = content !== module.textModule.content;

      if (titleChanged) {
        updateTextModule({
          moduleId: module.id!,
          content: debouncedContent,
          noteId: module.noteId,
        });
      }
    }
  }, [debouncedContent]);
  return (
    <div className={`h-fit relative  rounded-lg p-2   flex flex-col hover:cursor-text`}>
      <FloatingMenuBar editor={editor!} />
      <BubbleMenuBar editor={editor!} />
      <EditorComponent editor={editor!} />
    </div>
  );
};

export default TextModuleComponent;
