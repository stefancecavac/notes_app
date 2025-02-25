import { useEffect, useRef, useState } from "react";
import { moduleData } from "../../dataTypes";
import CanvasDraw from "react-canvas-draw";
import { useUpdateDrawingModule } from "../../api/modulesApi/DrawingModuleApi";
import { colors } from "../../util/Colors";
import { useDebounce } from "use-debounce";

export const DrawingModuleComponent = ({ module }: { module: moduleData }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<CanvasDraw | null>(null);

  const { updateDrawingModule } = useUpdateDrawingModule({ noteId: module.noteId });

  const baseContentColor = getComputedStyle(document.documentElement).getPropertyValue("--color-base-content");
  const [selectedColor, setSelectedColor] = useState(baseContentColor.trim());
  const [selectedBrushWidth, setSelectedBrushWidth] = useState(2);

  const [canvasWidth, setCanvasWidth] = useState<number>(800);

  const [savedData, setSavedData] = useState<string | undefined>(module.DrawingModule?.data);

  const [debouncedSave] = useDebounce(savedData, 1000);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setCanvasWidth(containerRef.current.clientWidth);
      }
    };

    const observer = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    updateWidth();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (debouncedSave === module.DrawingModule?.data) return;
    updateDrawingModule({
      data: debouncedSave,
      moduleId: module.id,
      noteId: module.noteId,
    });
  }, [debouncedSave, module.DrawingModule?.data, module.id, module.noteId, updateDrawingModule]);

  const handleSave = () => {
    if (canvasRef.current) {
      setSavedData(canvasRef.current.getSaveData());
    }
  };

  return (
    <div ref={containerRef} className="rounded flex flex-col justify-center border border-neutral items-center w-full">
      <div className="flex gap-2 w-full p-2 items-center justify-between">
        <div className="flex items-center gap-2">
          {colors.map((color, index) => (
            <label key={index} className="relative">
              <input
                onChange={(e) => setSelectedColor(e.target.value)}
                checked={selectedColor === color}
                value={color}
                name="color"
                type="radio"
                className="peer hidden"
              />
              <div
                style={{ backgroundColor: color }}
                className="rounded-lg hover:cursor-pointer size-6 shadow-md border-4 border-transparent peer-checked:border-neutral peer-checked:scale-110 transition-all"
              ></div>
            </label>
          ))}
        </div>

        <div className="w-30 max-w-xs ">
          <input
            onChange={(e) => setSelectedBrushWidth(Number(e.target.value))}
            type="range"
            min={0.1}
            max={8.1}
            value={selectedBrushWidth}
            className="range range-xs"
            step={2}
          />
          <div className="flex justify-between px-2.5  text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
        </div>
      </div>

      <CanvasDraw
        onChange={handleSave}
        ref={canvasRef}
        brushColor={selectedColor}
        hideGrid
        saveData={module.DrawingModule?.data}
        immediateLoading
        brushRadius={selectedBrushWidth}
        lazyRadius={5}
        backgroundColor="inherit"
        canvasWidth={canvasWidth}
        canvasHeight={600}
      />
    </div>
  );
};
