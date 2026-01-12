import React, { useState } from "react";
import {
  RiNotification3Line,
  RiArrowDownSLine,
  RiSettings3Line,
  RiLogoutCircleRLine,
  RiThumbUpLine,
  RiChat3Line,
} from "react-icons/ri";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/theme-dark.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Link } from "react-router-dom";

export const Header = () => {
  const [display, setDisplay] = useState("arrow");

  const [showSubMenu, setShowSubMenu] = useState(false);
  const handleMenuToggle = () => {
    setShowSubMenu((prev) => !prev);
  };

  return (
    <header className="h-[7vh] md:h-[10vh] border-b border-secondary-100 p-8 flex items-center justify-end">
      <nav className="flex items-center gap-2">
        {/* MENU NOTIFICACIONES */}
        <Menu
          menuButton={
            <MenuButton className="relative p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-300">
              <RiNotification3Line />
              <span className="absolute -top-0.5 right-0 bg-primary py-0.5 px-[5px] box-content text-white rounded-full text-[8px] font-bold">
                2
              </span>
            </MenuButton>
          }
          transition
          theming="dark"
          arrow={display === "arrow"}
        >
          <h1 className="text-gray-300 text-center font-medium">
            Notificaciones (2)
          </h1>
          <hr className="my-6 mx-6 border-gray-500" />
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/"
              className="text-gray-300 flex flex-1 items-center gap-4 py-2 px-4 rounded-lg"
            >
              <img
                src="/Democratik-Icon2.png"
                className="w-8 h-8 p-1 bg-white  rounded-full"
              />
              <div className="text-sm flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span>Usuario</span>{" "}
                  <span className="text-[8px]">21/10/2022</span>
                </div>
                <p className="text-gray-500 text-xs">
                  Lorem ipsum dolor sit amet...
                </p>
              </div>
            </Link>
          </MenuItem>
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/"
              className="text-gray-300 flex flex-1 items-center gap-4 py-2 px-4 transition-colors rounded-lg"
            >
              <RiThumbUpLine className="p-2 bg-blue-200 text-blue-700 box-content rounded-full" />
              <div className="text-sm flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span>Nuevo like</span>{" "}
                  <span className="text-[8px]">21/10/2022</span>
                </div>
                <p className="text-gray-500 text-xs">
                  A Jorge Trejo le gusta tu pub...
                </p>
              </div>
            </Link>
          </MenuItem>
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/"
              className="text-gray-300 flex flex-1 items-center gap-4 py-2 px-4 transition-colors rounded-lg"
            >
              <RiChat3Line className="p-2 bg-yellow-200 text-yellow-700 box-content rounded-full" />
              <div className="text-sm flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span>Nuevo comentario</span>{" "}
                  <span className="text-[8px]">21/10/2022</span>
                </div>
                <p className="text-gray-500 text-xs">
                  Jorge Trejo ha comentado tu...
                </p>
              </div>
            </Link>
          </MenuItem>
          <hr className="my-6 mx-6 border-gray-500" />
          <MenuItem className="p-0 hover:bg-transparent flex justify-center cursor-default">
            <Link
              to="/"
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              Todas las notificaciones
            </Link>
          </MenuItem>
        </Menu>

        {/* MENU USUARIO */}
        <Menu
          menuButton={
            <MenuButton
              onClick={handleMenuToggle}
              className="flex items-center gap-x-2 p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-500"
            >
               <img
                src="/Democratik-Icon2.png"
                className="w-6 h-6 p-1 bg-white  rounded-full"
              />
              <span>Usuario</span>
              <RiArrowDownSLine
                className={`transition-transform duration-300 ${
                  showSubMenu ? "rotate-120" : "-rotate-90"
                } `}
              />
            </MenuButton>
          }
          transition
          theming="dark"
          arrow={display === "arrow"}
        >
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/admin/perfil"
              className="rounded-lg transition-colors text-gray-300 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
               <img
                src="/Democratik-Icon2.png"
                className="w-8 h-8 p-1 bg-white  rounded-full"
              />
              <div className="flex flex-col text-sm">
                <span className="text-sm">Usuario</span>
                <span className="text-xs text-gray-500">DK@gmail.com</span>
              </div>
            </Link>
          </MenuItem>
          <hr className="my-3 mx-3 border-gray-500" />
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/admin/perfil"
              className="rounded-lg transition-colors text-gray-300 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <RiSettings3Line /> Configuración
            </Link>
          </MenuItem>
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/cerrar-sesion"
              className="rounded-lg transition-colors text-gray-300 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <RiLogoutCircleRLine /> Cerrar sesión
            </Link>
          </MenuItem>
        </Menu>
      </nav>
    </header>
  );
};

