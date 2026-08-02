import React from "react";
import PropTypes from "prop-types";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { BiSolidArrowToLeft, BiSolidArrowToRight } from "react-icons/bi";

export const PaginationControls = ({ pagina, totalPaginas, onPageChange }) => (
  <div className="flex justify-center items-center mt-2 space-x-5">
    <button
      onClick={() => onPageChange(0)}
      disabled={pagina === 0}
      className="bg-green-color/90 hover:bg-green-color p-1 rounded-full text-gray-200"
    >
      <BiSolidArrowToLeft className="text-black" />
    </button>
    <button
      onClick={() => onPageChange(pagina - 1)}
      disabled={pagina === 0}
      className="bg-green-color/90 hover:bg-green-color p-1 rounded-full text-gray-200"
    >
      <IoMdArrowDropleft className="text-black font-bold text-2xl md:text-xl" />
    </button>
    <span className="text-gray-300">
      Pág. {pagina + 1} de {totalPaginas}
    </span>
    <button
      onClick={() => onPageChange(pagina + 1)}
      disabled={pagina >= totalPaginas - 1}
      className="bg-green-color/90 hover:bg-green-color p-1 rounded-full text-gray-200"
    >
      <IoMdArrowDropright className="text-black font-bold text-2xl md:text-xl" />
    </button>
    <button
      onClick={() => onPageChange(totalPaginas - 1)}
      disabled={pagina >= totalPaginas - 1}
      className="bg-green-color/90 hover:bg-green-color p-1 rounded-full text-gray-200"
    >
      <BiSolidArrowToRight className="text-black" />
    </button>
  </div>
);

PaginationControls.propTypes = {
  pagina: PropTypes.number.isRequired,
  totalPaginas: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
