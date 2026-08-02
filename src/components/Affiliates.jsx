import React, { useState, useEffect } from "react";
import apiClient from "../config/api";
import DropDownActions from "../utils/DropDownActions";
import { FaSearch } from "react-icons/fa";
import { DownloadAffiliates } from "../utils/DownloadAffiliates";
import { PaginationControls } from "./PaginationControls";
import { formatDate } from "../utils/formatDate";

export const Affiliates = () => {
  const [afiliados, setAfiliados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(0);
  const [totalAfiliados, setTotalAfiliados] = useState(0);
  const [buscarAfiliado, setBuscarAfiliado] = useState("");

  const limite = 5;

  useEffect(() => {
    const obtenerAfiliados = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(
          `/api/afiliados?limite=${limite}&desde=${pagina * limite}`
        );
        const { afiliados, total } = response.data;
        setAfiliados(afiliados);
        setTotalAfiliados(total);
      } catch {
        setError("Error al obtener los afiliados");
      } finally {
        setLoading(false);
      }
    };
    obtenerAfiliados();
  }, [pagina]);

  const filteredAffiliados = afiliados.filter((afiliado) => {
    const term = buscarAfiliado.toLowerCase();
    return (
      (afiliado.nombre     || "").toLowerCase().includes(term) ||
      (afiliado.departamento || "").toLowerCase().includes(term) ||
      (afiliado.provincia   || "").toLowerCase().includes(term) ||
      (afiliado.celular     || "").includes(term) ||
      formatDate(afiliado.fecha).includes(term)
    );
  });

  const totalPaginas = Math.ceil(totalAfiliados / limite);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 md:-mt-4">
        <h1 className="text-3xl text-gray-200">Panel de afiliados</h1>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between mb-4">
        <div className="w-full md:w-auto flex justify-end mb-4 md:mb-0">
          <DownloadAffiliates />
        </div>
        <div className="w-full md:w-64 relative flex items-center rounded-full overflow-hidden bg-secondary-100">
          <div className="pl-4 pr-2">
            <FaSearch className="text-green-color md:text-2xl text-3xl" />
          </div>
          <input
            type="text"
            placeholder="Búsqueda"
            className="bg-secondary-100 text-gray-200 placeholder:italic placeholder:text-lg md:placeholder:text-base rounded-full focus-input px-2 py-2 md:py-1.5 md:px-3 w-full sm:text-lg"
            value={buscarAfiliado}
            onChange={(e) => setBuscarAfiliado(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-secondary-100 px-8 py-5 rounded-xl">
        <div className="hidden md:grid grid-cols-5 gap-4 mb-2 p-2">
          <h5>Acción</h5>
          <h5>Fecha</h5>
          <h5>Nombre</h5>
          <h5>Ciudad</h5>
          <h5>Contacto</h5>
        </div>

        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-2 bg-secondary-900 rounded-md animate-pulse"
            >
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="h-5 bg-secondary-100 rounded" />
              ))}
            </div>
          ))}
        {error && <p className="text-red-400 py-4">{error}</p>}

        {filteredAffiliados.map((afiliado) => (
          <div
            key={afiliado._id}
            className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center mb-4 bg-secondary-900 p-2 rounded-md"
          >
            <div className="flex items-center justify-end md:justify-start">
              <DropDownActions />
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold">Fecha</h5>
              <p>{formatDate(afiliado.fecha)}</p>
            </div>
            <div>
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

      <PaginationControls
        pagina={pagina}
        totalPaginas={totalPaginas}
        onPageChange={setPagina}
      />
    </div>
  );
};
