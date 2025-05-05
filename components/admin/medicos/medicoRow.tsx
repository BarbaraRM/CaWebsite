"use client";

import DeleteButton from "@/components/general/DeleteButton/DeleteButton";
import Link from "next/link";
import dayjs from "dayjs";
import { UsersIcon } from "lucide-react";
import { getCedula } from "@/utils/persona";
import { MedicoInterface } from "@/types/medico";
import { capitalizeFirstLetter } from "@/utils/dataType";

interface AffiliateRowProps {
  item: MedicoInterface;
  onEdit: (id: string) => void;
  onSeeDetails: (id: string) => void;
  onDelete: (id: string) => void;
  onActive: (id: string) => void;
}

const MedicoRow = ({
  item,
  onEdit,
  onSeeDetails,
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
                {`${item?.nombreCompleto || ""}`}
              </div>
              <div className="text-gray-500 text-sm leading-tight flex flex-row items-center gap-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-gray-300"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
                <p className="line-clamp-1 underline">
                  {item?.especialidad?.[0]?.nombre || "-"}
                  {(item?.especialidad || [])?.length > 1 && (
                    <span className="text-blue-400 underline">{`+${
                      (item?.especialidad || [])?.length - 1
                    }`}</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="text-xs text-gray-700 space-y-0.5">
            <div>
              <span className="font-semibold">Correo:</span>{" "}
              {item?.correo || "-"}
            </div>
            <div>
              <span className="font-semibold">Telf:</span>{" "}
              {item?.telefonos?.map((item) => item).join(", ") || "-"}
            </div>
            <div>
              {"Creado el "}
              {dayjs(item?.createdAt)?.format("MM/DD/YYYY HH:mm")?.toString() ||
                ""}
            </div>
          </div>

          {/* Actions */}
          <div className="text-sm font-semibold flex gap-x-2 items-center mt-2">
            <button
              onClick={() => onSeeDetails(item?._id || "")}
              className="text-blue-500 border-blue-300 bg-blue-50 flex items-center gap-1 border 50 rounded-full py-1 px-2 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Ver
            </button>

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
                title="¿Anular registro?"
                content="Este registro dejará de estar disponible en las demás listas."
                okText="Anular"
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
      <tr className="hidden md:table-row hover:bg-gray-50">
        <td className="p-tb whitespace-nowrap text-gray-900 text-sm text-center">
          <div>{getCedula(item?.cedula) || ""} </div>
        </td>
        <td className="p-tb whitespace-nowrap text-gray-900 text-sm capitalize text-center">
          <div>
            {`${item?.primerNombre || ""} ${item?.segundoNombre || ""} ${
              item?.primerApellido || ""
            } ${item?.segundoApellido || ""}`?.toLowerCase()}
          </div>
        </td>

        <td className="p-tb whitespace-nowrap text-gray-900 text-sm text-center">
          <div
            title={
              item?.especialidad?.map((item) => item?.nombre).join(", ") || "-"
            }
          >
            <p className="line-clamp-1">
              {capitalizeFirstLetter(item?.especialidad?.[0]?.nombre || "-")}
              {(item?.especialidad || [])?.length > 1 && (
                <span className="ml-1 text-blue-400 underline">{`+${
                  (item?.especialidad || [])?.length - 1
                }`}</span>
              )}
            </p>
          </div>
        </td>

        <td className="p-tb whitespace-nowrap text-gray-900 text-sm text-center">
          <span className="line-clamp-1 leading-tight">
            {item?.correo || "-"}
          </span>
        </td>

        <td className="p-tb whitespace-nowrap text-gray-900 text-sm text-center">
          <div>{item?.codigoMedico || "-"}</div>
        </td>

        <td className="p-tb whitespace-nowrap text-gray-900 text-sm text-center">
          {item?.activo ? (
            <div className="text-green-600 font-semibold">Activo</div>
          ) : (
            <div className="text-gray-400 font-semibold">Inactivo</div>
          )}
        </td>

        <td className="p-tb text-sm">
          <div className="flex flex-row gap-x-1 items-center justify-center">
            <button
              onClick={() => onSeeDetails(item?._id || "")}
              className="flex flex-col items-center leading-tight text-[9px] text-dark-orange-600 font-light py-[4px] px-[4px] rounded-full hover:bg-dark-orange-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
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
                title="¿Anular registro?"
                content="Este registro dejará de estar disponible en las demás listas."
                okText="Anular"
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

export default MedicoRow;
