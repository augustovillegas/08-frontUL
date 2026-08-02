import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import { App } from "../App";
import { Form } from "../components/Form";
import { Home } from "../admin/Home";
import { Help } from "../components/Help";
import { NotFound } from "../helpers/NotFound";
import { LayoutAdmin } from "../layout/LayoutAdmin";
import { LayoutAuth } from "../layout/LayoutAuth";
import { Login } from "../auth/Login";
import { ForgetPassword } from "../auth/ForgetPassword";
import { ResetPassword } from "../auth/ResetPassword";
import { Profile } from "../admin/Profile";
import { Messages } from "../components/Messages";
import { Analitycs } from "../components/Analitycs";
import { Affiliates } from "../components/Affiliates";
import { SocialStatistic } from "../components/SocialStatistic";
import { Followers } from "../components/Followers";
import ScrollToTop from "react-scroll-to-top";
import { FaAngleDoubleUp } from "react-icons/fa";
import { Mailing } from "../components/Mailing";
import { PrivateRoute } from "./PrivateRoute";

const RootLayout = () => (
  <>
    <ScrollRestoration getKey={(location) => location.pathname} />
    <ScrollToTop
      smooth
      component={<FaAngleDoubleUp className="text-black" />}
      style={{
        backgroundColor: "#27AE60",
        borderRadius: "50%",
        right: "1rem",
        bottom: "5rem",
        zIndex: 50,
      }}
      className="flex items-center justify-center"
    />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      {
        path: "/login",
        element: <LayoutAuth />,
        children: [
          { index: true, element: <Login /> },
          { path: "olvide-password", element: <ForgetPassword /> },
          { path: "restablecer-password", element: <ResetPassword /> },
        ],
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute>
            <LayoutAdmin />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <Home /> },
          { path: "perfil", element: <Profile /> },
          { path: "mensajes", element: <Messages /> },
          { path: "analiticas", element: <Analitycs /> },
          { path: "afiliados", element: <Affiliates /> },
          { path: "mailing", element: <Mailing /> },
          { path: "social-statistic", element: <SocialStatistic /> },
          { path: "seguidores", element: <Followers /> },
        ],
      },
      { path: "/afiliarme", element: <Form /> },
      { path: "/ayuda", element: <Help /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export const WebRouter = () => <RouterProvider router={router} />;
