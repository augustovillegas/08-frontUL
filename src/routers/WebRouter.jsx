import React, { useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { App } from "../App";
import { Form } from "../components/Form";
import { Home } from "../admin/Home";
import { Help } from "../components/Help";
import { NotFound } from "../helpers/NotFound";
import { LayoutAdmin } from "../layout/LayoutAdmin";
import { LayoutAuth } from "../layout/LayoutAuth";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { ForgetPassword } from "../auth/ForgetPassword";
import { Profile } from "../admin/Profile";
import { Messages } from "../components/Messages";
import { Analitycs } from "../components/Analitycs";
import { Affiliates } from "../components/Affiliates";
import { SocialStatistic } from "../components/SocialStatistic";
import { Followers } from "../components/Followers";
import ScrollToTop from "react-scroll-to-top";
import { FaAngleDoubleUp } from "react-icons/fa";
import { Mailing } from "../components/Mailing";

// Componente Wrapper para manejar el scroll al inicio de cada página
const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0); // Desplaza la página al inicio
  }, [location.pathname]); // Solo ejecuta cuando cambia la ruta

  return children;
};

export const WebRouter = () => {
  return (
    <BrowserRouter>
      <Wrapper>
        {/* SCROLL HACIA ARRIBA */}
        <ScrollToTop
          smooth
          component={<FaAngleDoubleUp className="text-black" />}
          style={{
            backgroundColor: "#27AE60", // Personaliza el color
            borderRadius: "50%",
            right: "1rem", // Margen derecho
            bottom: "5rem", // Margen inferior
            zIndex: 50, // Asegura que el botón esté por encima
          }}
          className="flex items-center justify-center"
        />{" "}
        <Routes>
          <Route path="/" element={<App />} />

          <Route path="/login" element={<LayoutAuth />}>
            <Route index element={<Login />} />
            <Route path="registro" element={<Register />} />
            <Route path="olvide-password" element={<ForgetPassword />} />
          </Route>

          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<Home />} />
            <Route path="perfil" element={<Profile />} />
            <Route path="mensajes" element={<Messages />} />
            <Route path="analiticas" element={<Analitycs />} />
            <Route path="afiliados" element={<Affiliates />} />
            <Route path="mailing" element={<Mailing />} />
            <Route path="social-statistic" element={<SocialStatistic />} />
            <Route path="seguidores" element={<Followers />} />
          </Route>

          <Route path="/afiliarme" element={<Form />} />
          <Route path="/ayuda" element={<Help />} />
          <Route path="*" element={<App />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};
