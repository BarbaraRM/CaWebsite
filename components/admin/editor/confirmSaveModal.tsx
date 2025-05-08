// components/home/ConfirmSaveModal.tsx
"use client";

import Modal from "@/components/general/TailModal/TailModal";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface ConfirmSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmSaveModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmSaveModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      showActions={false}
      setOpen={onClose}
      title=" ¿Guardar cambios?"
      icon={<AlertTriangle className="mr-2 text-orange-600" />}
    >
      <div className="space-y-4 pb-5">
        <p className="text-base text-gray-600">
          Esta acción sobrescribirá el contenido actual de la página de inicio
          con los datos actuales. ¿Estás seguro de continuar?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onConfirm} className="bg-green-600 text-white">
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SavedModal = ({ isOpen, onClose }: SavedModalProps) => {
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        onClose();
      }, 7000);
      confetti({
        spread: 300,
        particleCount: 200,
        origin: { y: 0.6 },
        ticks: 300,
        decay: 0.91,
      });
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} showActions={false} setOpen={onClose} title="">
      <div className="flex flex-col items-center justify-center space-y-4 pb-4">
        <CheckCircle className="w-12 h-12 text-green-600" />
        <h2 className="text-lg font-semibold text-center text-gray-800">
          Datos actualizados con éxito
        </h2>
        <p className="text-sm text-gray-500 text-center max-w-sm">
          Los cambios pueden tardar unos minutos en verse reflejados en la
          página web.
        </p>
      </div>
    </Modal>
  );
};
