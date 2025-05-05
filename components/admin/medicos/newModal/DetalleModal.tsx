"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/general/TailModal/TailModal";
import { FormLabel } from "@/components/styled/Forms";
import { authFetch } from "@/hooks/auth-fetch";
import { MedicoInterface } from "@/types/medico";
import BackdropSave from "@/components/general/Backdrop/Backdrop";
import { User } from "lucide-react";

type VerMedicoModalProps = {
  med_id?: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function VerMedicoModal({
  med_id,
  isOpen,
  onClose,
}: VerMedicoModalProps) {
  const [medico, setMedico] = useState<MedicoInterface | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedico = async () => {
      try {
        const res = await authFetch(`/api/medicos/${med_id}`);
        if (!res.ok) throw new Error("No se pudo obtener el médico");
        const data = await res.json();
        setMedico(data);
      } catch (error) {
        console.error("Error al obtener médico:", error);
      } finally {
        setLoading(false);
      }
    };

    if (med_id && isOpen) {
      setLoading(true);
      fetchMedico();
    }
  }, [med_id, isOpen]);

  if (!isOpen || !medico) return null;

  return (
    <Modal
      title="Detalle del Médico"
      icon={<User className="mr-2 h-5 w-5 text-sky-500" />}
      isOpen={isOpen}
      setOpen={onClose}
      showActions={false}
      maxWidth={600}
    >
      {loading && <BackdropSave message="Cargando datos del médico..." />}
      <div className="space-y-4 pb-3">
        <div className="grid sm:grid-cols-2 gap-2">
          <div>
            <FormLabel>Tipo de Identificación</FormLabel>
            <input disabled value={medico.tipoIdentificacion || ""} />
          </div>
          <div>
            <FormLabel>Identificación</FormLabel>
            <input disabled value={medico.cedula || "-"} />
          </div>
          <div>
            <FormLabel>Nombre Completo</FormLabel>
            <input
              disabled
              value={`${medico.prefijo || ""} ${medico.primerNombre || ""} ${
                medico.segundoNombre || ""
              } ${medico.primerApellido || ""} ${
                medico.segundoApellido || ""
              } ${medico.sufijo || ""}`}
            />
          </div>
          <div>
            <FormLabel>Código Médico</FormLabel>
            <input disabled value={medico.codigoMedico || ""} />
          </div>
          <div>
            <FormLabel>Número SENESCYT</FormLabel>
            <input disabled value={medico.tituloSenescyt || ""} />
          </div>
          <div>
            <FormLabel>Sexo</FormLabel>
            <input disabled value={medico.sexo || ""} />
          </div>
          <div>
            <FormLabel>Estado Civil</FormLabel>
            <input disabled value={medico.estadoCivil || "No especificado"} />
          </div>
          <div>
            <FormLabel>Correo</FormLabel>
            <input disabled value={medico.correo || "Sin correo"} />
          </div>
          <div className="sm:col-span-2">
            <FormLabel>Especialidades</FormLabel>
            <ul className="pl-4 list-disc text-sm text-gray-700 capitalize">
              {(medico.especialidad || []).map((e, i) => (
                <li key={i}>
                  {e?.nombre?.toLowerCase()} -{" "}
                  <span className="text-gray-500">{e.codigo || ""}</span>{" "}
                  {e.interconsulta && (
                    <span className="text-green-600">(interconsulta)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />
        <div className="">
          <h3 className="flex flex-row items-center text-base font-medium text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
            Información de Contacto
          </h3>
          <div>
            <FormLabel>Teléfonos</FormLabel>
            <ul className="pl-4 list-disc text-sm text-gray-700">
              {(medico.telefonos || []).map((t, i) => {
                if (t.number || t.descripcion) {
                  return (
                    <li key={i}>
                      <strong>{t.name}:</strong> {t.number}{" "}
                      {t.descripcion ? `(${t.descripcion})` : ""}
                    </li>
                  );
                } else {
                  return <></>;
                }
              })}
            </ul>
          </div>
        </div>

        <hr />
        <div className="">
          <h3 className="flex flex-row items-center text-base font-medium text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z"
                clipRule="evenodd"
              />
            </svg>
            Información de Consultorios
          </h3>
        </div>
        <div className="divide-y">
          {(medico.consultorios || []).map((c, i) => (
            <div key={i} className="border p-2 rounded mb-2 text-sm">
              <FormLabel>Consultorio {i + 1}</FormLabel>

              <p>
                <strong>Nombre:</strong> {c.nombre || ""}
              </p>
              <p>
                <strong>Ciudad:</strong> {c.ciudad || ""}
              </p>
              <p>
                <strong>Dirección:</strong> {c.direccion || ""}
              </p>
              <p>
                <strong>Teléfono:</strong> {c.telefono || "No registrado"}
              </p>
              <p>
                <strong>Latitud:</strong> {c.latitud || "-"}
              </p>
              <p>
                <strong>Longitud:</strong> {c.longitud || "-"}
              </p>
              {c.detalle && (
                <p>
                  <strong>Detalle:</strong> {c.detalle || ""}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
