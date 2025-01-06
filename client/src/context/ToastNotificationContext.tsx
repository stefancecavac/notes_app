import React, { useContext, useEffect, useState } from "react";
import ToastComponent from "../components/ToastComponent";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "WARNING";
};

type ToastContextType = {
  showToast: (toastMessage: ToastMessage) => void;
};

export const ToastContext = React.createContext<ToastContextType | null>(null);

export const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(undefined);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast]);

  return (
    <ToastContext.Provider
      value={{
        showToast(toastMessage) {
          setToast(toastMessage);
        },
      }}
    >
      {toast && <ToastComponent message={toast.message} type={toast.type}></ToastComponent>}
      {children}
    </ToastContext.Provider>
  );
};

export const UseToastContext = () => {
  const context = useContext(ToastContext);
  return context as ToastContextType;
};
