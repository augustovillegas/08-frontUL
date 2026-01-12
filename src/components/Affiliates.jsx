import React, { useState, useEffect } from "react";
import axios from "axios"; // Importamos Axios
import DropDownActions from "../utils/DropDownActions";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { BiSolidArrowToLeft, BiSolidArrowToRight } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { DownloadAffiliates } from "../utils/DownloadAffiliates";
import { buildApiUrl } from "../config/api";
import { ApiLoader } from "./ApiLoader";

export const Affiliates = () => {
  const [afiliados, setAfiliados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(0); // Estado para la paginación
  const [totalAfiliados, setTotalAfiliados] = useState(0); // Total de mensajes
  const [buscarAfiliado, setBuscarAfiliado] = useState(""); // Nuevo estado para búsqueda

  const limite = 5; // Mostrar 5 afiliados por página

  // Efecto para obtener los afiliados según la página
  useEffect(() => {
    const obtenerAfiliados = async () => {
      setLoading(true);
      try {
        // Petición GET al backend con paginación (limite y pagina)
        const response = await axios.get(
          buildApiUrl(
            `/api/afiliados?limite=${limite}&desde=${pagina * limite}`
          )
        );
        const { afiliados, total } = response.data;

        setAfiliados(afiliados); // Guardamos los afiliados
        setTotalAfiliados(total); // Guardamos el total de Afiliados
      } catch (error) {
        console.error("Error al obtener los afiliados:", error);
        setError("Error al obtener los afiliados");
      } finally {
        setLoading(false);
      }
    };

    obtenerAfiliados();
  }, [pagina]); // Volver a ejecutar cuando cambie la página

  // Filtrar afiliados según el término de búsqueda en múltiples campos
  const filteredAffiliados = afiliados.filter((afiliado) => {
    const searchTermLower = buscarAfiliado.toLowerCase(); // Convertir el término de búsqueda a minúsculas para comparación

    return (
      // Filtrar por nombre
      afiliado.nombre.toLowerCase().includes(searchTermLower) ||
      // Filtrar por departamento
      afiliado.departamento.toLowerCase().includes(searchTermLower) ||
      // Filtrar por contacto (celular)
      afiliado.celular.includes(searchTermLower) ||
      // Filtrar por fecha
      new Date(afiliado.fecha)
        .toLocaleDateString("es-ES", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })
        .includes(searchTermLower)
    );
  });

  const totalPaginas = Math.ceil(totalAfiliados / limite); // Número total de páginas

  return (
    <div>
      <div className="flex items-center justify-between mb-4 md:-mt-4">
        <h1 className="text-3xl text-gray-200">Panel de afiliados</h1>
      </div>

      {/* Contenedor responsivo de búsqueda y descarga */}
      <div className="flex flex-col md:flex-row md:justify-between mb-4">
        <div className="w-full md:w-auto flex justify-end mb-4 md:mb-0">
          <DownloadAffiliates />
        </div>

        <div className="w-full md:w-64 relative flex items-center rounded-full overflow-hidden bg-secondary-100">
          <div className="pl-4 pr-2">
            <FaSearch className="text-green-color md:text-2xl text-3xl" />
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Búsqueda"
              className="bg-secondary-100 text-gray-200 placeholder:italic placeholder:text-lg md:placeholder:text-base rounded-full focus-input px-2 py-2 md:py-1.5 md:px-3 w-full sm:text-lg"
              value={buscarAfiliado}
              onChange={(e) => setBuscarAfiliado(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-secondary-100 px-8 py-5 rounded-xl">
        {/* Encabezado */}
        <div className="hidden md:grid grid-cols-5 gap-4 mb-2 p-2">
          <h5>Acción</h5>
          <h5>Fecha</h5>
          <h5>Nombre</h5>
          <h5>Ciudad</h5>
          <h5>Contacto</h5>
        </div>

        {loading && <ApiLoader className="py-6" />}
        {/* Listado de afiliados filtrados */}
        {filteredAffiliados.map((afiliado) => (
          <div
            key={afiliado._id}
            className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center mb-4 bg-secondary-900 p-2 rounded-md"
          >
            <div className="">
              <div className="flex items-center justify-end md:justify-start">
                <DropDownActions />
              </div>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold">Fecha</h5>
              <p>
                {new Date(afiliado.fecha).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="">
              <h5 className="md:hidden text-white font-bold">Nombre</h5>
              <p>{afiliado.nombre}</p>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold">Ciudad</h5>
              <p>{afiliado.departamento}</p>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold">Contacto</h5>
              <p>{afiliado.celular}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-center items-center mt-2 space-x-5">
        {/* Botón para ir a la primera página */}
        <button
          onClick={() => setPagina(0)}
          disabled={pagina === 0}
          className="bg-green-color/90 hover:bg-green-color p-1 rounded-full text-gray-200"
        >
          {<BiSolidArrowToLeft className="text-black" />}{" "}
          {/* Doble flecha para indicar primera página */}
        </button>

        {/* Botón para retroceder una página */}
        <button
          onClick={() => setPagina(pagina > 0 ? pagina - 1 : 0)}
          disabled={pagina === 0}
          className="bg-green-color/90 hover:bg-green-color p-1 rounded-full text-gray-200"
        >
          <IoMdArrowDropleft className="text-black font-bold text-2xl md:text-xl" />
        </button>

        {/* Indicador de la página actual */}
        <span className="text-gray-300">
          Pág. {pagina + 1} de {totalPaginas}
        </span>

        {/* Botón para avanzar una página */}
        <button
          onClick={() =>
            setPagina(pagina < totalPaginas - 1 ? pagina + 1 : pagina)
          }
          disabled={pagina >= totalPaginas - 1}
          className="bg-green-color/90 hover:bg-green-color p-1 rounded-full text-gray-200"
        >
          <IoMdArrowDropright className="text-black font-bold text-2xl md:text-xl" />
        </button>

        {/* Botón para ir a la última página */}
        <button
          onClick={() => setPagina(totalPaginas - 1)}
          disabled={pagina >= totalPaginas - 1}
          className="bg-green-color/90 hover:bg-green-color p-1 rounded-full text-gray-200"
        >
          {<BiSolidArrowToRight className="text-black" />}{" "}
          {/* Doble flecha para indicar última página */}
        </button>
      </div>
    </div>
  );
};

