import React from "react";

export const ApiLoader = ({
  message = "Espera mientras se conecta el servidor...",
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <span className="h-10 w-10 rounded-full border-4 border-secondary-100 border-t-green-color animate-spin" />
      <p className="text-gray-300 text-center max-w-md">{message}</p>
    </div>
  );
};
