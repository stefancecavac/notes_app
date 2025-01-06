import { create } from "zustand";

type DarkModeState = {
  darkMode: boolean;
  toggleTheme: () => void;
};

export const useDarkModeStore = create<DarkModeState>((set) => {
  const initialTheme = localStorage.getItem("theme") === "dark";

  if (initialTheme) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return {
    darkMode: initialTheme,
    toggleTheme: () =>
      set((state) => {
        const newTheme = !state.darkMode;
        localStorage.setItem("theme", newTheme ? "dark" : "light");
        if (newTheme) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        return { darkMode: newTheme };
      }),
  };
});
