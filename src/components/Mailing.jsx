import React, { useState } from "react";

export const Mailing = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 md:-mt-4">
        <h1 className="text-3xl text-gray-200">Mailing</h1>
      </div>

      <div className="bg-secondary-100 p-6 md:p-10 lg:p-16 xl:p-20 2xl:p-24 rounded-lg max-w-5xl lg:max-w-none mx-auto w-full">
        <div className="mb-6">
          <h2 className="text-xl text-white font-bold mb-3">Segmentacion</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-gray-200">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              Todos los usuarios
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              Por zona
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              Por edad
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              Por genero
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              Por estado de afiliacion
            </label>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Provincia
            </label>
            <select className="w-full p-2 rounded bg-secondary-100 text-white border border-white focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50">
              <option value="">Seleccionar provincia</option>
              <option value="catamarca">Catamarca</option>
              <option value="otra">Otra</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Ciudad
            </label>
            <input
              type="text"
              placeholder="Ciudad o departamento"
              className="w-full p-2 rounded bg-secondary-100 text-white border border-white focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Rango de edad
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Min"
                className="w-full p-2 rounded bg-secondary-100 text-white border border-white focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50"
              />
              <input
                type="text"
                placeholder="Max"
                className="w-full p-2 rounded bg-secondary-100 text-white border border-white focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Estado civil
            </label>
            <select className="w-full p-2 rounded bg-secondary-100 text-white border border-white focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50">
              <option value="">Seleccionar estado civil</option>
              <option value="soltero">Soltero/a</option>
              <option value="casado">Casado/a</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Ocupacion
            </label>
            <select className="w-full p-2 rounded bg-secondary-100 text-white border border-white focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50">
              <option value="">Seleccionar ocupacion</option>
              <option value="estudiante">Estudiante</option>
              <option value="empleado">Empleado</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Estado de afiliacion
            </label>
            <select className="w-full p-2 rounded bg-secondary-100 text-white border border-white focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50">
              <option value="">Seleccionar estado</option>
              <option value="activo">Activo</option>
              <option value="pendiente">Pendiente</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-white mb-2">
            Destinatarios
          </label>
          <input
            type="text"
            placeholder="Buscar usuarios o grupos"
            className="w-full p-2 rounded bg-secondary-100 text-white border border-white focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50"
          />
          <div className="flex flex-wrap gap-2 mt-3 text-sm">
            <span className="bg-secondary-900 text-gray-200 px-3 py-1 rounded-full">
              Zona Norte
            </span>
            <span className="bg-secondary-900 text-gray-200 px-3 py-1 rounded-full">
              18-25
            </span>
            <span className="bg-secondary-900 text-gray-200 px-3 py-1 rounded-full">
              Activos
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Destinatarios estimados: 1,245
          </p>
        </div>

        <div className="mb-3">
          <h2 className="text-xl text-white font-bold mb-3">Emails</h2>
          <input
            type="text"
            placeholder="Destinatario"
            //value={correo}
            //onChange={(e) => setCorreo(e.target.value)}
            className="mb-4 p-2 w-full rounded"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Asunto"
            // value={subject}
            //onChange={(e) => setSubject(e.target.value)}
            className="mb-4 p-2 w-full rounded"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Preheader"
            className="mb-4 p-2 w-full rounded"
          />
        </div>
        <div className="mb-3">
          <textarea
            placeholder="Mensaje"
            // value={message}
            // onChange={(e) => setMessage(e.target.value)}
            className="mb-4 p-2 w-full rounded"
          />
        </div>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Plantilla
            </label>
            <select className="w-full p-2 rounded bg-secondary-100 text-white border border-white focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50">
              <option value="">Seleccionar plantilla</option>
              <option value="boletin">Boletin</option>
              <option value="evento">Evento</option>
              <option value="novedad">Novedad</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Programacion
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Fecha"
                className="w-full p-2 rounded bg-secondary-100 text-white border border-white focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50"
              />
              <input
                type="text"
                placeholder="Hora"
                className="w-full p-2 rounded bg-secondary-100 text-white border border-white focus:border-primary focus:ring focus:ring-white-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-white mb-2">
              Adjuntos
            </label>
            <div className="border-2 border-dashed border-gray-400 rounded p-4 text-gray-400 text-sm">
              Arrastra archivos o haz clic para seleccionar
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-gray-200">
              <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              Cumple con politicas de comunicacion
            </label>
          </div>
        </div>
        <div>
          <button
            //onClick={handleSendEmail}
            className="bg-green-color text-black font-bold py-3 px-2 rounded-md"
          >
            Send Emails
          </button>
          <button
            //onClick={handleSaveDraft}
            className="ml-3 bg-secondary-900 text-gray-200 font-bold py-3 px-3 rounded-md"
          >
            Guardar borrador
          </button>
        </div>
      </div>
    </div>
  );
};
