import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../utils/formatDate";

export const MessageCard = ({ mensaje, onClose }) => (
  <div className="col-span-4 bg-secondary-700 p-4 mt-1 rounded-md">
    <p><strong>Fecha:</strong> {formatDate(mensaje.fecha)}</p>
    <p className="mt-2"><strong>Nombre:</strong> {mensaje.nombre}</p>
    <p className="mt-2"><strong>Email:</strong> {mensaje.correo}</p>
    <p className="mt-2"><strong>Mensaje:</strong> {mensaje.mensaje}</p>
    <button
      onClick={onClose}
      className="mt-3 bg-blue-500 text-white py-1 px-4 rounded-md"
    >
      Cerrar
    </button>
  </div>
);

MessageCard.propTypes = {
  mensaje: PropTypes.shape({
    fecha: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    correo: PropTypes.string.isRequired,
    mensaje: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
