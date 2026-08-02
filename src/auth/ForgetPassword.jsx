import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RiMailFill } from "react-icons/ri";
import { toast } from "react-toastify";
import apiClient from "../config/api";

export const ForgetPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { correo: "" },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await apiClient.post("/api/auth/olvide-password", { correo: data.correo });
      setSent(true);
      toast.success("Instrucciones enviadas al correo");
    } catch (error) {
      const msg = error.response?.data?.msg || "Error al enviar las instrucciones";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-secondary-100 w-full max-w-[440px] p-6 sm:p-8 md:p-10 rounded-xl">
      <h1 className="text-2xl sm:text-3xl text-center uppercase font-bold text-white mb-6 sm:mb-8">
        Recuperar contraseña
      </h1>

      {sent ? (
        <p className="text-center text-gray-300 mb-6">
          Revisá tu correo y seguí las instrucciones para restablecer tu contraseña.
        </p>
      ) : (
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
            {errors.correo && <p className="text-red-500 text-xs mt-1">{errors.correo.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary uppercase font-bold text-xs sm:text-sm w-full py-3 px-4 rounded-lg hover:text-black transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Enviando..." : "Enviar instrucciones"}
          </button>
        </form>
      )}

      <div className="flex flex-col items-center gap-4 text-xs sm:text-sm">
        <span className="flex items-center gap-2">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-primary hover:text-primary/80 transition-colors">
            Ingresa
          </Link>
        </span>
      </div>
    </div>
  );
};
