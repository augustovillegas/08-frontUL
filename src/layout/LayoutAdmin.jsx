import React from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import { Header } from "../components/Header";

export const LayoutAdmin = () => {
  return (
    <div className="h-screen overflow-hidden grid grid-cols-1 xl:grid-cols-6 text-white">
      <SideBar />
      <div className="xl:col-span-5 flex flex-col h-screen">
        <Header />
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
