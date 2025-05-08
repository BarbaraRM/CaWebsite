"use client";

import Modal from "@/components/general/TailModal/TailModal";
import { OfertaLaboral } from "@/types/oferta";
import { Briefcase, Calendar, ExternalLink } from "lucide-react";

interface Props {
  item: OfertaLaboral;
  open: boolean;
  onClose: () => void;
}

export default function DetalleVacanteModal({ item, open, onClose }: Props) {
  return (
    <Modal
      title="Detalle de Vacante"
      icon={<Briefcase className="mr-2 h-5 w-5 text-sky-500" />}
      isOpen={open}
      setOpen={onClose}
      showActions={false}
      maxWidth={700}
    >
      <div className="space-y-4 pt-2 pb-4 px-4">
        {/* Imagen */}
        {item.imageUrl && (
          <div className="flex justify-center">
            <img
              src={item.imageUrl}
              alt="Imagen del cargo"
              className="max-h-52 rounded border"
              onError={(e) =>
                ((e.target as HTMLImageElement).src = "/img/fallback.png")
              }
            />
          </div>
        )}

        {/* Información principal */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
          <p className="text-sm text-gray-500">{item.targetAudience}</p>

          {/* Link de postulación */}
          {item.applicationLink && (
            <div className="flex items-center gap-2 text-sm mt-1">
              <ExternalLink className="h-4 w-4 text-blue-500" />
              <a
                href={item.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Ir al formulario de postulación
              </a>
            </div>
          )}
        </div>

        {/* Fechas */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>
              Inicio Postulación: <strong>{item.startDate|| "-"}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>
              Fin Postulación: <strong>{item.endDate|| "-"}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>
              Inicio Publicación: <strong>{item.startPostOn|| "-"}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>
              Plazo: <strong>{item.deadline || "-"}</strong>
            </span>
          </div>
        </div>

        {/* Descripciones */}
        {[
          { label: "Descripción", value: item.description },
          { label: "Habilidades Requeridas", value: item.requiredSkills },
          { label: "Requisitos", value: item.requirements },
          { label: "Nota Importante", value: item.importantNote },
        ].map(
          (section, idx) =>
            section.value && (
              <div key={idx}>
                <h3 className="text-sm font-semibold text-gray-700">
                  {section.label}
                </h3>
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {section.value}
                </p>
              </div>
            )
        )}

        {/* Duración */}
        {item.duration && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Duración</h3>
            <p className="text-sm text-gray-600">{item.duration}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
