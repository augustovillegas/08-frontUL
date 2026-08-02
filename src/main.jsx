import React from "react";
import ReactDOM from "react-dom/client";
import { WebRouter } from "./routers";
import { AuthProvider } from "./context/AuthContext";
import "./tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <WebRouter />
    </AuthProvider>
  </React.StrictMode>
);
