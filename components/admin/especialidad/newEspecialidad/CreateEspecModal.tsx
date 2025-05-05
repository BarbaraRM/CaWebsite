"use client";

import { useState } from "react";
import { FilePlus2 } from "lucide-react";
import FormAlertError from "@/components/general/Toast/FormAlert";
import Modal from "@/components/general/TailModal/TailModal";
import { EspecialidadInterface } from "@/types/globals";
import { toast } from "react-toastify";
import { onChangeCustome, preventSend } from "@/utils/forms";
import { FormLabel } from "@/components/styled/Forms";
import { useEffect } from "react";
import { authFetch } from "@/hooks/auth-fetch";
import BackdropSave from "@/components/general/Backdrop/Backdrop";

type EspicalidadModalProps = {
  item_id?: string;
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
};

export default function CreateEspecModal({
  item_id,
  isOpen,
  onClose,
  refresh,
}: EspicalidadModalProps) {
  const [showErrorCreating, setShowErrorCreating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [registroData, setRegistroData] = useState<
    EspecialidadInterface | undefined
  >(undefined);

  const onChange = (name: string, value: any) => {
    onChangeCustome({
      value: value,
      name: name,
      form: registroData,
      setForm: setRegistroData,
    });
  };

  const handleSubmit = async () => {
    setSending(true);
    if (registroData) {
      try {
        const res = await authFetch("/api/especialidades/send", {
          method: "PUT",
          body: JSON.stringify(registroData),
        });

        const message = await res.json();
        if (res.ok) {
          toast.success(message?.message);
          refresh();
          onClose();
          setSending(false);
          return true;
        } else {
          throw new Error(message.error || "Error al crear la especialidad");
        }
      } catch (error: any) {
        toast.error("Error al enviar los datos: " + error);
        setShowErrorCreating(true);
        setErrorMessage(error.toString());
        return false;
      }
    } else {
      toast.warning("Complete los campos");
      setSending(false);

      return false;
    }
  };

  useEffect(() => {
    const fetchMedico = async () => {
      try {
        const res = await authFetch(`/api/especialidades/${item_id}`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("No se pudo obtener el paciente");
        }
        const data = await res.json();
        setRegistroData(data);
      } catch (error) {
        console.error("Error al obtener paciente:", error);
      } finally {
        setLoading(false);
      }
    };

    if (item_id) {
      setLoading(true);
      fetchMedico();
    }
  }, [item_id]);

  if (!isOpen) return null;

  return (
    <>
      <Modal
        title="Crear Especialidad"
        icon={<FilePlus2 className="mr-2 h-5 w-5 text-sky-500" />}
        isOpen={isOpen}
        setOpen={onClose}
        showActions={true}
        maxWidth={350}
        onSave={handleSubmit}
        saveDisabled={sending}
        formId="form-especialidad"
      >
        {loading && <BackdropSave message="cargando..." />}
        <form
          id="form-especialidad"
          className="text-sm overflow-y-auto max-h-[60vh] px-2 pb-4"
        >
          <div className="py-2 grid grid-cols-1 gap-2">
            <div>
              <FormLabel>
                Código <span className="text-red-500">*</span>
              </FormLabel>
              <input
                type="text"
                value={registroData?.codigo || ""}
                name="codigo"
                onChange={(e) => {
                  preventSend(e);
                  onChange(e?.target?.name, e?.target?.value);
                }}
                required
              />
            </div>

            <div>
              <FormLabel>
                Nombre <span className="text-red-500">*</span>
              </FormLabel>
              <input
                type="text"
                value={registroData?.nombre || ""}
                name="nombre"
                onChange={(e) => {
                  preventSend(e);
                  onChange(e?.target?.name, e?.target?.value);
                }}
                required
              />
            </div>
          </div>
          {showErrorCreating && (
            <FormAlertError title={errorMessage || "Error creando el registro"} />
          )}
        </form>
      </Modal>
    </>
  );
}
