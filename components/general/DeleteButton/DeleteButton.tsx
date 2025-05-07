"use client";

import { Rocket, Trash2 } from "lucide-react";
import React, { ReactNode, useState } from "react";

interface DeleteInterface {
  children?: ReactNode;
  onAccept?: Function;
  onClick?: Function;
  onCancel?: Function;
  noText?: string;
  okText?: string;
  title?: string;
  htmlTitle?: string;
  content?: string;
  color?: string;
  needsText?: boolean;
  flexDirection?: "column" | "row";
  onActivate?: Function; // nueva función para activar
  isActive?: boolean;
  icon?: any;
}

const DeleteButton = ({
  children,
  onAccept,
  onCancel,
  onClick,
  noText,
  okText,
  title,
  htmlTitle,
  content,
  color,
  needsText = false,
  flexDirection = "column",
  onActivate,
  isActive,
  icon,
}: DeleteInterface) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openActivateModal, setOpenActivateModal] = useState<boolean>(false);

  const colorClasses = {
    gray: "border-[#737373] text-[#737373] hover:bg-[#efefef]",
    red: "border-[#7d1921] text-[#7d1921] hover:bg-red-50",
    orange: "border-[#ff6f18] text-[#ff6f18] hover:bg-orange-50",
    blue: "border-blue-500 text-blue-500 hover:bg-blue-50",
    green: "border-green-500 text-green-500 hover:bg-green-50",
  };

  const onhandleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAccept?.();
    setOpenDeleteModal(false);
  };

  const onhandleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCancel?.();
    setOpenDeleteModal(false);
  };

  const onHandleActivate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onActivate?.();
    setOpenActivateModal(false);
  };

  return (
    <>
      {/* Botón de eliminar */}
      {!isActive && (
        <button
          className={`px-3 py-1 rounded border ${
            colorClasses[color || "red"]
          } flex items-center justify-center transition-colors`}
          onClick={(e) => {
            e.preventDefault();
            setOpenDeleteModal(true);
            onClick?.();
          }}
          style={{ color: color || "", flexDirection: flexDirection }}
          title={htmlTitle || "Eliminar registro"}
        >
          {children ? (
            children
          ) : (
            <>
              {icon ? icon : <Trash2 size={16} />}
              {needsText ? " Eliminar" : ""}
            </>
          )}
        </button>
      )}

      {/* Botón de activar */}
      {isActive && (
        <button
          className={`px-3 py-1 rounded border border-green-700 fill-green-700 text-green-700 hover:bg-green-50 flex items-center justify-center transition-colors`}
          onClick={(e) => {
            e.preventDefault();
            setOpenActivateModal(true);
            onClick?.();
          }}
          style={{ color: color || "", flexDirection: flexDirection }}
          title={htmlTitle || "Activar registro"}
        >
          {children ? (
            children
          ) : (
            <>
              {icon ? icon : <Rocket size={16} />}

              {needsText ? "Activar" : ""}
            </>
          )}
        </button>
      )}

      {/* Modal de eliminación */}
      {openDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex flex-row items-center min-h-[100px] gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-12 text-[#ff6969]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              <div className="flex-1">
                <p className="text-lg font-bold text-center text-gray-700 pb-3">
                  {title || "¿Estás seguro de eliminar este registro?"}
                </p>
                <p className="text-sm text-gray-600">
                  {content || "Esta acción se puede revertir más adelante."}
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={onhandleCancel}
                className="px-4 py-2 text-sm uppercase rounded-md border border-gray-700 text-gray-700 bg-white hover:bg-gray-200"
              >
                {noText || "Cancelar"}
              </button>
              <button
                onClick={onhandleOk}
                className="px-4 py-2 text-sm uppercase rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                {okText || "Aceptar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de activación */}
      {openActivateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-green-700 mb-2">
                Activar registro
              </h2>
              <p className="text-sm text-gray-600">
                Una vez activado, este registro será visible en las demás
                opciones y listas del sistema.
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <button
                  onClick={() => setOpenActivateModal(false)}
                  className="px-4 py-2 text-sm rounded-md border border-gray-700 text-gray-700 hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={onHandleActivate}
                  className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700"
                >
                  Activar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
