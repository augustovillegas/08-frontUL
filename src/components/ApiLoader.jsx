import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "./Spinner";

export const ApiLoader = ({
  message = "Espera mientras se conecta el servidor...",
  className = "",
}) => (
  <div className={`flex flex-col items-center gap-3 ${className}`}>
    <Spinner size="md" />
    <p className="text-gray-300 text-center max-w-md">{message}</p>
  </div>
);

ApiLoader.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};
