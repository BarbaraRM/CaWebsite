"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Lock, X } from "lucide-react";
import Modal from "@/components/general/TailModal/TailModal";
import { FormLabel } from "../styled/Forms";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordChange: (
    currentPassword: string,
    newPassword: string
  ) => Promise<boolean>;
}

export default function PasswordModal({
  isOpen,
  onClose,
  onPasswordChange,
}: PasswordModalProps) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bloquear el scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Limpiar el formulario cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordError("");
      setPasswordSuccess("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));

    // Limpiar mensajes de error/éxito al cambiar los campos
    setPasswordError("");
    setPasswordSuccess("");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e?.preventDefault();

    // Validar que la contraseña actual no esté vacía
    if (!passwordData.currentPassword) {
      setPasswordError("Debe ingresar su contraseña actual");
      return;
    }

    // Validar que la nueva contraseña cumpla con los requisitos de seguridad
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(passwordData.newPassword)) {
      setPasswordError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
      );
      return;
    }

    // Validar que las contraseñas coincidan
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }

    setIsSubmitting(true);

    try {
      // Llamar a la función proporcionada por el componente padre
      const success = await onPasswordChange(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (success) {
        setPasswordSuccess("Contraseña actualizada correctamente");
        // Cerrar el modal después de 2 segundos si la operación fue exitosa
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setPasswordError(
          "No se pudo actualizar la contraseña. Verifique que la contraseña actual sea correcta."
        );
      }
    } catch (error) {
      setPasswordError("Ocurrió un error al cambiar la contraseña");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal
        title={"Cambiar Contraseña"}
        icon={<Lock className="mr-2 h-5 w-5 text-sky-500" />}
        isOpen={isOpen}
        setOpen={onClose}
        showActions={true}
        maxWidth={350}
        saveText="Cambiar contraseña"
        saveDisabled={isSubmitting}
        onSave={handlePasswordSubmit}
        formId="form-change-password"
      >
        <div className="px-3 pb-3">
          <form id="form-change-password" className="space-y-6">
            <div className="space-y-2">
              <div>
                <FormLabel htmlFor="currentPassword">
                  Contraseña Actual
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <FormLabel htmlFor="newPassword">
                  Nueva Contraseña
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500 mt-1">
                  La contraseña debe tener al menos 8 caracteres, una mayúscula,
                  una minúscula, un número y un carácter especial.
                </p>
              </div>

              <div>
                <FormLabel htmlFor="confirmPassword">
                  Confirmar Nueva Contraseña
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </form>
          {passwordError && (
            <div className="text-xs leading-tight mt-3 p-2 bg-red-50 text-red-800 border border-red-200 rounded-md">
              <p>{passwordError}</p>
            </div>
          )}

          {passwordSuccess && (
            <div className="text-xs leading-tight mt-3 p-2 bg-green-50 text-green-800 border border-green-200 rounded-md">
              <p>{passwordSuccess}</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
