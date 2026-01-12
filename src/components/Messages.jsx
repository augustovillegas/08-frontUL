import React, { useState, useEffect } from "react";
import axios from "axios"; // Importamos Axios
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai"; // Icono para ver detalles
import { BiSolidArrowToLeft, BiSolidArrowToRight } from "react-icons/bi";
import { MessageCard } from "./MessageCard"; // Importamos el componente MessageCard
import { buildApiUrl } from "../config/api";
import { ApiLoader } from "./ApiLoader";

export const Messages = () => {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(0); // Estado para la paginación
  const [totalMensajes, setTotalMensajes] = useState(0); // Total de mensajes
  const [mensajeExpandido, setMensajeExpandido] = useState(null); // Estado para mensaje expandido

  const limite = 4; // Mostrar 4 mensajes por página

  // Efecto para obtener los mensajes según la página
  useEffect(() => {
    const obtenerMensajes = async () => {
      setLoading(true);
      try {
        // Petición GET al backend con paginación (limite y pagina)
        const response = await axios.get(
          buildApiUrl(
            `/api/consultas?limite=${limite}&desde=${pagina * limite}`
          )
        );
        const { mensajes, total } = response.data;

        setMensajes(mensajes); // Guardamos los mensajes
        setTotalMensajes(total); // Guardamos el total de mensajes
      } catch (error) {
        console.error("Error al obtener los mensajes:", error);
        setError("Error al obtener los mensajes");
      } finally {
        setLoading(false);
      }
    };

    obtenerMensajes();
  }, [pagina]); // Volver a ejecutar cuando cambie la página

  const totalPaginas = Math.ceil(totalMensajes / limite); // Número total de páginas

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-5 md:-mt-4">
        <h1 className="text-3xl text-white">Mensajes Recibidos</h1>
      </div>

      <div className="bg-secondary-100 px-4 py-5 rounded-xl">
        {loading && <ApiLoader className="py-6" />}
        {/* Encabezado */}
        <div className="hidden md:grid grid-cols-[1fr,2fr,3fr,3fr] gap-4 mb-2 p-2">
          <h5>Fecha</h5>
          <h5>Nombre</h5>
          <h5>Email</h5>
          <h5>Mensaje</h5>
        </div>

        {/* Listado de mensajes */}
        {mensajes.map((mensaje) => (
          <div
            key={mensaje._id} // Suponemos que el ID es _id, ajusta según tu modelo
            className="grid grid-cols-1 md:grid-cols-[1fr,2fr,3fr,3fr] gap-2 items-start mb-4 bg-secondary-900 p-2 rounded-md"
          >
            {/* Mostramos previsualización solo si el mensaje no está expandido */}
            {mensajeExpandido !== mensaje._id && (
              <>
                <div>
                  <h5 className="md:hidden text-white font-bold">Fecha</h5>
                  <p>
                    {new Date(mensaje.fecha).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </p>
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
                    {/* Mostrar previsualización del mensaje */}
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

            {/* Mostrar datos completos en una card si el mensaje está expandido */}
            {mensajeExpandido === mensaje._id && (
              <div className="col-span-4">
                <MessageCard
                  mensaje={mensaje}
                  onClose={() => setMensajeExpandido(null)} // Función para cerrar la card
                />
              </div>
            )}
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

