"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authFetch } from "@/hooks/auth-fetch";
import { Edit, Loader2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UsuarioInterface } from "@/types/users";
import { getUserFullName } from "@/utils/user";
import { useAuth } from "@/hooks/use-auth";
import dayjs from "dayjs";
import { FormLabel } from "@/components/styled/Forms";
import PasswordModal from "@/components/perfiles/changePwd";
import FormAlertError from "@/components/general/Toast/FormAlert";
import md5 from "md5";


function PerfilPage() {
  const { user } = useAuth();

  const [showErrorCreating, setShowErrorCreating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [enabledEdit, setEnabledEdit] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [openPassword, setOpenPassword] = useState<boolean>(false);

  const [refresh, setRefresh] = useState<boolean>(true);
  const [formData, setFormData] = useState<UsuarioInterface | undefined>();
  const [profile, setProfile] = useState<UsuarioInterface | undefined>();

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (value && name) {
      let previo: any = { ...formData, [name]: value };
      setFormData(previo);
    }
  };

  const onClose = () => {
    setEnabledEdit(false);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await authFetch("/api/auth/user-manage/edit", {
        method: "PUT",
        body: JSON.stringify({ ...formData, _id: user?._id }),
      });

      const message = await res.json();
      if (res.ok) {
        toast.success(message?.message);
        setRefresh(true);
        setSending(false);
        onClose();
        setShowErrorCreating(false);
        return true;
      } else {
        throw new Error(message.error || "Error al crear el registro");
      }
    } catch (error: any) {
      setShowErrorCreating(true);
      setErrorMessage(error.toString());
      setSending(false);
      return false;
    }
  };

  const handlePasswordChange = async (
    currentPassword: string,
    newPassword: string
  ) => {
    console.log("currentPassword", currentPassword, "newPassword", newPassword)
    try {
      const res = await authFetch("/api/auth/user-manage/update-pwd", {
        method: "PUT",
        body: JSON.stringify({c: md5(currentPassword) , n: md5(newPassword)}),
      });

      const message = await res.json();
      if (res.ok) {
        toast.success(message?.message);
        setShowErrorCreating(false);
        return true;
      } else {
        throw new Error(message.error || "Error al crear el registro");
      }
    } catch (error: any) {
      setShowErrorCreating(true);
      setErrorMessage(error.toString());
      return false;
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await authFetch(`/api/auth/user-manage/${user?._id}`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("No se pudo obtener el paciente");
        }
        const data = await res.json();
        setFormData(data);
        setProfile(data);
      } catch (error) {
        setFormData(undefined);
        setProfile(undefined);
        console.error("Error al obtener paciente:", error);
      } finally {
        setLoading(false);
      }
      setRefresh(false)
    };
    if (refresh) {
      getData();
    }
  }, [refresh]);

  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <div className="pb-4">
      {/* Encabezado con fondo */}
      <div
        className="h-36 w-full bg-orange-50 bg-[url('/fondo-perfil.svg')] bg-repeat"
        style={{
          backgroundImage: `url("/bg/background.png")`,
          backgroundSize: "contain",
        }}
      >
        <div className="px-10 py-2 flex items-center gap-5 bg-white/70 w-full h-full">
          <div className="rounded-full border-[6px] border-yellow-400 overflow-hidden w-16 h-16 sm:w-24 sm:h-24 md:w-30 md:h-30">
            <img
              src="https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl md:text-3xl font-poppins font-semibold text-third">
              {getUserFullName(profile)}
            </h2>
            <p className="text-sm text-dark font-poppins">
              {profile?.email || ""}
            </p>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="pt-4 px-4 max-w-5xl 2xl:max-w-6xl mx-auto space-y-3">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 font-poppins leading-tight">
            Perfil de usuario
          </h3>
          <p className="text-sm text-gray-400 leading-tight">
            last update {dayjs(profile?.updatedAt)?.format("DD/MM/YYYY")}
          </p>
        </div>

        <form id="form-profile" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Información personal */}
            <Card className="h-fit">
              <CardHeader>
                <div className="flex flex-row justify-between">
                  <CardTitle>Información personal</CardTitle>
                  {enabledEdit ? (
                    <div className="flex flex-row gap-x-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-dark bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={sending}
                        form="form-profile"
                        className="min-w-[90px] justify-center text-center inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary-400 hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {sending ? (
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        ) : (
                          "Guardar"
                        )}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEnabledEdit(true)}
                      className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 border border-orange-500 px-2 py-1 rounded"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <fieldset
                  disabled={!enabledEdit}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm"
                >
                  <div>
                    <FormLabel>
                      Nombres
                      {enabledEdit && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </FormLabel>
                    <input
                      type="text"
                      value={formData?.name || ""}
                      className={enabledEdit ? "" : "readOnly"}
                      name="name"
                      onChange={(e) => {
                        onChange(e);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <FormLabel>
                      Apellidos
                      {enabledEdit && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </FormLabel>
                    <input
                      type="text"
                      value={formData?.lastname || ""}
                      className={enabledEdit ? "" : "readOnly"}
                      name="lastname"
                      onChange={(e) => {
                        onChange(e);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <FormLabel>
                      Cédula
                      {enabledEdit && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </FormLabel>
                    <input
                      type="text"
                      value={formData?.cedula || ""}
                      className={enabledEdit ? "" : "readOnly"}
                      name="cedula"
                      onChange={(e) => {
                        onChange(e);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <FormLabel>
                      Sesion activa
                      {enabledEdit && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </FormLabel>
                    <div className="flex items-center gap-1 mt-1">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-orange-500">
                        {"Usuario"}
                      </span>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <FormLabel>
                      Correo
                      {enabledEdit && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </FormLabel>
                    <input
                      type="text"
                      value={formData?.email || ""}
                      className={enabledEdit ? "" : "readOnly"}
                      name="email"
                      onChange={(e) => {
                        onChange(e);
                      }}
                      required
                    />
                  </div>
                </fieldset>
              </CardContent>
            </Card>

            {/* Información de la cuenta */}
            <div className="flex-1 flex-col">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>Datos de la Cuenta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <FormLabel>Usuario</FormLabel>
                      <input
                        type="text"
                        value={formData?.username || ""}
                        className={enabledEdit ? "" : "readOnly"}
                        name="name"
                        onChange={() => {}}
                        readOnly
                        required
                      />
                    </div>
                    <div className="mt-2 p-1 text-gray-600 font-light">
                      <p>
                        Creado el{" "}
                        {dayjs(profile?.createdAt)?.format("DD/MM/YYYY")}
                      </p>
                    </div>
                    {!enabledEdit && (
                      <button
                        onClick={(e:any) => {
                          e?.preventDefault();
                          setOpenPassword(true);
                        }}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded py-2 mt-2 font-medium"
                      >
                        Cambiar contraseña
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
              {showErrorCreating && (
                <div className="col-span-2">
                  <FormAlertError
                    title={errorMessage || "Error actualizando el usuario"}
                  />
                </div>
              )}
            </div>
          </div>
        </form>
        <PasswordModal
          isOpen={openPassword}
          onClose={() => setOpenPassword(false)}
          onPasswordChange={handlePasswordChange}
        />
      </div>
    </div>
  );
}
export default PerfilPage;
