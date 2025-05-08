"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { FilePlus2 } from "lucide-react";
import Modal from "@/components/general/TailModal/TailModal";
import { SmallLabel } from "@/components/styled/Forms";
import { toast } from "react-toastify";
import { OfertaLaboral } from "@/types/oferta";
import TextareaAutosize from "react-textarea-autosize";

type ModalProps = {
  item_id?: string;
  item: OfertaLaboral | undefined;
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
  icon?: any;
  title?: { new?: string; edit?: string };
};

const MODAL_TITLE = {
  new: "Crear Nueva Vacante",
  edit: "Editar Vacante",
};

export default function EmpleadoForm({
  item_id,
  item,
  isOpen,
  onClose,
  refresh,
}: ModalProps) {
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<OfertaLaboral | undefined>({
    visible: true,
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Soporta campos como: socialMedia.whatsapp, horario.lun.start
    const keys = name.split(".");

    setFormData((prev: any) => {
      const updated: any = { ...prev };
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
    setErrorMsg(null);

    try {
      const endpoint = item_id ? "/api/vacantes/update" : "/api/vacantes/new";
      const payload = item_id ? { ...formData, id: item_id } : formData;

      const res = await fetch(endpoint, {
        method: item_id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Error en el servidor");

      toast.success(item_id ? "Vacante actualizada" : "Vacante creada");
      onClose();
      refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Error al guardar la vacante");
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
    <Modal
      title={item_id ? MODAL_TITLE.edit : MODAL_TITLE.new}
      icon={<FilePlus2 className="mr-2 h-5 w-5 text-sky-500" />}
      isOpen={isOpen}
      setOpen={onClose}
      showActions={true}
      maxWidth={600}
      saveDisabled={sending}
      formId="form-vacante"
      useSubmit
    >
      {errorMsg && (
        <div className="bg-red-100 border border-red-300 p-3 text-red-700 rounded text-sm">
          {errorMsg}
        </div>
      )}
      <form id="form-vacante" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 flex-1">
          {/* First row */}
          <div className="flex-1 md:col-span-3">
            <SmallLabel htmlFor="title">
              Título <span className="text-red-500">*</span>
            </SmallLabel>
            <TextareaAutosize
              id="title"
              name="title"
              value={formData?.title || ""}
              onChange={handleChange}
              required
              placeholder="Escriba aqui.."
              minRows={1}
            />
          </div>

          <div className="flex-1 md:col-span-3">
            <SmallLabel htmlFor="description">
              Descripción de la postulación
              <span className="text-red-500">*</span>
            </SmallLabel>
            <TextareaAutosize
              id="description"
              name="description"
              value={formData?.description || ""}
              required
              onChange={handleChange}
              placeholder="Escriba aqui..."
              minRows={2}
            />
          </div>

          <div className="flex-1 md:col-span-3">
            <SmallLabel htmlFor="description">
              Enlace para postulación<span className="text-red-500">*</span>
            </SmallLabel>
            <input
              id="applicationLink"
              name="applicationLink"
              value={formData?.applicationLink || ""}
              onChange={handleChange}
              placeholder="https://"
              required
            />
          </div>

          <div className="flex-1">
            <SmallLabel htmlFor="duration">Disponible</SmallLabel>
            <div className="flex">
              <input
                id="duration"
                name="duration"
                type="number"
                defaultValue="7"
                onChange={handleChange}
                value={formData?.duration || ""}
              />
              <div className="flex items-center justify-center bg-gray-100 border border-l-0 border-[#e5e7eb] rounded-r-md px-4 h-8.5 text-[#6b7280]">
                día(s)
              </div>
            </div>
          </div>

          <div className="flex-1">
            <SmallLabel htmlFor="startDate">Fecha de Inicio Postulación</SmallLabel>
            <input
              id="startDate"
              type="date"
              name="startDate"
              onChange={handleChange}
              value={formData?.startDate || ""}
            />
          </div>

          <div className="flex-1">
            <SmallLabel htmlFor="endDate">Fecha de Fin Postulación</SmallLabel>
            <input
              id="endDate"
              type="date"
              name="endDate"
              onChange={handleChange}
              value={formData?.endDate || ""}
            />
          </div>

          <div className="flex-1 md:col-span-3">
            <SmallLabel htmlFor="targetAudience">
              A Quien va dirigido
            </SmallLabel>
            <TextareaAutosize
              id="targetAudience"
              name="targetAudience"
              value={formData?.targetAudience || ""}
              onChange={handleChange}
              placeholder="Escriba aqui..."
              minRows={1}
            />
          </div>

          <div className="flex-1 md:col-span-3">
            <SmallLabel htmlFor="requiredSkills">
              Habilidades Requeridas
            </SmallLabel>
            <TextareaAutosize
              id="requiredSkills"
              name="requiredSkills"
              value={formData?.requiredSkills || ""}
              onChange={handleChange}
              placeholder="Escriba aqui..."
              minRows={2}
            />
          </div>

          <div className="flex-1 md:col-span-3">
            <SmallLabel htmlFor="requirements">Funciones principales</SmallLabel>
            <TextareaAutosize
              id="requirements"
              name="requirements"
              value={formData?.requirements || ""}
              onChange={handleChange}
              placeholder="Escriba aqui..."
              minRows={2}
            />
          </div>

          <div className="flex-1 md:col-span-3">
            <SmallLabel htmlFor="importantNote">Nota Importante</SmallLabel>
            <TextareaAutosize
              id="importantNote"
              name="importantNote"
              value={formData?.importantNote || ""}
              onChange={handleChange}
              placeholder="Escriba aqui..."
              minRows={2}
            />
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-2 flex-1">
          {/* Imagen */}
          <div>
            <SmallLabel htmlFor="imageUrl">URL de Imagen</SmallLabel>
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              value={formData?.imageUrl || ""}
              onChange={handleChange}
              placeholder="https://"
            />
          </div>

         {formData?.imageUrl && (
            <div className="flex justify-center py-2">
              <img
                src={formData?.imageUrl}
                alt="Vista previa"
                className="min-h-52 w-full max-h-52 border rounded object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/img/fallback.png";
                }}
              />
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
}
