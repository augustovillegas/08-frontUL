import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/theme-dark.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { RiMore2Fill, RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";

export const Card = ({ icon: IconComponent, mainStat, description, growth, isGrowthPositive, link }) => {

  return (
    <div className="bg-secondary-100 p-8 rounded-xl relative">
      {/* Icono del lado izquierdo */}
      <IconComponent className="text-4xl p-2 box-content rounded-xl absolute top-4 left-4" />

      {/* Menú en el lado derecho */}
      <div className="absolute top-4 right-4">
        <Menu
          menuButton={
            <MenuButton className="flex items-center gap-x-2 p-2 hover:bg-secondary-900 rounded-lg transition-colors duration-500">
              <RiMore2Fill />
            </MenuButton>
          }
          transition
          theming="dark"
          arrow
        >
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to={link} // Link dinámico pasado como prop
              className="rounded-lg transition-colors text-gray-300 flex items-center gap-x-4 p-2 flex-1"
            >
              Ver todos
            </Link>
          </MenuItem>
        </Menu>
      </div>

      {/* Estadística principal y descripción */}
      <div className="flex flex-col items-center justify-center h-40 space-y-2">
        <h1 className="text-4xl text-white font-bold">{mainStat}</h1>
        <p className="text-white text-base">{description}</p>
      </div>

      {/* Indicador de Crecimiento */}
      <div className="flex items-center justify-center space-x-2 mt-4">
        <p
          className={`text-lg font-semibold ${
            isGrowthPositive ? "text-green-500" : "text-red-500"
          } flex items-center`}
        >
          {isGrowthPositive ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
          {growth}%
        </p>
        <p className="text-sm text-gray-400">Crecimiento</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.elementType.isRequired,
  mainStat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  growth: PropTypes.number.isRequired,
  isGrowthPositive: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
};

