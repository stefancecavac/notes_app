import { useState } from "react";
import { moduleData } from "../../dataTypes";
import { useUpdateImageModule } from "../../api/modulesApi/ImageModuleApi";

const ImageModuleComponent = ({ module }: { module: moduleData }) => {
  const { updateImageModule } = useUpdateImageModule({ noteId: module.noteId });

  const [size, setSize] = useState<{ width: number | undefined; height: number | undefined }>({
    width: module.imageModule?.width,
    height: module.imageModule?.height,
  });

  const handleSizeChange = (width: number, height: number) => {
    setSize({ width: width, height: height });
    updateImageModule({ moduleId: module.id, noteId: module.noteId, height: height, width: width });
  };

  return (
    <div className="mx-auto w-full flex items-center justify-center relative transition-all">
      <div className="absolute flex items-center gap-2 bottom-1 glass p-2 rounded shadow">
        <button className="btn btn-xs" onClick={() => handleSizeChange(400, 300)}>
          xs
        </button>
        <button className="btn btn-xs" onClick={() => handleSizeChange(600, 500)}>
          sm
        </button>
        <button className="btn btn-xs" onClick={() => handleSizeChange(1000, 700)}>
          Normal
        </button>
      </div>

      <img
        loading="lazy"
        className="rounded"
        src={module.imageModule?.imageUrl}
        alt="Uploaded Image"
        style={{
          width: typeof size.width === "string" ? size.width : `${size.width}px`,
          height: `${size.height}px`,
          transition: "all 0.3s ease-in-out",
        }}
      />
    </div>
  );
};

export default ImageModuleComponent;
