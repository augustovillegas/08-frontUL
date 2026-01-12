import React, { useCallback, useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { SignatureForm } from "./SignatureForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiUser2Fill, RiMailFill } from "react-icons/ri";
import { HiMiniIdentification } from "react-icons/hi2";
import { IoLocation } from "react-icons/io5";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { IoCloseSharp } from "react-icons/io5";
import { BiMenuAltRight } from "react-icons/bi";
import { buildApiUrl } from "../config/api";
import { ApiLoader } from "./ApiLoader";

export const Form = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fotosDni, setFotosDni] = useState([]);
  const [firma, setFirma] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSetActive = (to) => {
    setActiveLink(to);
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Inicializa el formulario con useForm
  const methods = useForm({
    defaultValues: {
      nombre: "",
      dni: "",
      correo: "",
      fechaNacimiento: "",
      domicilio: "",
      celular: "",
      pais: "",
      provincia: "",
      departamento: "",
      estadoCivil: "",
      ocupacion: "",
      aceptaTerminos: false,
      firma: "", // Manejado de forma separada
      fotoDni: "", // Manejado de forma separada
    },
  });

  // Desestructura los métodos de useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    trigger,
  } = methods;

  // Manejo de dropzone para fotosDni
  const onDropFotosDni = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFotosDni(acceptedFiles); // Almacenar varios archivos
      setValue("fotosDni", acceptedFiles); // Actualizar valor del formulario
      setUploadError("");
    },
    [setValue]
  );

  const {
    getRootProps: getRootPropsFotosDni,
    getInputProps: getInputPropsFotosDni,
    isDragActive: isDragActiveFotosDni,
  } = useDropzone({
    onDrop: onDropFotosDni,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    multiple: true, // Permitir múltiples archivos
  });

  // Función que maneja el envío del formulario
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log("Datos del formulario:", data);
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("dni", data.dni);
    formData.append("correo", data.correo);
    formData.append("fechaNacimiento", data.fechaNacimiento);
    formData.append("domicilio", data.domicilio);
    formData.append("celular", data.celular);
    formData.append("ocupacion", data.ocupacion);
    formData.append("estadoCivil", data.estadoCivil);
    formData.append("pais", data.pais);
    formData.append("provincia", data.provincia);
    formData.append("departamento", data.departamento);

    // Añadir ambos archivos de fotoDni
    fotosDni.forEach((file, index) => {
      formData.append(`fotoDni_${index + 1}`, file); // Asignar nombre dinámico a los archivos
    });

    // Verificar si la firma está disponible
    if (data.firma) {
      formData.append("firma", data.firma); // Firma en base64
    } else {
      console.log("No se obtuvo la firma desde el formulario.");
    }

    try {
      const response = await axios.post(
        buildApiUrl("/api/afiliados"),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Afiliado creado:", response.data);
      toast.success("Formulario enviado con éxito"); // Notificación de envío exitoso
      reset(); // Limpia el formulario
      setFotosDni(null); // Limpia el estado de fotoDni
      setFirma(null); // Limpia el estado de firma
    } catch (error) {
      console.error(
        "Error al crear afiliado:",
        error.response ? error.response.data : error.message
      );
      toast.error("Error al enviar el mensaje");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="w-[90%] mx-auto overflow-hidden max-w-screen-xl font-montserrat text-white">
        <header>
          <nav className="flex h-20 items-center justify-between">
            <RouterLink
              className="w-1/2 max-w-[280px] text-xl font-bold uppercase"
              to="/"
            >
              DEMOCRATIK.
            </RouterLink>

            <input
              className="peer/menu hidden"
              type="checkbox"
              id="menu"
              checked={isMenuOpen}
              onChange={handleMenuToggle}
            />

            {/* Ícono del menú hamburguesa */}
            <label
              className={`w-10 h-10 bg-green-color rounded-lg cursor-pointer transition-transform z-50 md:hidden`}
              htmlFor="menu"
            >
              {isMenuOpen ? (
                <IoCloseSharp className="w-full h-full text-black" />
              ) : (
                <BiMenuAltRight className="w-full h-full text-black" />
              )}
            </label>

            <ul className="fixed inset-0 bg-primary px-[5%] grid gap-6 auto-rows-max content-center justify-items-center clip-circle-0 peer-checked/menu:clip-circle-full transition-[clip-path] duration-500 md:clip-circle-full md:relative md:grid-flow-col md:p-0 md:bg-transparent z-40">
              <li>
                <RouterLink
                  to="/"
                  className={`${activeLink === "/" ? "active-link" : ""}`}
                  onClick={() => handleSetActive("/")}
                >
                  Inicio
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  to="/afiliarme"
                  className={`${
                    activeLink === "/afiliarme" ? "active-link" : ""
                  }`}
                  onClick={() => handleSetActive("/afiliarme")}
                >
                  Afiliarme
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  to="/ayuda"
                  className={`${activeLink === "/ayuda" ? "active-link" : ""}`}
                  onClick={() => handleSetActive("/ayuda")}
                >
                  Ayuda
                </RouterLink>
              </li>
            </ul>
          </nav>
        </header>

        <div className="relative z-30 flex flex-col items-center p-1 w-full  sm:max-w-[90%] md:max-w-[70%] lg:max-w-[45%] xl:max-w-[40%] mx-auto rounded-lg bg-secondary-100 mb-5">
          <div className="w-full mx-auto p-1 rounded-xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="gap-8 px-3 py-3 rounded-lg"
            >
              <h2 className="bg-primary uppercase px-2 py-4 text-3xl text-center text-white mb-3 rounded-md col-span-2 ">
                Inscripción de afiliados
              </h2>

              <div className="col-span-2 md:col-span-1 mb-4 relative">
                <div className="relative">
                  <RiUser2Fill className="absolute top-1/2 left-2 transform -translate-y-1/2 mt-2" />

                  <label
                    htmlFor="nombre"
                    className="block text-sm font-bold text-white"
                  >
                    Nombre completo
                  </label>
                  <input
                    className="w-full md:w-5/6 lg:w-5/6 xl:w-7/10 border-b border-primary bg-secondary-100 px-8 py-3 focus-input-2"
                    id="nombre"
                    type="text"
                    placeholder="Pedro Gimenez"
                    {...register("nombre", {
                      required: "Nombre es requerido.",
                      minLength: {
                        value: 2,
                        message: "Nombre debe tener al menos dos caracteres",
                      },
                      maxLength: {
                        value: 20,
                        message: "Nombre debe tener máximo 20 caracteres",
                      },
                    })}
                  />
                </div>
                {errors.nombre && (
                  <span className="text-red-500 block mt-1">
                    {errors.nombre.message}
                  </span>
                )}
              </div>

              <div className="col-span-2 md:col-span-1 mb-4 relative">
                <div className="relative">
                  <HiMiniIdentification className="absolute top-1/2 left-2 transform -translate-y-1/2 mt-2" />
                  <label
                    htmlFor="dni"
                    className="block text-sm font-bold text-white"
                  >
                    Documento de identidad
                  </label>
                  <input
                    className="w-full md:w-5/6 lg:w-5/6 xl:w-7/10 border-b border-primary bg-secondary-100 px-8 py-3 focus-input-2"
                    id="dni"
                    type="text"
                    placeholder="28XXX123"
                    {...register("dni", {
                      required: "DNI es requerido.",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "DNI solo debe contener números",
                      },
                      minLength: {
                        value: 7,
                        message: "DNI debe tener al menos 7 caracteres",
                      },
                      maxLength: {
                        value: 8,
                        message: "DNI debe tener máximo 8 caracteres",
                      },
                    })}
                  />
                </div>
                {errors.dni && (
                  <span className="text-red-500 block mt-1">
                    {errors.dni.message}
                  </span>
                )}
              </div>

              <div className="col-span-2 md:col-span-1 mb-4 relative">
                <div className="relative">
                  <RiMailFill className="absolute top-1/2 left-2 transform -translate-y-1/2 mt-2" />
                  <label
                    htmlFor="correo"
                    className="block text-sm font-bold text-white"
                  >
                    Correo electrónico
                  </label>
                  <input
                    className="w-full md:w-3/4 lg:w-5/6 xl:w-7/10 border-b border-primary bg-secondary-100 px-8 py-3 focus-input-2"
                    id="correo"
                    type="email"
                    placeholder="pedrog@email.com"
                    {...register("correo", {
                      required: "Correo es requerido.",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Correo no válido",
                      },
                    })}
                  />
                </div>
                {errors.correo && (
                  <span className="text-red-500 block mt-1">
                    {errors.correo.message}
                  </span>
                )}
              </div>

              <div className="col-span-2 md:col-span-1 mb-4">
                <label
                  htmlFor="fechaNacimiento"
                  className="block text-sm font-bold text-white"
                >
                  Fecha de nacimiento
                </label>
                <input
                  className="px-2 py-3 border-b border-primary bg-secondary-100 focus-input-2"
                  id="fechaNacimiento"
                  type="date"
                  {...register("fechaNacimiento", {
                    required: "Fecha de nac. es requerida.",
                    validate: (value) => {
                      const fechaNacimiento = new Date(value);
                      const fechaActual = new Date();
                      const edad =
                        fechaActual.getFullYear() -
                        fechaNacimiento.getFullYear();
                      return edad >= 16 || "Debes ser mayor de 16 años.";
                    },
                  })}
                />
                {errors.fechaNacimiento && (
                  <span className="text-red-500 block mt-1">
                    {errors.fechaNacimiento.message}
                  </span>
                )}
              </div>

              <div className="col-span-2 md:col-span-1 mb-4 relative">
                <label
                  htmlFor="domicilio"
                  className="block text-sm font-bold text-white"
                >
                  Domicilio
                </label>
                <div className="relative">
                  <IoLocation className="absolute top-1/2 left-2 transform -translate-y-1/2 -mt-1" />
                  <input
                    className="w-full md:w-3/4 lg:w-5/6 xl:w-7/10 border-b border-primary bg-secondary-100 px-8 py-4 focus-input-2"
                    id="domicilio"
                    type="text"
                    placeholder="Calle Publica 823"
                    {...register("domicilio", {
                      required: "Domicilio es requerido.",
                      minLength: {
                        value: 5,
                        message:
                          "Domicilio debe tener al menos cinco caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message: "Domicilio debe tener máximo 50 caracteres",
                      },
                    })}
                  />
                </div>
                {errors.fechaNacimiento && (
                  <span className="text-red-500 block mt-1">
                    {errors.fechaNacimiento.message}
                  </span>
                )}
              </div>

              <div className="col-span-2 md:col-span-1 mb-4 relative">
                <div className="relative">
                  <FaPhoneSquareAlt className="absolute top-1/2 left-2 transform -translate-y-1/2 mt-2" />

                  <label
                    htmlFor="celular"
                    className="block text-sm font-bold text-white"
                  >
                    Celular
                  </label>
                  <input
                    className="w-full md:w-3/4 lg:w-5/6 xl:w-7/10 border-b border-primary bg-secondary-100 px-8 py-4 focus-input-2"
                    id="celular"
                    type="text"
                    placeholder="(383)-154345656"
                    {...register("celular", {
                      required: "Celular es requerido.",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Celular solo debe contener números",
                      },
                      minLength: {
                        value: 10,
                        message: "Celular debe tener al menos 10 caracteres",
                      },
                      maxLength: {
                        value: 15,
                        message: "Celular debe tener máximo 15 caracteres",
                      },
                    })}
                  />
                </div>
                {errors.celular && (
                  <span className="text-red-500 block mt-1">
                    {errors.celular.message}
                  </span>
                )}
              </div>

              <div className="col-span-2 mb-4 ">
                <label
                  htmlFor="pais"
                  className="block text-sm font-bold text-white"
                >
                  Nacionalidad
                </label>
                <select
                  id="pais"
                  {...register("pais", {
                    required: "Nacionalidad es requerida.",
                  })}
                  className="mt-1 block w-full px-4 py-2 bg-secondary-100 text-white border border-white rounded-md shadow-sm focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50"
                >
                  <option value="" disabled>
                    Seleccionar nacionalidad
                  </option>
                  <option value="ar">Argentina</option>
                  <option value="otra">Otra</option>
                </select>
                {errors.pais && (
                  <span className="text-red-500">{errors.pais.message}</span>
                )}
                {watch("pais") === "ar" && (
                  <div className="mt-4">
                    <label
                      htmlFor="provincia"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Provincia
                    </label>
                    <select
                      id="provincia"
                      {...register("provincia", {
                        required: "Provincia es requerida.",
                      })}
                      className="mt-1 block w-full px-4 py-2 bg-secondary-100 text-white border border-white rounded-md shadow-sm focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50"
                    >
                      <option value="" disabled>
                        Seleccione una provincia
                      </option>

                      <option value="Catamarca">Catamarca</option>
                      <option value="Otra">Otra</option>
                    </select>
                    {errors.provincia && (
                      <span className="text-red-500">
                        {errors.provincia.message}
                      </span>
                    )}
                    {watch("provincia") === "Catamarca" && (
                      <div className="mt-4">
                        <label
                          htmlFor="departamento"
                          className="block text-sm font-medium text-gray-300"
                        >
                          Departamento
                        </label>
                        <select
                          id="departamento"
                          {...register("departamento", {
                            required: "Departamento es requerido.",
                          })}
                          className="mt-1 block w-full px-4 py-2 bg-secondary-100 text-white border border-white rounded-md shadow-sm focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50"
                        >
                          <option value="" disabled>
                            Seleccione un departamento
                          </option>
                          <option value="Ambato">Ambato</option>
                          <option value="Ancasti">Ancasti</option>
                          <option value="Andalgalá">Andalgalá</option>
                          <option value="Antofagasta de la Sierra">
                            Antofagasta de la Sierra
                          </option>
                          <option value="Belén">Belén</option>
                          <option value="Capayán">Capayán</option>
                          <option value="Capital">Capital</option>
                          <option value="El Alto">El Alto</option>
                          <option value="Fray Mamerto Esquiú">
                            Fray Mamerto Esquiú
                          </option>
                          <option value="La Paz">La Paz</option>
                          <option value="Paclín">Paclín</option>
                          <option value="Pomán">Pomán</option>
                          <option value="Santa María">Santa María</option>
                          <option value="Santa Rosa">Santa Rosa</option>
                          <option value="Tinogasta">Tinogasta</option>
                          <option value="Valle Viejo">Valle Viejo</option>
                        </select>
                        {errors.departamento && (
                          <span className="text-red-500 block mt-1">
                            {errors.departamento.message}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="col-span-2 mb-4">
                <label
                  htmlFor="estadoCivil"
                  className="block text-sm font-bold text-white"
                >
                  Estado Civil
                </label>
                <select
                  id="estadoCivil"
                  {...register("estadoCivil", {
                    required: "Estado civil es requerido.",
                  })}
                  className="mt-1 block w-full px-4 py-2 bg-secondary-100 text-white border border-white rounded-md shadow-sm focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50"
                >
                  <option value="" disabled>
                    Seleccione estado civil
                  </option>
                  <option value="soltero">Soltero/a</option>
                  <option value="casado">Casado/a</option>
                  <option value="divorciado">Divorciado/a</option>
                  <option value="viudo">Viudo/a</option>
                </select>
                {errors.estadoCivil && (
                  <span className="text-red-500 block mt-1">
                    {errors.estadoCivil.message}
                  </span>
                )}
              </div>

              <div className="col-span-2 mb-4">
                <label
                  htmlFor="ocupacion"
                  className="block text-sm font-bold text-white"
                >
                  Ocupación
                </label>
                <select
                  id="ocupacion"
                  {...register("ocupacion", {
                    required: "Ocupación es requerida.",
                  })}
                  className="mt-1 block w-full px-4 py-2 bg-secondary-100 text-white border border-white rounded-md shadow-sm focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50"
                >
                  <option value="" disabled>
                    Selecciona tu ocupación
                  </option>
                  <option value="estudiante">Estudiante</option>
                  <option value="empleado">Empleado</option>
                  <option value="autonomo">Autónomo</option>
                  <option value="desempleado">Desempleado</option>
                  <option value="jubilado">Jubilado</option>
                  <option value="ama de casa">Ama de casa</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.ocupacion && (
                  <span className="text-red-500">
                    {errors.ocupacion.message}
                  </span>
                )}
              </div>

              <div
                className="mb-2"
                {...getRootPropsFotosDni()}
                style={{
                  border: "2px dashed #ccc",
                  padding: "20px",
                  borderRadius: "4px",
                  textAlign: "center",
                  cursor: "pointer", // Para indicar que es interactivo
                }}
              >
                <input {...getInputPropsFotosDni()} />
                {fotosDni && fotosDni.length > 0 ? (
                  <div>
                    {fotosDni.map((file, index) => (
                      <p key={index}>{file.name}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Arrastra la foto del DNI aquí o haz clic para seleccionar
                  </p>
                )}
              </div>

              {/* Mostrar el error si existe */}
              {uploadError && (
                <p className="text-red-500 block mt-1">{uploadError}</p>
              )}

              {/* Validación de errores */}
              {errors.fotoDni && (
                <span className="text-red-500 block mt-1">
                  {errors.fotoDni.message}
                </span>
              )}

              <div className="flex items-center col-span-2 mb-4">
                <input
                  id="aceptaTerminos"
                  type="checkbox"
                  {...register("aceptaTerminos", {
                    required: "Debe aceptar los términos y condiciones.",
                  })}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="aceptaTerminos"
                  className="ml-2 block text-dm font-medium text-gray-300"
                >
                  Acepto los términos y condiciones.
                </label>
                {errors.aceptaTerminos && (
                  <span className="text-red-500 text-sm mt-1 md:mt-0 md:ml-2 block">
                    {errors.aceptaTerminos.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-center w-full col-span-2 gap-4">
                <div className="w-full">
                  <SignatureForm
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    trigger={trigger}
                  />
                </div>

                <div className="flex justify-center items-center w-full col-span-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex justify-center items-center bg-green-color py-5 px-14 mx-auto cursor-pointer hover:bg-green-700 text-white font-bold  rounded focus:outline-none focus:shadow-outline"
                  >
                    Enviar
                  </button>
                </div>
                {isSubmitting && (
                  <ApiLoader className="py-2" message="Espera mientras se conecta el servidor y se envía tu solicitud..." />
                )}
              </div>
            </form>
          </div>
        </div>
        {/* Componente de ToastContainer para renderizar las notificaciones */}
        <ToastContainer />
      </div>
    </FormProvider>
  );
};
