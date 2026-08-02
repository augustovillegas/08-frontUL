import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RiMailFill, RiLockFill, RiEyeFill, RiEyeOffFill, RiUserLine } from "react-icons/ri";
import { toast } from "react-toastify";
import apiClient from "../config/api";
import { useAuth } from "../context/AuthContext";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { nombre: "", apellido: "", correo: "", password: "", confirmarPassword: "" },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // El backend une nombre + apellido en un solo campo "nombre"
      await apiClient.post("/api/users/", {
        nombre: `${data.nombre} ${data.apellido}`.trim(),
        correo: data.correo,
        password: data.password,
        rol: "USER_ROLE",
      });
      // POST /api/users/ no devuelve token — hacemos login automático
      const loginRes = await apiClient.post("/api/auth/login", {
        correo: data.correo,
        password: data.password,
      });
      const { token, usuario } = loginRes.data;
      login(token, usuario);
      toast.success("Cuenta creada con éxito");
      navigate("/admin", { replace: true });
    } catch (error) {
      const msg = error.response?.data?.msg || "Error al crear la cuenta";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-secondary-100 w-full max-w-[440px] p-6 sm:p-8 md:p-10 rounded-xl">
      <h1 className="text-2xl sm:text-3xl text-center uppercase text-white font-bold tracking-[3px] mb-6 sm:mb-8">
        Crear cuenta
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 sm:mb-8">
        <div className="relative mb-4">
          <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            type="text"
            className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus-input text-sm sm:text-base"
            placeholder="Nombre(s)"
            {...register("nombre", { required: "El nombre es obligatorio" })}
          />
          {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
        </div>
        <div className="relative mb-4">
          <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            type="text"
            className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus-input text-sm sm:text-base"
            placeholder="Apellido(s)"
            {...register("apellido", { required: "El apellido es obligatorio" })}
          />
          {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido.message}</p>}
        </div>
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
        <div className="relative mb-4">
          <RiLockFill className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            type={showPassword ? "text" : "password"}
            className="py-3 pl-8 pr-10 bg-secondary-900 w-full outline-none rounded-lg focus-input text-sm sm:text-base"
            placeholder="Contraseña"
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
          {isSubmitting ? "Creando cuenta..." : "Registrarme"}
        </button>
      </form>
      <span className="flex items-center justify-center gap-2 text-xs sm:text-sm">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-primary hover:text-primary/80 transition-colors">
          Ingresa
        </Link>
      </span>
    </div>
  );
};
