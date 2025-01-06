import Navbar from "./components/navbar/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="main-div" className="flex h-screen ">
      <Navbar></Navbar>
      <div className="flex-1 flex bg-white dark:bg-neutral-900   ">{children}</div>
    </div>
  );
};

export default Layout;
