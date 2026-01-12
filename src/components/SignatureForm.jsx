import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form"; // Importa useFormContext
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import { RiQuillPenLine } from "react-icons/ri";
import "reactjs-popup/dist/index.css";
import "./sigCanvas.css";
import "./customPopup.css";

export const SignatureForm = ({ register, errors, setValue, resetKey = 0 }) => {
  const { trigger } = useFormContext(); // Usar trigger de useFormContext
  const [imageUrl, setImageUrl] = useState(null); // URL de la firma
  const [isSigned, setIsSigned] = useState(false); // Estado de si se firmó
  const [showSavedMessage, setShowSavedMessage] = useState(false); // Mensaje al guardar
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveError, setSaveError] = useState("");
  const sigCanvas = useRef(null); // Referencia al canvas de la firma

  useEffect(() => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
    setIsSigned(false);
    setImageUrl(null);
    setHasUnsavedChanges(false);
    setSaveError("");
    setShowSavedMessage(false);
  }, [resetKey]);

  // Función para limpiar el canvas de firma
  const limpiar = () => {
    sigCanvas.current.clear(); // Limpia el canvas
    setIsSigned(false); // Marca que no se ha firmado
    setImageUrl(null); // Limpia la URL de la firma
    setHasUnsavedChanges(false);
    setSaveError("");
    setShowSavedMessage(false);
    setValue("firma", ""); // Limpia el valor del campo 'firma' en el formulario
  };

  // Función para guardar la firma
  const guardar = async (close) => {
    if (!sigCanvas.current.isEmpty()) {
      // Verifica si la firma no está vacía
      const signatureDataURL = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png"); // Convierte la firma a base64
      setImageUrl(signatureDataURL); // Almacena la imagen en el estado
      setValue("firma", signatureDataURL); // Asigna la firma al campo oculto 'firma'
      setIsSigned(true); // Marca que se ha firmado
      setHasUnsavedChanges(false);
      setSaveError("");
      setShowSavedMessage(true); // Muestra el mensaje de exito
      setTimeout(() => {
        setShowSavedMessage(false);
        close();
      }, 1200); // Cierra luego de confirmar
    } else {
      setIsSigned(false); // Marca que no se ha firmado
      setSaveError("Debes firmar antes de guardar.");
    }

    await trigger("firma"); // Activa la validación para el campo 'firma'
  };

  return (
    <div className="">
      <Popup
        modal
        className="custom-popup"
        trigger={
          <div className="w-full flex flex-col items-center gap-2">
            <button
              type="button"
              className="w-full md:w-auto bg-green-color hover:bg-green-700 text-black font-bold px-6 py-3 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center gap-2"
            >
              <RiQuillPenLine className="text-xl" />
              Firma
            </button>
            <p className="text-gray-300 text-sm text-center">
              Dibuja tu firma con el dedo o el mouse
            </p>
          </div>
        }
        closeOnDocumentClick={false}
      >
        {(close) => (
          <div className="absolute bg-white p-1 rounded-lg shadow-lg max-w-md w-[166%] mx-auto">
            <div className="flex justify-center items-center w-full bg-gray-200 p-1 rounded-lg mb-4">
              <SignaturePad
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                  className:
                    "w-full h-64 md:h-48 border-2 border-black rounded",
                }}
                velocityFilterWeight={0.7}
                minWidth={1}
                maxWidth={2}
                dotSize={1.5}
                onEnd={() => {
                  setHasUnsavedChanges(true);
                  setSaveError("");
                }}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                onClick={() => {
                  if (hasUnsavedChanges) {
                    const confirmClose = window.confirm(
                      "Tienes una firma sin guardar. Deseas cerrar?"
                    );
                    if (!confirmClose) {
                      return;
                    }
                  }
                  close();
                }}
              >
                Cerrar
              </button>
              <button
                className="flex-1 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                onClick={limpiar}
              >
                Limpiar
              </button>
              <button
                className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                onClick={() => guardar(close)}
              >
                Guardar
              </button>
            </div>
            {saveError && (
              <div className="text-red-600 mt-2 text-center font-bold">
                {saveError}
              </div>
            )}
            {showSavedMessage && (
              <div className="text-green-600 mt-2 text-center font-bold">
                Firma guardada con exito.
              </div>
            )}
          </div>
        )}
      </Popup>
      <input
        type="hidden"
        {...register("firma", {
          required: !isSigned && "Firma es requerida.",
        })}
      />
      {isSigned && (
        <p className="text-green-500 text-sm text-center mt-2">
          Firma guardada.
        </p>
      )}
      {errors.firma && (
        <span className="text-red-500">{errors.firma.message}</span>
      )}
    </div>
  );
};







