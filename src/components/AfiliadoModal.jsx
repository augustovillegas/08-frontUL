import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { formatDate } from "../utils/formatDate";
import apiClient from "../config/api";
import { toast } from "react-toastify";
import { Spinner } from "./Spinner";

// ── Helpers ────────────────────────────────────────────────────────────────────
const toTitleCase = (str) => {
  if (!str) return "—";
  return str.trim().replace(/\s+/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
};

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
    <p className="text-white text-sm mt-0.5">{value || "—"}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-4">
    <h3 className="text-xs font-bold text-green-color uppercase tracking-widest mb-3 border-b border-white/10 pb-1">
      {title}
    </h3>
    <div className="grid grid-cols-2 gap-x-6 gap-y-3">{children}</div>
  </div>
);

// ── Modo: Documentación ────────────────────────────────────────────────────────
const DocView = ({ a }) => (
  <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-1">
    <div className="flex items-center gap-3 pb-3 border-b border-white/10">
      <div className="h-12 w-12 rounded-full bg-green-color/20 flex items-center justify-center text-green-color text-xl font-bold flex-shrink-0">
        {(a.nombre || "?")[0].toUpperCase()}
      </div>
      <div>
        <p className="text-white font-semibold text-lg leading-tight">{toTitleCase(a.nombre)}</p>
        <p className="text-gray-400 text-sm">DNI {a.dni}</p>
      </div>
    </div>

    <Section title="Datos personales">
      <Field label="Correo" value={(a.correo || "").toLowerCase()} />
      <Field label="Celular" value={a.celular} />
      <Field label="Fecha de nacimiento" value={a.fechaNacimiento ? formatDate(a.fechaNacimiento) : null} />
      <Field label="Estado civil" value={toTitleCase(a.estadoCivil)} />
      <Field label="Ocupación" value={toTitleCase(a.ocupacion)} />
    </Section>

    <Section title="Ubicación">
      <Field label="País" value={a.pais === "ar" ? "Argentina" : toTitleCase(a.pais)} />
      <Field label="Provincia" value={toTitleCase(a.provincia)} />
      <Field label="Departamento" value={toTitleCase(a.departamento)} />
      <Field label="Domicilio" value={toTitleCase(a.domicilio)} />
    </Section>

    <Section title="Afiliación">
      <Field label="Fecha de registro" value={a.fecha ? formatDate(a.fecha) : null} />
    </Section>

    {a.firma && (
      <div className="mb-4">
        <h3 className="text-xs font-bold text-green-color uppercase tracking-widest mb-2 border-b border-white/10 pb-1">
          Firma
        </h3>
        <img
          src={a.firma}
          alt="Firma"
          className="max-h-24 bg-white rounded p-1 object-contain"
        />
      </div>
    )}

    {a.fotosDni?.length > 0 && (
      <div>
        <h3 className="text-xs font-bold text-green-color uppercase tracking-widest mb-2 border-b border-white/10 pb-1">
          Fotos DNI
        </h3>
        <div className="flex gap-3 flex-wrap">
          {a.fotosDni.map((url, i) => (
            <a key={i} href={url} target="_blank" rel="noreferrer">
              <img
                src={url}
                alt={`DNI ${i + 1}`}
                className="h-24 w-36 object-cover rounded border border-white/10 hover:opacity-80 transition-opacity"
              />
            </a>
          ))}
        </div>
      </div>
    )}
  </div>
);

// ── Modo: Editar ───────────────────────────────────────────────────────────────
const OCUPACIONES = ["estudiante", "empleado", "autonomo", "desempleado", "jubilado", "ama de casa", "otro"];
const ESTADOS_CIVILES = ["soltero", "casado", "divorciado", "viudo"];

const EditView = ({ a, onSuccess }) => {
  const [form, setForm] = useState({
    correo:      a.correo      || "",
    celular:     a.celular     || "",
    domicilio:   a.domicilio   || "",
    ocupacion:   a.ocupacion   || "",
    estadoCivil: a.estadoCivil || "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient.put(`/api/afiliados/${a._id}`, form);
      toast.success("Afiliado actualizado");
      onSuccess({ ...a, ...form });
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Error al actualizar");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full bg-secondary-900 text-white text-sm rounded-lg px-3 py-2 outline-none focus-input";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh] pr-1">
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 pb-3 border-b border-white/10">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Nombre</p>
          <p className="text-white text-sm">{toTitleCase(a.nombre)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">DNI</p>
          <p className="text-white text-sm">{a.dni}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wide block mb-1">Correo</label>
          <input name="correo" type="email" value={form.correo} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wide block mb-1">Celular</label>
          <input name="celular" type="text" value={form.celular} onChange={handleChange} className={inputClass} />
        </div>
        <div className="col-span-2">
          <label className="text-xs text-gray-400 uppercase tracking-wide block mb-1">Domicilio</label>
          <input name="domicilio" type="text" value={form.domicilio} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wide block mb-1">Ocupación</label>
          <select name="ocupacion" value={form.ocupacion} onChange={handleChange} className={inputClass}>
            {OCUPACIONES.map((o) => (
              <option key={o} value={o}>{toTitleCase(o)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wide block mb-1">Estado civil</label>
          <select name="estadoCivil" value={form.estadoCivil} onChange={handleChange} className={inputClass}>
            {ESTADOS_CIVILES.map((e) => (
              <option key={e} value={e}>{toTitleCase(e)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-green-color hover:bg-green-700 text-white font-semibold text-sm px-5 py-2 rounded-lg disabled:opacity-60 transition-colors"
        >
          {saving ? <><Spinner size="sm" /> Guardando...</> : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
};

// ── Modo: Borrar ───────────────────────────────────────────────────────────────
const DeleteView = ({ a, onSuccess }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await apiClient.delete(`/api/afiliados/${a._id}`);
      toast.success("Afiliado eliminado");
      onSuccess(a._id);
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Error al eliminar");
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-gray-300 text-sm">
        ¿Estás seguro de que querés eliminar al afiliado{" "}
        <span className="text-white font-semibold">{toTitleCase(a.nombre)}</span> (DNI {a.dni})?
        Esta acción no se puede deshacer.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-2 rounded-lg disabled:opacity-60 transition-colors"
        >
          {deleting ? <><Spinner size="sm" /> Eliminando...</> : "Sí, eliminar"}
        </button>
      </div>
    </div>
  );
};

// ── Contenedor principal ───────────────────────────────────────────────────────
const TITLES = {
  doc:    "Documentación del Afiliado",
  edit:   "Editar Afiliado",
  delete: "Eliminar Afiliado",
};

export const AfiliadoModal = ({ afiliado, mode, onClose, onUpdated, onDeleted }) => {
  if (!afiliado || !mode) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-secondary-100 rounded-xl w-full max-w-lg p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-lg">{TITLES[mode]}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <IoCloseSharp className="text-2xl" />
          </button>
        </div>

        {mode === "doc"    && <DocView a={afiliado} />}
        {mode === "edit"   && <EditView a={afiliado} onSuccess={(updated) => { onUpdated(updated); onClose(); }} />}
        {mode === "delete" && <DeleteView a={afiliado} onSuccess={(id) => { onDeleted(id); onClose(); }} />}
      </div>
    </div>
  );
};
