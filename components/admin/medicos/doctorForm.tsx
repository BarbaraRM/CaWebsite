"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { FilePlus2 } from "lucide-react";
import { MedicoInterface } from "@/types/medico";
import Modal from "@/components/general/TailModal/TailModal";
import { SmallLabel } from "@/components/styled/Forms";
import { toast } from "react-toastify";

type ModalProps = {
  item_id?: string;
  item: MedicoInterface | undefined;
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
  icon?: any;
  title?: { new?: string; edit?: string };
};

const MODAL_TITLE = {
  new: "Crear Nuevo Médico",
  edit: "Editar Médico",
};

export default function DoctorForm({
  item_id,
  item,
  isOpen,
  onClose,
  refresh,
  icon,
  title,
}: ModalProps) {
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<MedicoInterface | undefined>({
    visible: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Soporta campos como: socialMedia.whatsapp, horario.lun.start
    const keys = name.split(".");

    setFormData((prev: any) => {
      let updated: any = { ...prev };
      let pointer = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        pointer[keys[i]] = pointer[keys[i]] ?? {};
        pointer = pointer[keys[i]];
      }

      pointer[keys[keys.length - 1]] = value;

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg(null); // limpiar errores previos

    try {
      const endpoint = item_id ? "/api/medicos/update" : "/api/medicos/new";
      const payload = item_id ? { ...formData, id: item_id } : formData;

      const res = await fetch(endpoint, {
        method: item_id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Error en el servidor");

      toast.success(
        item_id ? "Médico actualizado con éxito" : "Médico creado con éxito"
      );

      onClose(); // cerrar modal
      refresh(); // recargar datos
    } catch (error: any) {
      console.error("Error al guardar médico:", error.message);
      setErrorMsg(`Error al ${item_id ? "editar" : "crear"} el médico`);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  return (
    <>
      <Modal
        title={
          item_id
            ? title?.new || MODAL_TITLE?.new
            : title?.edit || MODAL_TITLE?.edit
        }
        icon={icon || <FilePlus2 className="mr-2 h-5 w-5 text-sky-500" />}
        isOpen={isOpen}
        setOpen={onClose}
        showActions={true}
        maxWidth={500}
        saveDisabled={sending}
        formId="form-medico"
        useSubmit
      >
        {errorMsg && (
          <div className="mb-4 rounded-md bg-red-100 border border-red-300 p-3 text-red-800 text-sm">
            {errorMsg}
          </div>
        )}

        <form id="form-medico" onSubmit={handleSubmit}>
          <div className="flex md:flex-row flex-col gap-x-3 items-center">
            <div className="flex justify-center h-24 w-24 overflow-hidden rounded-full border shadow-md p-2">
              <img
                src={formData?.imagen || "/doctors/default.png"}
                alt="Vista previa del médico"
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/doctors/default.png"; // imagen por defecto si falla
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1">
              {/* First row */}
              <div className="flex-1">
                <SmallLabel htmlFor="nombre">
                  Nombres <span className="text-red-500">*</span>
                </SmallLabel>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ex: John"
                  onChange={handleChange}
                  value={formData?.nombre || ""}
                  required
                />
              </div>

              <div className="flex-1">
                <SmallLabel htmlFor="apellido">
                  Apellidos
                  <span className="text-red-500">*</span>
                </SmallLabel>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  placeholder="Ex: Smith"
                  onChange={handleChange}
                  value={formData?.apellido || ""}
                  required
                />
              </div>

              <div>
                <SmallLabel htmlFor="sufix">
                  Prefijo
                  <span className="text-red-500">*</span>
                </SmallLabel>
                <input
                  title={formData?.sufix || ""}
                  type="text"
                  id="sufix"
                  name="sufix"
                  placeholder="Dr. / Dra."
                  onChange={handleChange}
                  value={formData?.sufix || ""}
                  required
                />
              </div>

              <div>
                <SmallLabel htmlFor="especialidad">
                  Especialidad
                  <span className="text-red-500">*</span>
                </SmallLabel>
                <input
                  title={formData?.especialidad || ""}
                  type="text"
                  id="especialidad"
                  name="especialidad"
                  placeholder="Neurocirujía"
                  onChange={handleChange}
                  value={formData?.especialidad || ""}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            {/* Fourth row */}
            <div>
              <SmallLabel htmlFor="consultorio">
                Consultorio
                <span className="text-red-500">*</span>
              </SmallLabel>
              <input
                type="text"
                id="consultorio"
                name="consultorio"
                placeholder="Ex: 104"
                onChange={handleChange}
                value={formData?.consultorio || ""}
                required
              />
            </div>
            <div>
              <SmallLabel htmlFor="telefono">Teléfono</SmallLabel>
              <input
                type="text"
                id="telefono"
                name="telefono"
                placeholder="Ex: 00000000"
                onChange={handleChange}
                value={formData?.telefono || ""}
              />
            </div>
            <div className="md:col-span-2">
              <SmallLabel htmlFor="sufix">
                URL de la Imagen
                <span className="text-red-500">*</span>
              </SmallLabel>
              <input
                type="text"
                id="imagen"
                name="imagen"
                placeholder="https://ejemplo.com/doctor.jpg"
                onChange={handleChange}
                value={formData?.imagen || ""}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#e5e7eb] my-6"></div>

          {/* Horario Section */}
          <h2 className="text-[#2e2e2e] text-base font-bold">
            Horario de Atención
          </h2>
          <p className="mb-2 text-sm text-gray-500">
            Agregue los horarios de atención por día, en caso de no atender un
            día solo deje en blanco.
          </p>
          <div className="grid grid-cols-1 gap-y-3">
            {[
              { key: "lun", label: "Lunes" },
              { key: "mar", label: "Martes" },
              { key: "mier", label: "Miércoles" },
              { key: "jue", label: "Jueves" },
              { key: "vier", label: "Viernes" },
              { key: "sab", label: "Sábado" },
              { key: "dom", label: "Domingo" },
            ].map(({ key, label }) => (
              <div key={key} className="grid grid-cols-3 items-center gap-x-4">
                <SmallLabel className="col-span-1">{label}</SmallLabel>
                <input
                  type="time"
                  name={`${key}-start`}
                  className="col-span-1"
                  value={formData?.horario?.[key]?.start || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      horario: {
                        ...prev?.horario,
                        [key]: {
                          ...prev?.horario?.[key],
                          start: e.target.value,
                        },
                      },
                    }))
                  }
                />
                <input
                  type="time"
                  name={`${key}-end`}
                  className="col-span-1"
                  value={formData?.horario?.[key]?.end || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      horario: {
                        ...prev?.horario,
                        [key]: {
                          ...prev?.horario?.[key],
                          end: e.target.value,
                        },
                      },
                    }))
                  }
                />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-[#e5e7eb] my-6"></div>

          {/* Contact Information Section */}
          <h2 className="text-[#2e2e2e] text-base font-bold mb-2">
            Redes Sociales
          </h2>

          <div className="grid grid-cols-1 gap-y-2">
            {/* Whatsapp */}
            <div>
              <SmallLabel htmlFor="whatsapp">WhatsApp</SmallLabel>
              <input
                type="text"
                id="whatsapp"
                name="socialMedia.whatsapp"
                placeholder="+593 0900000000"
                onChange={handleChange}
                value={formData?.socialMedia?.whatsapp || ""}
              />
            </div>
            {/* Social Media */}
            <div>
              <SmallLabel htmlFor="facebook">Facebook</SmallLabel>
              <input
                type="text"
                id="facebook"
                name="socialMedia.facebook"
                placeholder="Ex: facebook.com/john"
                onChange={handleChange}
                value={formData?.socialMedia?.facebook || ""}
              />
            </div>

            <div>
              <SmallLabel htmlFor="instagram">Instagram</SmallLabel>
              <input
                type="text"
                id="instagram"
                name="socialMedia.instagram"
                placeholder="Ex: instagram.com/john"
                onChange={handleChange}
                value={formData?.socialMedia?.instagram || ""}
              />
            </div>

            {/* LinkedIn */}
            <div>
              <SmallLabel htmlFor="linkedin">LinkedIn</SmallLabel>
              <input
                type="text"
                id="linkedin"
                name="socialMedia.linkedin"
                placeholder="Ex: linkedin.com/john"
                onChange={handleChange}
                value={formData?.socialMedia?.linkedin || ""}
              />
            </div>

            {/* Website */}
            <div>
              <SmallLabel htmlFor="sitioWeb">Website</SmallLabel>
              <input
                type="text"
                id="sitioWeb"
                name="socialMedia.sitioWeb"
                placeholder="Ex: www.example.com"
                onChange={handleChange}
                value={formData?.socialMedia?.sitioWeb || ""}
              />
            </div>

            {/* Tiktok */}
            <div>
              <SmallLabel htmlFor="sitioWeb">TikTok</SmallLabel>
              <input
                type="text"
                id="tiktok"
                name="socialMedia.tiktok"
                placeholder="Ex: tiktok.com/john"
                onChange={handleChange}
                value={formData?.socialMedia?.tiktok || ""}
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
