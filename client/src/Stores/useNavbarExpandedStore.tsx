import { create } from "zustand";

type NavbarExpandedState = {
  width: number;
  setWidth: (newWidth: number) => void;
  expanded: boolean;
  toggleExpanded: () => void;
};

export const useNavbarExpandedStore = create<NavbarExpandedState>((set) => ({
  width: (() => {
    const savedNavbarWidth = sessionStorage.getItem("navbarWidth");
    return savedNavbarWidth ? JSON.parse(savedNavbarWidth) : 260;
  })(),
  setWidth: (newWidth: number) => {
    sessionStorage.setItem("navbarWidth", JSON.stringify(newWidth));
    set(() => ({ width: newWidth }));
  },
  expanded: (() => {
    const savedNavbarState = sessionStorage.getItem("navbarState");
    return savedNavbarState ? JSON.parse(savedNavbarState) : false;
  })(),
  toggleExpanded: () =>
    set((state) => {
      const newNavbarState = !state.expanded;
      sessionStorage.setItem("navbarState", JSON.stringify(newNavbarState));
      return { expanded: newNavbarState };
    }),
}));
