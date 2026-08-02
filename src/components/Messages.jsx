import React, { useState, useEffect } from "react";
import apiClient from "../config/api";
import { AiOutlineEye } from "react-icons/ai";
import { MessageCard } from "./MessageCard";
import { PaginationControls } from "./PaginationControls";
import { formatDate } from "../utils/formatDate";

export const Messages = () => {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(0);
  const [totalMensajes, setTotalMensajes] = useState(0);
  const [mensajeExpandido, setMensajeExpandido] = useState(null);

  const limite = 4;

  useEffect(() => {
    const obtenerMensajes = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(
          `/api/consultas?limite=${limite}&desde=${pagina * limite}`
        );
        const { mensajes, total } = response.data;
        setMensajes(mensajes);
        setTotalMensajes(total);
      } catch {
        setError("Error al obtener los mensajes");
      } finally {
        setLoading(false);
      }
    };
    obtenerMensajes();
  }, [pagina]);

  const totalPaginas = Math.ceil(totalMensajes / limite);

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-5 md:-mt-4">
        <h1 className="text-3xl text-white">Mensajes Recibidos</h1>
      </div>

      <div className="bg-secondary-100 px-4 py-5 rounded-xl">
        <div className="hidden md:grid grid-cols-[1fr,2fr,3fr,3fr] gap-4 mb-2 p-2">
          <h5>Fecha</h5>
          <h5>Nombre</h5>
          <h5>Email</h5>
          <h5>Mensaje</h5>
        </div>

        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-2 bg-secondary-900 rounded-md animate-pulse"
            >
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-5 bg-secondary-100 rounded" />
              ))}
            </div>
          ))}
        {error && <p className="text-red-400 py-4">{error}</p>}

        {mensajes.map((mensaje) => (
          <div
            key={mensaje._id}
            className="grid grid-cols-1 md:grid-cols-[1fr,2fr,3fr,3fr] gap-2 items-start mb-4 bg-secondary-900 p-2 rounded-md"
          >
            {mensajeExpandido !== mensaje._id && (
              <>
                <div>
                  <h5 className="md:hidden text-white font-bold">Fecha</h5>
                  <p>{formatDate(mensaje.fecha)}</p>
                </div>
                <div>
                  <h5 className="md:hidden text-white font-bold">Nombre</h5>
                  <p>{mensaje.nombre}</p>
                </div>
                <div>
                  <h5 className="md:hidden text-white font-bold">Email</h5>
                  <p>{mensaje.correo}</p>
                </div>
                <div>
                  <h5 className="md:hidden text-white font-bold">Mensaje</h5>
                  <p>
                    {mensaje.mensaje.slice(0, 35)}...
                    <button
                      onClick={() =>
                        setMensajeExpandido(
                          mensajeExpandido === mensaje._id ? null : mensaje._id
                        )
                      }
                      className="text-blue-500 ml-2"
                    >
                      Ver <AiOutlineEye className="inline" />
                    </button>
                  </p>
                </div>
              </>
            )}

            {mensajeExpandido === mensaje._id && (
              <div className="col-span-4">
                <MessageCard
                  mensaje={mensaje}
                  onClose={() => setMensajeExpandido(null)}
                />
              </div>
            )}
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
