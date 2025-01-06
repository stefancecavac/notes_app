import { create } from "zustand";

type WideModeState = {
  wideMode: boolean;
  toggleWideMode: () => void;
};

export const useWideModeStore = create<WideModeState>((set) => ({
  wideMode: (() => {
    const savedWideMode = localStorage.getItem("wideMode");
    return savedWideMode ? JSON.parse(savedWideMode) : false;
  })(),
  toggleWideMode: () =>
    set((state) => {
      const newWideMode = !state.wideMode;
      localStorage.setItem("wideMode", JSON.stringify(newWideMode));
      return { wideMode: newWideMode };
    }),
}));
