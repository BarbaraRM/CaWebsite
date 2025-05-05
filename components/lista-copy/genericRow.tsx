"use client";

import dayjs from "dayjs";
import { EspecialidadInterface } from "@/types/globals";
import DeleteButton from "../general/DeleteButton/DeleteButton";

interface AffiliateRowProps {
  item: EspecialidadInterface;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onActive: (id: string) => void;
}

const GenericRow = ({
  item,
  onEdit,
  onDelete,
  onActive,
}: AffiliateRowProps) => {
  return (
    <>
      {/* VISTA MOVIL */}
      <tr className="flex md:hidden bg-white rounded-lg shadow-md p-4 mb-2 flex-col gap-2 border border-gray-200">
        <td className="w-full">
          {/* Name and Status */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col flex-1">
              <div className="font-semibold text-gray-900 text-lg leading-snug">
                {`${item?.nombre || ""}`}
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="text-xs text-gray-700 space-y-0.5">
            <div>
              <span className="font-semibold">Codigo:</span>{" "}
              {item?.codigo || "-"}
            </div>

            <div>
              <span className="font-semibold">Estado:</span>{" "}
              {item?.activo ? "Activo" : "Inactivo"}
            </div>

            <div>
              {"Creado el "}
              {dayjs(item?.createdAt)?.format("MM/DD/YYYY HH:mm")?.toString() ||
                ""}
            </div>
          </div>

          {/* Actions */}
          <div className="text-sm font-semibold flex gap-x-2 items-center mt-2">
            {item?.activo && (
              <button
                className="text-orange-500 border-orange-300 bg-orange-50 flex items-center gap-1 border 50 rounded-full py-1 px-2 "
                onClick={() => onEdit(item?._id || "")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
                Editar
              </button>
            )}
            {item?.activo && (
              <DeleteButton
                onAccept={(e) => {
                  e?.preventDefault();
                  onDelete(item?._id || "");
                }}
                title="Eliminar registro permanentemente?"
                content="Este registro dejará de estar disponible en las demás listas. Esta accion es irreversible"
                okText="Eliminar"
                noText="Cancelar"
                needsText
              />
            )}
            {!item?.activo && (
              <DeleteButton
                onActivate={(e) => {
                  e?.preventDefault();
                  onActive(item?._id || "");
                }}
                title="¿Activar registro?"
                content="Este registro volverá a estar disponible en todas las listas del sistema."
                okText="Activar"
                noText="Cancelar"
                isActive
                needsText
              />
            )}
          </div>
        </td>
      </tr>

      {/* VISTA DESKTOP */}
      <tr className="hidden md:table-row hover:bg-gray-50 text-dark">
        <td className="p-tb whitespace-nowrap text-sm text-center capitalize">
          <div className="">{item?.codigo?.toLowerCase() || ""}</div>
        </td>

        <td className="p-tb whitespace-nowrap text-sm text-center capitalize">
          <div className="">{item?.nombre?.toLowerCase() || ""}</div>
        </td>

        <td className="p-tb whitespace-nowrap text-sm text-center capitalize">
          {item?.activo ? (
            <div className="text-green-600 font-semibold">Activo</div>
          ) : (
            <div className="text-gray-400 font-semibold">Inactivo</div>
          )}
        </td>

        <td className="p-tb text-sm">
          <div className="flex flex-row gap-x-1 items-center justify-center">
            {item?.activo && (
              <button
                className="flex flex-col items-center leading-tight text-[9px] text-blue-500 font-light py-[4px] px-[4px] rounded-full hover:bg-blue-100"
                onClick={() => onEdit(item?._id || "")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
              </button>
            )}
            {item?.activo && (
              <DeleteButton
                onAccept={(e) => {
                  e?.preventDefault();
                  onDelete(item?._id || "");
                }}
               title="Eliminar registro permanentemente?"
                content="Este registro dejará de estar disponible en las demás listas. Esta accion es irreversible"
                okText="Eliminar"
                noText="Cancelar"
              />
            )}
            {!item?.activo && (
              <DeleteButton
                onActivate={(e) => {
                  e?.preventDefault();
                  onActive(item?._id || "");
                }}
                title="¿Activar registro?"
                content="Este registro volverá a estar disponible en todas las listas del sistema."
                okText="Activar"
                noText="Cancelar"
                isActive
              />
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default GenericRow;
