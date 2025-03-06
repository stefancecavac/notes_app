import { create } from "zustand";
import ToastComponent from "../components/ToastComponent";
import { createPortal } from "react-dom";
import { useEffect } from "react";

type ToastMessage = {
  message: string;
  id: number;
};

type ToastStore = {
  toast: ToastMessage | null;
  showToast: (message: string) => void;
  clearToast: () => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  showToast: (message) => {
    set({ toast: { message, id: Date.now() } });
  },
  clearToast: () => set({ toast: null }),
}));

export const Toast = () => {
  const { clearToast, toast } = useToastStore();

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      clearToast();
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return createPortal(<ToastComponent key={toast.id} message={toast?.message} />, document.body);
};
