"use client";

import { useState, useEffect } from "react";
import { FilePlus2 } from "lucide-react";
import FormAlertError from "@/components/general/Toast/FormAlert";
import Modal from "@/components/general/TailModal/TailModal";
import { toast } from "react-toastify";
import { onChangeCustome } from "@/utils/forms";
import { FormLabel } from "@/components/styled/Forms";
import { authFetch } from "@/hooks/auth-fetch";
import BackdropSave from "@/components/general/Backdrop/Backdrop";
import { GenericInterface } from "@/types/globals";

type GenericModalProps = {
  item_id?: string;
  item: GenericInterface | undefined;
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
  icon?: any;
  fetchUrl: string;
  title?: { new?: string; edit?: string };
};

const MODAL_TITLE = {
  new: "Crear Nuevo Registro",
  edit: "Editar el Registro",
};

export default function CreateGenericNewModal({
  item_id,
  item,
  isOpen,
  onClose,
  refresh,
  fetchUrl,
  icon,
  title,
}: GenericModalProps) {
  const [showErrorCreating, setShowErrorCreating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [registroData, setRegistroData] = useState<
    GenericInterface | undefined
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
        const temp = {
          codigo: registroData?.codigo,
          nombre: registroData?.nombre,
          descripcion: registroData?.descripcion,
          _id: registroData?._id,
        };
        const res = await authFetch(fetchUrl, {
          method: "PUT",
          body: JSON.stringify(temp),
        });

        const message = await res.json();
        if (res.ok) {
          toast.success(message?.message);
          refresh();
          onClose();
          setSending(false);
          return true;
        } else {
          throw new Error(message.error || "Error al crear el registro");
        }
      } catch (error: any) {
        toast.error("Error al enviar los datos: " + error);
        setShowErrorCreating(true);
        setErrorMessage(error.toString());
        setSending(false);
        return false;
      }
    } else {
      toast.warning("Complete los campos");
      setSending(false);

      return false;
    }
  };

  useEffect(() => {
    if (item?._id) {
      setLoading(true);
      setRegistroData(item);
      setLoading(false);
    }
  }, [item]);

  if (!isOpen) return null;

  return (
    <>
      <Modal
        title={
          item_id
            ? title?.edit || MODAL_TITLE?.new
            : title?.new || MODAL_TITLE?.edit
        }
        icon={icon || <FilePlus2 className="mr-2 h-5 w-5 text-sky-500" />}
        isOpen={isOpen}
        setOpen={onClose}
        showActions={true}
        maxWidth={350}
        saveDisabled={sending}
        onSave={handleSubmit}
        formId="form-generic"
      >
        {loading && <BackdropSave message="cargando..." />}
        <form
          id="form-generic"
          className="text-sm overflow-y-auto max-h-[60vh] px-2 pb-4"
        >
          <div className="py-2 grid grid-cols-1 gap-2">
            <div>
              <FormLabel>
                Código <span className="text-red-500">*</span>
              </FormLabel>
              <input
                type="text"
                disabled={item_id ? true : false}
                value={registroData?.codigo || ""}
                name="codigo"
                onChange={(e) => {
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
                  onChange(e?.target?.name, e?.target?.value);
                }}
                required
              />
            </div>

            <div>
              <FormLabel>Descripción</FormLabel>
              <textarea
                value={registroData?.descripcion || ""}
                name="descripcion"
                onChange={(e) => {
                  onChange(e?.target?.name, e?.target?.value);
                }}
                rows={3}
                required
              />
            </div>
          </div>
          {showErrorCreating && (
            <FormAlertError
              title={errorMessage || "Error creando el registro"}
            />
          )}
        </form>
      </Modal>
    </>
  );
}
