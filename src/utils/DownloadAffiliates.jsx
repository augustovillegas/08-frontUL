import React, { useState } from "react";
import axios from "axios";
import { TiDownloadOutline } from "react-icons/ti";
import { buildApiUrl } from "../config/api";
import { ApiLoader } from "../components/ApiLoader";

export const DownloadAffiliates = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      // Petición al backend para descargar el archivo Excel
      const response = await axios.get(buildApiUrl("/api/export"), {
        responseType: "blob", // Asegurarse de recibir el archivo como Blob
      });

      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ListadoDeAfiliados.xlsx"); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al descargar los afiliados:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center text-white bg-green-color/90 hover:bg-green-color p-2 rounded-md"
      >
        <TiDownloadOutline className="text-2xl mr-2" />
        Descargar
      </button>
      {isDownloading && (
        <ApiLoader
          className="items-end text-right"
          message="Espera mientras se conecta el servidor y se prepara la descarga..."
        />
      )}
    </div>
  );
};
