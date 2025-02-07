import Navbar from "./components/navbar/Navbar";
import React from "react";
import { Toast } from "./Stores/useToastNotificationToast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="main-div" className="flex h-screen bg-stone-100 ">
      <Navbar></Navbar>
      <div className="flex-1 flex bg-white dark:bg-neutral-900 m-1 rounded-lg overflow-hidden  border-2 ">{children}</div>
      <Toast></Toast>
    </div>
  );
};

export default Layout;
