"use client";

import React from "react";
import Modal from "@/components/general/TailModal/TailModal";
import { MedicoInterface } from "@/types/medico";

// Utilidad para formatear hora en formato 12h
function formatTime(time?: string): string {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const hour = Number.parseInt(hours, 10);

  if (hour === 0) return `12${minutes !== "00" ? `:${minutes}` : ""}am`;
  if (hour === 12) return `12${minutes !== "00" ? `:${minutes}` : ""}pm`;
  if (hour > 12)
    return `${hour - 12}${minutes !== "00" ? `:${minutes}` : ""}pm`;
  return `${hour}${minutes !== "00" ? `:${minutes}` : ""}am`;
}

const diasMap: Record<keyof MedicoInterface["horario"], string> = {
  lun: "Lunes",
  mar: "Martes",
  mier: "Miércoles",
  jue: "Jueves",
  vier: "Viernes",
  sab: "Sábado",
  dom: "Domingo",
};

interface Props {
  open: boolean;
  onClose: () => void;
  item: MedicoInterface;
}

const ViewEmpleoModal: React.FC<Props> = ({ open, onClose, item }) => {
  return (
    <Modal
      title={``}
      isOpen={open}
      setOpen={onClose}
      showActions={false}
      maxWidth={500}
    >
      <div className="space-y-4 p-4 text-sm text-gray-700">
        {item?.imagen && (
          <div className="w-full flex justify-center">
            <img
              src={item.imagen}
              alt="Foto del médico"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}

        <div>
          <strong>Nombre:</strong>{" "}
          {`${item?.sufix ? item.sufix + " " : ""}${item?.nombre || ""} ${
            item?.apellido || ""
          }`}
        </div>

        {item?.especialidad && (
          <div>
            <strong>Especialidad:</strong> {item.especialidad}
          </div>
        )}

        {item?.telefono && (
          <div>
            <strong>Teléfono:</strong> {item.telefono}
          </div>
        )}

        {item?.consultorio && (
          <div>
            <strong>Consultorio:</strong> {item.consultorio}
          </div>
        )}

        {item?.horario && (
          <div>
            <strong>Horario:</strong>
            <ul className="list-disc list-inside mt-1">
              {(Object.keys(diasMap) as (keyof typeof diasMap)[]).map((dia) => {
                const horarioDia: any = item.horario?.[dia];
                if (horarioDia?.start && horarioDia?.end) {
                  return (
                    <li key={dia}>
                      {diasMap[dia]}: {formatTime(horarioDia.start)} a{" "}
                      {formatTime(horarioDia.end)}
                    </li>
                  );
                } else if (horarioDia?.start) {
                  return (
                    <li key={dia}>
                      {diasMap[dia]}: desde {formatTime(horarioDia.start)}
                    </li>
                  );
                } else if (horarioDia?.end) {
                  return (
                    <li key={dia}>
                      {diasMap[dia]}: hasta {formatTime(horarioDia.end)}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        )}

        {item?.socialMedia && (
          <div>
            <strong>Redes Sociales:</strong>
            <ul className="list-disc list-inside mt-1">
              {Object.entries(item.socialMedia)
                .filter(([_, val]) => val)
                .map(([key, val]) => (
                  <li key={key}>
                    <span className="capitalize">{key}:</span>{" "}
                    <a
                      href={val}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={val}
                      className="text-blue-600 underline line-clamp-1"
                    >
                      {val}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ViewEmpleoModal;
