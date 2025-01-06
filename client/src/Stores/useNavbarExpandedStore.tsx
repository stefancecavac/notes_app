import { create } from "zustand";

type NavbarExpandedState = {
  expanded: boolean;
  toggleExpanded: () => void;
};

export const useNavbarExpandedStore = create<NavbarExpandedState>((set) => ({
  expanded: (() => {
    const savedNavbarState = localStorage.getItem("navbarState");
    return savedNavbarState ? JSON.parse(savedNavbarState) : false;
  })(),
  toggleExpanded: () =>
    set((state) => {
      const newNavbarState = !state.expanded;
      localStorage.setItem("navbarState", JSON.stringify(newNavbarState));
      return { expanded: newNavbarState };
    }),
}));
