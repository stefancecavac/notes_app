import { create } from "zustand";
import { moduleData } from "../dataTypes";

interface DragState {
  activeModule: moduleData | undefined | null;
  setActiveModule: (module: moduleData | undefined | null) => void;
}

export const useDragStore = create<DragState>((set) => ({
  activeModule: null,
  setActiveModule: (module) => set({ activeModule: module }),
}));
