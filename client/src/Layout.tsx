import Navbar from "./components/navbar/Navbar";
import React from "react";
import { Toast } from "./Stores/useToastNotificationToast";
import { useDynamicTitleAndFaviconHook } from "./hooks/useDynamicTitleAndFavicontHook";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useDynamicTitleAndFaviconHook("", "");
  return (
    <div id="main-div" className="flex h-screen bg-base-200 ">
      <Navbar></Navbar>
      <div id="content-div" className="flex-1 flex bg-base-100 m-1 rounded-lg overflow-hidden shadow-md  ">
        {children}
      </div>
      <Toast></Toast>
    </div>
  );
};

export default Layout;
