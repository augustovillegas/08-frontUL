import React, { useState } from "react";
import {
  RiMailFill,
  RiLockFill,
  RiEyeFill,
  RiEyeOffFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-secondary-100 w-full max-w-[440px] p-6 sm:p-8 md:p-10 rounded-xl">
      <h1 className="text-2xl sm:text-3xl text-center uppercase text-white font-bold mb-6 sm:mb-8">
        Iniciar Sesion
      </h1>
      <form className="mb-6 sm:mb-8">
        <button className="flex items-center justify-center py-3 px-4 gap-2 bg-secondary-900 w-full rounded-full mb-6 sm:mb-8 text-gray-100 text-xs sm:text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icons w-4 h-4"
          >
            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
          </svg>
          Ingresa con google
        </button>
        <div className="relative mb-4">
          <RiMailFill className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            type="email"
            className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus-input text-sm sm:text-base"
            placeholder="Correo electronico"
          />
        </div>
        <div className="relative mb-4">
          <RiLockFill className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            type={showPassword ? "text" : "password"}
            className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus-input text-sm sm:text-base"
            placeholder="Contrasena"
          />
          {showPassword ? (
            <RiEyeOffFill
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"
            />
          ) : (
            <RiEyeFill
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"
            />
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-primary uppercase font-bold text-xs sm:text-sm w-full py-3 px-4 rounded-lg hover:text-black transition-colors"
          >
            Ingresar
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-4 items-center text-xs sm:text-sm">
        <Link to="/login/olvide-password" className="hover:text-primary transition-colors">
          Olvidaste tu contrasena?
        </Link>
        <span className="flex items-center gap-2">
          No tienes cuenta?
          <Link
            to="/login/registro"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Registrarme
          </Link>
        </span>
      </div>
    </div>
  );
};
