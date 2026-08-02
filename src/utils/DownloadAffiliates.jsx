import React, { useState } from "react";
import PropTypes from "prop-types";
import apiClient from "../config/api";
import { buildApiUrl } from "../config/api";
import { TiDownloadOutline } from "react-icons/ti";
import { Spinner } from "../components/Spinner";

export const DownloadAffiliates = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setError(null);
    try {
      // Obtiene todos los afiliados (sin paginación)
      const response = await apiClient.get(
        buildApiUrl("/api/afiliados?limite=10000&desde=0")
      );
      const afiliados = response.data?.afiliados ?? [];

      // Carga ExcelJS solo cuando se necesita (code splitting)
      const { generateAffiliatesExcel } = await import("./generateExcel");
      const buffer = await generateAffiliatesExcel(afiliados);

      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const fecha = new Date().toLocaleDateString("es-ES", {
        day: "2-digit", month: "2-digit", year: "numeric",
      }).replace(/\//g, "-");
      link.href = url;
      link.download = `Democratik_Afiliados_${fecha}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError("No se pudo generar el archivo. Intentá de nuevo.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center gap-2 text-white bg-green-color/90 hover:bg-green-color p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isDownloading ? (
          <>
            <Spinner size="sm" />
            Generando...
          </>
        ) : (
          <>
            <TiDownloadOutline className="text-2xl" />
            Descargar Excel
          </>
        )}
      </button>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

DownloadAffiliates.propTypes = {};
