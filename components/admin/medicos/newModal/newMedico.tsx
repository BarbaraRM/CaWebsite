"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import Modal from "@/components/general/TailModal/TailModal";
import { onChangeCustome, preventSend } from "@/utils/forms";
import { FormLabel } from "@/components/styled/Forms";
import { useEffect } from "react";
import BackdropSave from "@/components/general/Backdrop/Backdrop";
import { authFetch } from "@/hooks/auth-fetch";
import {
  opt_estado_civil,
  opt_tipo_documento_medico,
} from "@/store/generalInfo";
import { toast } from "react-toastify";
import { MedicoInterface } from "@/types/medico";
import { FiltersOptionsProps } from "../filter/FilterModal";

type CreateAffiliateModalProps = {
  selectsData: FiltersOptionsProps;
  med_id?: string;
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
};

export default function CreateMedicoModal({
  selectsData,
  med_id,
  isOpen,
  onClose,
  refresh,
}: CreateAffiliateModalProps) {
  const [medico, setMedico] = useState<MedicoInterface | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");

  const onChange = (name: string, value: any) => {
    onChangeCustome({
      value: value,
      name: name,
      form: medico,
      setForm: setMedico,
    });
  };

  // Esta función reemplaza un valor en un array de objetos de forma segura
  function handleListaChange<T>(
    field: string,
    index: number,
    key: keyof T,
    value: any,
    currentList: T[],
    onChange: (campo: string, valor: any) => void
  ) {
    const updatedList = [...currentList];
    updatedList[index] = {
      ...updatedList[index],
      [key]: value,
    };
    onChange(field, updatedList);
  }

  const handleSubmit = async () => {
    if (medico?.cedula) {
       try {
        const res = await authFetch("/api/medicos/send", {
          method: "PUT",
          body: JSON.stringify(medico),
        });

        const message = await res.json();

        if (res.ok) {
          toast.success(message?.message);
          refresh();
          onClose();
          return true;
        } else {
          toast.warning(message?.error || "No se pudo guardar el paciente");
          return false;
        }
      } catch (error) {
        toast.error("Error al enviar datos del Médico");
        console.error("Error:", error);
        return false;
      }
    } else {
      toast.warning("Número de cédula no válido");
      return false;
    }
  };

  const getNombreMedico = () => {
    return `${medico?.primerNombre || ""} ${medico?.segundoNombre || ""} ${
      medico?.primerApellido || ""
    } ${medico?.segundoApellido || ""}`;
  };

  useEffect(() => {
    const fetchMedico = async () => {
      try {
        const res = await authFetch(`/api/medicos/${med_id}`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("No se pudo obtener el paciente");
        }
        const data = await res.json();
        setMedico(data);
      } catch (error) {
        console.error("Error al obtener paciente:", error);
      } finally {
        setLoading(false);
      }
    };

    if (med_id) {
      setLoading(true);
      fetchMedico();
    }
  }, [med_id]);

  console.log("formData", medico);

  if (!isOpen) return null;

  return (
    <>
      <Modal
        title={medico?._id ? "Editar Informacion Médico" : "Nuevo Médico"}
        icon={<UserPlus className="mr-2 h-5 w-5 text-sky-500" />}
        isOpen={isOpen}
        setOpen={onClose}
        showActions={true}
        maxWidth={600}
        formId="form-edit-paciente"
        onSave={handleSubmit}
      >
        {loading && <BackdropSave message="cargando..." />}
        <form id="form-edit-paciente" className="xl:px-3">
          <div className="bg-blue-50 px-4 py-2.5 text-sm leading-tight font-nunnito text-gray-600 mb-2">
            Los campos marcados con <span className="text-red-500">*</span>
            {" son obligatorios "}
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <FormLabel>
                  Tipo Identificación <span className="text-red-500">*</span>
                </FormLabel>
                <select
                  value={medico?.tipoIdentificacion || ""}
                  name="tipoIdentificacion"
                  onChange={(e) => {
                    preventSend(e);
                    onChange(e?.target?.name, e?.target?.value);
                  }}
                  required
                >
                  <option value="" disabled>
                    Seleccione...
                  </option>
                  {opt_tipo_documento_medico?.map((item: any) => (
                    <option key={item?.value} value={item?.value}>
                      {item?.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FormLabel>
                  Identificación <span className="text-red-500">*</span>
                </FormLabel>
                <input
                  type="text"
                  value={medico?.cedula || ""}
                  name="cedula"
                  onChange={(e) => {
                    preventSend(e);
                    onChange(e?.target?.name, e?.target?.value);
                  }}
                  required
                />
              </div>

              <div>
                <FormLabel>
                  Nombres <span className="text-red-500">*</span>
                </FormLabel>
                <div className="flex flex-row gap-x-1">
                  <input
                    type="text"
                    value={medico?.primerNombre || ""}
                    name="primerNombre"
                    onChange={(e) => {
                      preventSend(e);
                      onChange(e?.target?.name, e?.target?.value);
                    }}
                    required
                  />
                  <input
                    type="text"
                    value={medico?.segundoNombre || ""}
                    name="segundoNombre"
                    onChange={(e) => {
                      preventSend(e);
                      onChange(e?.target?.name, e?.target?.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <FormLabel>
                  Apellidos <span className="text-red-500">*</span>
                </FormLabel>
                <div className="flex flex-row gap-x-1">
                  <input
                    type="text"
                    value={medico?.primerApellido || ""}
                    name="primerApellido"
                    onChange={(e) => {
                      preventSend(e);
                      onChange(e?.target?.name, e?.target?.value);
                    }}
                    required
                  />
                  <input
                    type="text"
                    value={medico?.segundoApellido || ""}
                    name="segundoApellido"
                    onChange={(e) => {
                      preventSend(e);
                      onChange(e?.target?.name, e?.target?.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-x-1">
                <div>
                  <FormLabel>Prefijo</FormLabel>
                  <input
                    type="text"
                    value={medico?.prefijo}
                    name="prefijo"
                    onChange={(e) => {
                      preventSend(e);
                      onChange(e?.target?.name, e?.target?.value);
                    }}
                  />
                </div>
                <div>
                  <FormLabel>Sufijo</FormLabel>
                  <input
                    type="text"
                    value={medico?.sufijo}
                    name="sufijo"
                    onChange={(e) => {
                      preventSend(e);
                      onChange(e?.target?.name, e?.target?.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <FormLabel>Usuario ID</FormLabel>
                <input
                  type="text"
                  value={medico?.usuarioID || ""}
                  name="usuarioID"
                  onChange={(e) => {
                    preventSend(e);
                    onChange(e?.target?.name, e?.target?.value);
                  }}
                />
              </div>

              <div className="flex flex-col justify-end sm:col-span-2">
                <FormLabel>Nombre completo</FormLabel>
                <div className="flex items-center min-h-6">
                  <span className=" text-sm leading-tight text-gray-500">{`${
                    medico?.prefijo || ""
                  } ${getNombreMedico() || ""} ${medico?.sufijo || ""} `}</span>
                </div>
              </div>
              <div>
                <FormLabel>RUC</FormLabel>
                <input
                  type="number"
                  value={medico?.ruc}
                  name="ruc"
                  onChange={(e) => {
                    preventSend(e);
                    onChange(e?.target?.name, e?.target?.value);
                  }}
                />
              </div>

              <div>
                <FormLabel>
                  Número de SENESCYT <span className="text-red-500">*</span>
                </FormLabel>
                <input
                  type="text"
                  value={medico?.tituloSenescyt}
                  name="tituloSenescyt"
                  onChange={(e) => {
                    preventSend(e);
                    onChange(e?.target?.name, e?.target?.value);
                  }}
                  required
                />
              </div>

              <div>
                <FormLabel>
                  Sexo <span className="text-red-500">*</span>
                </FormLabel>
                <select
                  value={medico?.sexo || ""}
                  name="sexo"
                  onChange={(e) => {
                    preventSend(e);
                    onChange(e?.target?.name, e?.target?.value);
                  }}
                  required
                >
                  <option value="" disabled>
                    Seleccione...
                  </option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMENINO">Femenino</option>
                </select>
              </div>

              <div>
                <FormLabel>Estado civil</FormLabel>
                <select
                  value={medico?.estadoCivil || ""}
                  name="estadoCivil"
                  onChange={(e) => {
                    preventSend(e);
                    onChange(e?.target?.name, e?.target?.value);
                  }}
                >
                  <option value="" disabled>
                    Seleccione...
                  </option>
                  {opt_estado_civil?.map((item: any) => (
                    <option key={item?.value} value={item?.value}>
                      {item?.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FormLabel>
                  Código Médico <span className="text-red-500">*</span>
                </FormLabel>
                <input
                  type="text"
                  value={medico?.codigoMedico || ""}
                  name="codigoMedico"
                  onChange={(e) => {
                    preventSend(e);
                    onChange(e?.target?.name, e?.target?.value);
                  }}
                  required
                />
              </div>

              <div>
                <FormLabel>Correo</FormLabel>
                <input
                  type="text"
                  value={medico?.correo || ""}
                  name="correo"
                  onChange={(e) => {
                    preventSend(e);
                    onChange(e?.target?.name, e?.target?.value);
                  }}
                />
              </div>
            </div>

            <div>
              <FormLabel>Especialidades</FormLabel>
              <div className="flex gap-2 items-end mb-2">
                <select
                  value={especialidadSeleccionada}
                  onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
                  className="flex-1"
                >
                  <option value="" disabled>
                    Seleccione una especialidad...
                  </option>
                  {selectsData?.especialidad?.map((item) => (
                    <option key={item.codigo} value={item.codigo}>
                      {item.nombre}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => {
                    const especialidad = selectsData?.especialidad?.find(
                      (esp) => esp.codigo === especialidadSeleccionada
                    );

                    if (!especialidad) return;

                    const yaExiste = (medico?.especialidad || []).some(
                      (e) => e.codigo === especialidad.codigo
                    );
                    if (yaExiste) return;

                    onChange("especialidad", [
                      ...(medico?.especialidad || []),
                      {
                        codigo: especialidad.codigo,
                        nombre: especialidad.nombre,
                        interconsulta: false,
                      },
                    ]);
                    setEspecialidadSeleccionada("");
                  }}
                >
                  Agregar
                </button>
              </div>

              {/* Tabla de especialidades */}
              {(medico?.especialidad || [])?.length > 0 ? (
                <table className="min-w-full text-sm border border-gray-300">
                  <thead className="bg-gray-100 ">
                    <tr>
                      <th className="text-left px-2 py-1 border font-semibold">
                        Código
                      </th>
                      <th className="text-left px-2 py-1 border font-semibold">
                        Nombre
                      </th>
                      <th className="text-center px-2 py-1 border font-semibold">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {medico?.especialidad?.map((esp, index) => (
                      <tr key={esp._id} className="border-t">
                        <td className="px-2 py-1 border">{esp.codigo}</td>
                        <td className="px-2 py-1 border">{esp.nombre}</td>

                        <td className="text-center border">
                          <button
                            type="button"
                            className="text-red-600 hover:underline"
                            onClick={() => {
                              const nuevos = [...(medico?.especialidad || [])];
                              nuevos.splice(index, 1);
                              onChange("especialidad", nuevos);
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No se han agregado especialidades aún.
                </p>
              )}
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
              {/* Teléfonos */}
              <div>
                <FormLabel>Teléfonos</FormLabel>
                <div className="flex flex-col gap-y-2 pl-3 ">
                  {medico?.telefonos?.map((tel, index) => (
                    <div
                      key={index}
                      className="flex flex-row items-center gap-x-2"
                    >
                      <span className="text-gray-600 font-semibold text-sm">
                        {index + 1}.
                      </span>
                      <input
                        type="text"
                        placeholder="Nombre"
                        value={tel.name}
                        onChange={(e) =>
                          handleListaChange(
                            "telefonos",
                            index,
                            "name",
                            e.target.value,
                            medico.telefonos || [],
                            onChange
                          )
                        }
                      />
                      <input
                        type="text"
                        placeholder="Número"
                        className="max-w-[200px]"
                        value={tel.number}
                        onChange={(e) =>
                          handleListaChange(
                            "telefonos",
                            index,
                            "number",
                            e.target.value,
                            medico.telefonos || [],
                            onChange
                          )
                        }
                      />
                      <button
                        type="button"
                        className=" text-red-500 hover:text-red-700 hover:bg-gray-100 p-1 rounded-full"
                        onClick={() => {
                          const nuevos = [...(medico.telefonos || [])];
                          nuevos.splice(index, 1);
                          onChange("telefonos", nuevos);
                        }}
                        title="Eliminar teléfono"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onChange("telefonos", [
                      ...(medico?.telefonos || []),
                      { name: "", number: "", descripcion: "" },
                    ])
                  }
                  className="text-sm text-blue-600 mt-1 hover:underline"
                >
                  + Agregar teléfono
                </button>
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
            <div>
              <div className="divide-y">
                {medico?.consultorios?.map((consul, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex flex-row justify-between items-center mb-1 mt-2">
                      <FormLabel>Consultorio {index + 1}</FormLabel>

                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 text-sm underline hover:no-underline"
                        onClick={() => {
                          const nuevos = [...(medico.consultorios || [])];
                          nuevos.splice(index, 1);
                          onChange("consultorios", nuevos);
                        }}
                        title="Eliminar consultorio"
                      >
                        Eliminar
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2 relative">
                      <input
                        type="text"
                        placeholder="Nombre"
                        value={consul.nombre}
                        onChange={(e) =>
                          handleListaChange(
                            "consultorios",
                            index,
                            "nombre",
                            e.target.value,
                            medico.consultorios || [],
                            onChange
                          )
                        }
                      />
                      <input
                        type="text"
                        placeholder="Ciudad"
                        value={consul.ciudad}
                        onChange={(e) =>
                          handleListaChange(
                            "consultorios",
                            index,
                            "ciudad",
                            e.target.value,
                            medico.consultorios || [],
                            onChange
                          )
                        }
                      />
                      <input
                        type="text"
                        placeholder="Dirección"
                        value={consul.direccion}
                        onChange={(e) =>
                          handleListaChange(
                            "consultorios",
                            index,
                            "direccion",
                            e.target.value,
                            medico.consultorios || [],
                            onChange
                          )
                        }
                      />
                      <input
                        type="text"
                        placeholder="Teléfono"
                        value={consul.telefono || ""}
                        onChange={(e) =>
                          handleListaChange(
                            "consultorios",
                            index,
                            "telefono",
                            e.target.value,
                            medico.consultorios || [],
                            onChange
                          )
                        }
                      />
                      <input
                        type="text"
                        placeholder="Latitud"
                        value={consul.latitud || ""}
                        onChange={(e) =>
                          handleListaChange(
                            "consultorios",
                            index,
                            "latitud",
                            e.target.value,
                            medico.consultorios || [],
                            onChange
                          )
                        }
                      />
                      <input
                        type="text"
                        placeholder="Longitud"
                        value={consul.longitud || ""}
                        onChange={(e) =>
                          handleListaChange(
                            "consultorios",
                            index,
                            "longitud",
                            e.target.value,
                            medico.consultorios || [],
                            onChange
                          )
                        }
                      />
                      <input
                        type="text"
                        placeholder="Detalle"
                        value={consul.detalle || ""}
                        onChange={(e) =>
                          handleListaChange(
                            "consultorios",
                            index,
                            "detalle",
                            e.target.value,
                            medico.consultorios || [],
                            onChange
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  onChange("consultorios", [
                    ...(medico?.consultorios || []),
                    {
                      nombre: "",
                      ciudad: "",
                      direccion: "",
                      telefono: "",
                      longitud: "",
                      latitud: "",
                      detalle: "",
                    },
                  ])
                }
                className="text-sm text-blue-600 mt-1 hover:underline"
              >
                + Agregar consultorio
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
