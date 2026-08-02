import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import { RiQuillPenLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { MdOutlineRefresh, MdCheck, MdWarning } from "react-icons/md";
import "reactjs-popup/dist/index.css";
import "./customPopup.css";

export const SignatureForm = ({ register, errors, setValue, resetKey = 0 }) => {
  const { trigger } = useFormContext();
  const [imageUrl, setImageUrl] = useState(null);
  const [isSigned, setIsSigned] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const sigCanvas = useRef(null);

  useEffect(() => {
    if (sigCanvas.current) sigCanvas.current.clear();
    setIsSigned(false);
    setImageUrl(null);
    setHasUnsavedChanges(false);
    setSaveError("");
    setShowSavedMessage(false);
    setShowCloseConfirm(false);
  }, [resetKey]);

  const limpiar = () => {
    sigCanvas.current.clear();
    setIsSigned(false);
    setImageUrl(null);
    setHasUnsavedChanges(false);
    setSaveError("");
    setShowSavedMessage(false);
    setShowCloseConfirm(false);
    setValue("firma", "");
  };

  const guardar = async (close) => {
    if (!sigCanvas.current.isEmpty()) {
      const signatureDataURL = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setImageUrl(signatureDataURL);
      setValue("firma", signatureDataURL);
      setIsSigned(true);
      setHasUnsavedChanges(false);
      setSaveError("");
      setShowSavedMessage(true);
      setTimeout(() => {
        setShowSavedMessage(false);
        close();
      }, 1000);
    } else {
      setSaveError("Dibujá tu firma antes de guardar.");
    }
    await trigger("firma");
  };

  const handleClose = (close) => {
    if (hasUnsavedChanges) {
      setShowCloseConfirm(true);
    } else {
      setShowCloseConfirm(false);
      close();
    }
  };

  return (
    <div>
      <Popup
        modal
        className="custom-popup"
        trigger={
          <div className="w-full flex flex-col items-center gap-1">
            <button
              type="button"
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-colors ${
                isSigned
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-secondary-100 border border-dashed border-gray-500 hover:border-primary text-gray-300 hover:text-white"
              }`}
            >
              <RiQuillPenLine className="text-xl" />
              {isSigned ? "Modificar firma" : "Agregar firma"}
            </button>
            {!isSigned && (
              <p className="text-gray-500 text-xs">
                Dibujá con el dedo o el mouse
              </p>
            )}
          </div>
        }
        closeOnDocumentClick={false}
      >
        {(close) => (
          <div className="bg-white rounded-xl shadow-2xl w-[90vw] max-w-lg mx-auto overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <RiQuillPenLine className="text-gray-500" />
                <span className="font-semibold text-gray-700 text-sm">
                  Firma digital
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleClose(close)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Canvas */}
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-2 text-center">
                Dibujá tu firma en el recuadro
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-white">
                <SignaturePad
                  ref={sigCanvas}
                  penColor="#111827"
                  canvasProps={{ className: "w-full h-48" }}
                  velocityFilterWeight={0.7}
                  minWidth={1.5}
                  maxWidth={3}
                  dotSize={2}
                  onEnd={() => {
                    setHasUnsavedChanges(true);
                    setSaveError("");
                    setShowCloseConfirm(false);
                  }}
                />
              </div>
            </div>

            {/* Mensajes */}
            <div className="px-4 pb-2 min-h-[36px]">
              {saveError && (
                <div className="flex items-center gap-1 text-red-500 text-sm">
                  <MdWarning />
                  {saveError}
                </div>
              )}
              {showSavedMessage && (
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <MdCheck />
                  Firma guardada correctamente.
                </div>
              )}
              {showCloseConfirm && (
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-800">
                  <span>¿Cerrar sin guardar la firma?</span>
                  <div className="flex gap-3 ml-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCloseConfirm(false);
                        setHasUnsavedChanges(false);
                        close();
                      }}
                      className="text-red-500 font-semibold hover:underline"
                    >
                      Sí, cerrar
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCloseConfirm(false)}
                      className="text-gray-600 font-semibold hover:underline"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="flex gap-2 px-4 pb-4">
              <button
                type="button"
                onClick={limpiar}
                className="flex items-center justify-center gap-1 border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <MdOutlineRefresh className="text-base" /> Limpiar
              </button>
              <button
                type="button"
                onClick={() => guardar(close)}
                className="flex-1 flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
              >
                <MdCheck className="text-base" /> Guardar firma
              </button>
            </div>
          </div>
        )}
      </Popup>

      <input
        type="hidden"
        {...register("firma", {
          required: !isSigned && "La firma es requerida.",
        })}
      />

      {/* Preview de la firma guardada */}
      {isSigned && imageUrl && (
        <div className="mt-3 flex flex-col items-center gap-1">
          <p className="text-green-500 text-xs font-medium flex items-center gap-1">
            <MdCheck /> Firma guardada
          </p>
          <div className="bg-white rounded-lg p-2 border border-gray-600 max-w-[200px] w-full">
            <img src={imageUrl} alt="Firma guardada" className="w-full h-auto" />
          </div>
        </div>
      )}

      {errors.firma && (
        <span className="text-red-500 text-sm mt-1 block">
          {errors.firma.message}
        </span>
      )}
    </div>
  );
};
