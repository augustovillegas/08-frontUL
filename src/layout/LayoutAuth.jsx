import React from "react";
import { Link, Outlet } from "react-router-dom";

export const LayoutAuth = () => {
  return (
    <div className="bg-secondary-900 min-h-screen flex items-center justify-center text-white p-4 sm:p-6 lg:p-8 relative">
      <Link
        to="/"
        className="absolute top-6 left-6 text-sm text-gray-300 hover:text-white transition-colors"
      >
        Volver al inicio
      </Link>
      <Outlet />
    </div>
  )
}
