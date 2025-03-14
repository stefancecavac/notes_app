import { create } from "zustand";

interface TreeViewStore {
  treeViewState: { [key: string]: boolean };
  toggleTreeView: (noteId: string) => void;
  setOpenTreeView: (noteId: string) => void;
}

export const useTreeViewStore = create<TreeViewStore>((set) => ({
  treeViewState: JSON.parse(sessionStorage.getItem("treeViewStates") || "{}"),

  toggleTreeView: (noteId) => {
    set((state) => {
      const updatedTreeViewStates = { ...state.treeViewState, [noteId]: !state.treeViewState[noteId] };
      sessionStorage.setItem("treeViewStates", JSON.stringify(updatedTreeViewStates));
      return { treeViewState: updatedTreeViewStates };
    });
  },
  setOpenTreeView: (noteId) => {
    set((state) => {
      const updatedTreeViewStates = { ...state.treeViewState, [noteId]: true };
      sessionStorage.setItem("treeViewStates", JSON.stringify(updatedTreeViewStates));
      return { treeViewState: updatedTreeViewStates };
    });
  },
}));
