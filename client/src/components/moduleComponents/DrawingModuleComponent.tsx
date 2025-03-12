import React, { useEffect, useRef, useState } from "react";
import { moduleData } from "../../dataTypes";
import CanvasDraw from "react-canvas-draw";
import { useUpdateDrawingModule } from "../../api/modulesApi/DrawingModuleApi";
import { colors } from "../../util/Colors";

const DrawingModuleComponent = React.memo(({ module }: { module: moduleData }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<CanvasDraw | null>(null);

  const { updateDrawingModule } = useUpdateDrawingModule({ noteId: module.noteId });

  const baseContentColor = getComputedStyle(document.documentElement).getPropertyValue("--color-base-content");
  const eraserColor = getComputedStyle(document.documentElement).getPropertyValue("--color-base-200");

  const [selectedColor, setSelectedColor] = useState(baseContentColor.trim());
  const [selectedBrushWidth, setSelectedBrushWidth] = useState(2);

  const [canvasWidth, setCanvasWidth] = useState<number>(800);

  const [savedData, setSavedData] = useState<string | undefined>(module.DrawingModule?.data);

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

  const handleSave = () => {
    if (canvasRef.current) {
      setSavedData(canvasRef.current.getSaveData());
    }
  };

  return (
    <div ref={containerRef} className="rounded-lg flex flex-col justify-center bg-base-200 items-center w-full">
      <div className="flex gap-2 w-full p-2 items-center justify-between border-b border-neutral">
        <div className="flex items-center gap-2">
          <label className="relative">
            <input
              onChange={(e) => setSelectedColor(e.target.value)}
              checked={selectedColor === baseContentColor}
              value={baseContentColor}
              name="color"
              type="radio"
              className="peer hidden"
            />
            <div
              style={{ backgroundColor: baseContentColor }}
              className="rounded-lg hover:cursor-pointer size-6 shadow-md border-4 border-transparent peer-checked:border-neutral peer-checked:scale-110 transition-all"
            ></div>
          </label>
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
          <div className="divider mx-0 divider-horizontal"></div>

          <label className="relative hover:cursor-pointer rounded-lg hover:bg-base-300 p-1">
            <input
              onChange={(e) => setSelectedColor(e.target.value)}
              checked={selectedColor === eraserColor}
              value={eraserColor}
              name="color"
              type="radio"
              className="peer hidden"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
              <path d="M22 21H7" />
              <path d="m5 11 9 9" />
            </svg>
          </label>
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
          <div className="flex justify-between px-2.5 text-info-content h-1  text-xs">
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
});

export default DrawingModuleComponent;
