import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { RiLockFill, RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { toast } from "react-toastify";
import apiClient from "../config/api";
import { Spinner } from "../components/Spinner";

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { password: "", confirmarPassword: "" },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await apiClient.post("/api/auth/restablecer-password", {
        token,
        password: data.password,
      });
      setDone(true);
      toast.success("Contraseña actualizada");
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    } catch (error) {
      const msg = error.response?.data?.msg || "Error al restablecer la contraseña";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="bg-secondary-100 w-full max-w-[440px] p-6 sm:p-8 md:p-10 rounded-xl">
        <p className="text-center text-red-400">Enlace inválido o expirado.</p>
        <div className="mt-4 flex justify-center">
          <Link to="/login/olvide-password" className="text-primary hover:text-primary/80 transition-colors text-sm">
            Solicitar nuevo enlace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary-100 w-full max-w-[440px] p-6 sm:p-8 md:p-10 rounded-xl">
      <h1 className="text-2xl sm:text-3xl text-center uppercase font-bold text-white mb-6 sm:mb-8">
        Nueva contraseña
      </h1>

      {done ? (
        <p className="text-center text-gray-300 mb-6">
          Contraseña actualizada. Redirigiendo al login...
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 sm:mb-8">
          <div className="relative mb-4">
            <RiLockFill className="absolute top-1/2 -translate-y-1/2 left-2" />
            <input
              type={showPassword ? "text" : "password"}
              className="py-3 pl-8 pr-10 bg-secondary-900 w-full outline-none rounded-lg focus-input text-sm sm:text-base"
              placeholder="Nueva contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
            />
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute top-1/2 -translate-y-1/2 right-2">
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div className="relative mb-4">
            <RiLockFill className="absolute top-1/2 -translate-y-1/2 left-2" />
            <input
              type={showPassword ? "text" : "password"}
              className="py-3 pl-8 pr-10 bg-secondary-900 w-full outline-none rounded-lg focus-input text-sm sm:text-base"
              placeholder="Confirmar contraseña"
              {...register("confirmarPassword", {
                required: "Confirmá tu contraseña",
                validate: (v) => v === password || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmarPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmarPassword.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary uppercase font-bold text-xs sm:text-sm w-full py-3 px-4 rounded-lg hover:text-black transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner size="sm" />
                Guardando...
              </span>
            ) : "Guardar contraseña"}
          </button>
        </form>
      )}

      <div className="flex justify-center text-xs sm:text-sm">
        <Link to="/login" className="text-primary hover:text-primary/80 transition-colors">
          Volver al login
        </Link>
      </div>
    </div>
  );
};
