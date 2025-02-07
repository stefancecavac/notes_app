import { create } from "zustand";
import ToastComponent from "../components/ToastComponent";
import { createPortal } from "react-dom";
import { useEffect } from "react";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "WARNING";
};

type ToastStore = {
  toast: ToastMessage | null;
  showToast: (toastMessage: ToastMessage) => void;
  clearToast: () => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  showToast: (toastMessage) => {
    set({ toast: toastMessage });
  },
  clearToast: () => set({ toast: null }),
}));

export const Toast = () => {
  const { clearToast, toast } = useToastStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      clearToast();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast]);

  if (!toast) return null;

  return createPortal(<ToastComponent message={toast?.message} type={toast?.type}></ToastComponent>, document.body);
};
