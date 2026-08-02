import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RiMailFill, RiLockFill, RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { toast } from "react-toastify";
import apiClient from "../config/api";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/Spinner";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { correo: "", password: "" },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await apiClient.post("/api/auth/login", {
        correo: data.correo,
        password: data.password,
      });
      const { token, usuario } = response.data;
      login(token, usuario);
      toast.success("Sesión iniciada");
      navigate(from, { replace: true });
    } catch (error) {
      const msg = error.response?.data?.msg || "Credenciales incorrectas";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-secondary-100 w-full max-w-[440px] p-6 sm:p-8 md:p-10 rounded-xl">
      <h1 className="text-2xl sm:text-3xl text-center uppercase text-white font-bold mb-6 sm:mb-8">
        Iniciar Sesión
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 sm:mb-8">
        <div className="relative mb-4">
          <RiMailFill className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            type="email"
            className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus-input text-sm sm:text-base"
            placeholder="Correo electrónico"
            {...register("correo", {
              required: "El correo es obligatorio",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Correo inválido" },
            })}
          />
          {errors.correo && (
            <p className="text-red-500 text-xs mt-1">{errors.correo.message}</p>
          )}
        </div>
        <div className="relative mb-4">
          <RiLockFill className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            type={showPassword ? "text" : "password"}
            className="py-3 pl-8 pr-10 bg-secondary-900 w-full outline-none rounded-lg focus-input text-sm sm:text-base"
            placeholder="Contraseña"
            {...register("password", { required: "La contraseña es obligatoria" })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute top-1/2 -translate-y-1/2 right-2"
          >
            {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary uppercase font-bold text-xs sm:text-sm w-full py-3 px-4 rounded-lg hover:text-black transition-colors disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner size="sm" />
              Ingresando...
            </span>
          ) : "Ingresar"}
        </button>
      </form>
      <div className="flex justify-center text-xs sm:text-sm">
        <Link to="/login/olvide-password" className="hover:text-primary transition-colors">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  );
};
