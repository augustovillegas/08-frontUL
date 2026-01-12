import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./Card";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineChartBar,
  HiOutlineChartPie,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { AiFillTikTok } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { buildApiUrl } from "../config/api";
import { ApiLoader } from "./ApiLoader";


export const Analitycs = () => {
  const [total, setTotal] = useState(0); // Estado para el número de afiliados
  const [totalMensajes, setTotalMensajes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para obtener los mensajes según la página
  useEffect(() => {
    const totalAfiliados = async () => {
      setLoading(true);
      try {
        // Peticion GET al backend para obtener metricas
        const [afiliadosResponse, mensajesResponse] = await Promise.all([
          axios.get(buildApiUrl("/api/afiliados")),
          axios.get(buildApiUrl("/api/consultas")),
        ]);
        const { total: totalAfiliados = 0 } = afiliadosResponse.data || {};
        const { total: totalConsultas = 0 } = mensajesResponse.data || {};

        setTotal(totalAfiliados); // Guardamos el numero de afiliados
        setTotalMensajes(totalConsultas);
      } catch (error) {
        console.error("Error al obtener los afiliados:", error);
        setError("Error al obtener los afiliados");
      } finally {
        setLoading(false);
      }
    };

    totalAfiliados();
  }, []); 


  const consultasPorAfiliado =
    total > 0 ? (totalMensajes / total).toFixed(2) : "0.00";
  const afiliadosPorConsulta =
    totalMensajes > 0 ? (total / totalMensajes).toFixed(2) : "0.00";
  const consultasCada100 =
    total > 0 ? ((totalMensajes / total) * 100).toFixed(1) : "0.0";
  return (
    <div>
      <div className="flex items-center justify-between mb-5 md:-mt-4">
        <h1 className="text-3xl text-gray-200">Metricas</h1>
      </div>

      <div className="grid grid-cols-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-5">
        {loading ? (
          <div className="col-span-full bg-secondary-100 rounded-xl p-8">
            <ApiLoader />
          </div>
        ) : (
          <>
            <div>
              {/* CARD */}
              <Card
                icon={HiOutlineUserGroup}
                mainStat={total}
                description="Afiliados totales"
                growth={5.2}
                isGrowthPositive={true}
                link="/admin/perfil"
              />
            </div>

            <div>
              {/* CARD */}
              <Card
                icon={AiFillTikTok}
                mainStat="27,125"
                description="Seguidores totales"
                growth={1.2}
                isGrowthPositive={false}
                link="/admin/perfil"
              />
            </div>

            <div>
              {/* CARD */}
              <Card
                icon={FaInstagram}
                mainStat="11,332"
                description="Seguidores totales"
                growth={3.7}
                isGrowthPositive={true}
                link="/admin/perfil"
              />
            </div>

            <div>
              {/* CARD */}
              <Card
                icon={FaFacebook}
                mainStat="15,232"
                description="Seguidores totales"
                growth={8.4}
                isGrowthPositive={true}
                link="/admin/perfil"
              />
            </div>

            <div>
              {/* CARD */}
              <Card
                icon={HiOutlineChatBubbleLeftRight}
                mainStat={totalMensajes}
                description="Mensajes recibidos"
                growth={2.4}
                isGrowthPositive={true}
                link="/admin/perfil"
              />
            </div>

            <div>
              {/* CARD */}
              <Card
                icon={HiOutlineChartBar}
                mainStat={consultasPorAfiliado}
                description="Consultas por afiliado"
                growth={1.1}
                isGrowthPositive={true}
                link="/admin/perfil"
              />
            </div>

            <div>
              {/* CARD */}
              <Card
                icon={HiOutlineChartPie}
                mainStat={afiliadosPorConsulta}
                description="Afiliados por consulta"
                growth={0.8}
                isGrowthPositive={true}
                link="/admin/perfil"
              />
            </div>

            <div>
              {/* CARD */}
              <Card
                icon={HiOutlineChartBar}
                mainStat={`${consultasCada100}%`}
                description="Consultas cada 100 afiliados"
                growth={0.6}
                isGrowthPositive={true}
                link="/admin/perfil"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

