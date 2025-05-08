import Image from "next/image";
import {
  Eye,
  Edit,
  Facebook,
  Instagram,
  Twitter,
  Globe,
  Linkedin,
  EyeOff,
} from "lucide-react";

import { SocialButton } from "@/components/ui/social-button";
import { ActionButton } from "@/components/ui/action-button";
import { MedicoInterface } from "@/types/medico";
import { processSchedule } from "@/components/website/staffMedico/ListadoMedico";
import DeleteButton from "@/components/general/DeleteButton/DeleteButton";

interface Props {
  item: MedicoInterface;
  onEdit: (item: MedicoInterface) => void;
  onSee: (item: MedicoInterface) => void;
  onDelete: (id: string) => void;
  onBlock: (id: string) => void;
  onActivate: (id: string) => void;
}
export function DoctorCard({
  item,
  onEdit,
  onSee,
  onDelete,
  onBlock,
  onActivate,
}: Props) {
  const formattedSchedules = processSchedule(item?.horario);

  return (
    <div className="m-1 bg-white rounded-lg shadow-md overflow-hidden border-gray-50 border flex flex-col">
      <div className="relative">
        <div className="w-full flex justify-center pt-6 pb-2">
          <div className="w-[120px] h-[120px]">
            <Image
              src={item?.imagen || "/doctors/default.png"}
              alt="Doctor profile"
              width={128}
              height={128}
              className="rounded-full object-cover"
            />
          </div>
        </div>
        <div className="absolute top-4 right-4 z-50">
          <span
            className={`absolute top-4 right-4 py-1 px-4 rounded-full text-xs font-medium ${
              item?.visible
                ? "bg-[#dcfce7] text-[#15803d]"
                : "bg-[#ffcace] text-[#7d1921]"
            }`}
          >
            {`${item?.visible ? "Activo" : "Oculto"}`}
          </span>
        </div>
      </div>

      <div className="flex-1 px-4 text-center">
        <h3 className="text-base font-bold text-[#030a14]">{`${
          item?.sufix ? ` ${item?.sufix}. ` : ""
        }${item?.nombre || ""} ${item?.apellido || ""}`}</h3>
        <p className="text-[#656575] text-sm">{item?.especialidad || ""}</p>
        {formattedSchedules?.length > 0 && (
          <div className="text-[#656575] text-sm mb-1 flex flex-row">
            <p className="leading-tight">
              {`Atención: ${formattedSchedules?.join(", ")}`}
            </p>
          </div>
        )}
      </div>

      <div className="px-4 py-1 w-full pt-2 mt-auto flex flex-row gap-x-1 items-center">
        <span className="text-gray-500 mr-1 text-sm font-semibold ">
          Contacto
        </span>
        <div className="flex justify-center space-x-4">
          {item?.socialMedia?.sitioWeb && (
            <SocialButton
              href={item?.socialMedia?.sitioWeb}
              icon={<Globe size={16} />}
            />
          )}

          {item?.socialMedia?.whatsapp && (
            <SocialButton
              href={item?.socialMedia?.whatsapp}
              icon={
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
                    clipRule="evenodd"
                  />
                  <path
                    fill="currentColor"
                    d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
                  />
                </svg>
              }
            />
          )}
          {item?.socialMedia?.facebook && (
            <SocialButton
              href={item?.socialMedia?.facebook}
              icon={<Facebook size={16} />}
            />
          )}
          {item?.socialMedia?.instagram && (
            <SocialButton
              href={item?.socialMedia?.instagram}
              icon={<Instagram size={16} />}
            />
          )}
          {item?.socialMedia?.linkedin && (
            <SocialButton
              href={item?.socialMedia?.linkedin}
              icon={<Linkedin size={16} />}
            />
          )}
          {item?.socialMedia?.tiktok && (
            <SocialButton
              href={item?.socialMedia?.tiktok}
              icon={<Twitter size={16} />}
            />
          )}
        </div>
      </div>

      <div className="border-t border-[#efefef] mt-1"></div>

      <div className="px-2 py-2 flex justify-center gap-4">
        {item?.visible ? (
          <DeleteButton
            htmlTitle="Ocultar médico en Sitio Web"
            onAccept={(e) => {
              e?.preventDefault();
              onBlock(item?._id || "");
            }}
            icon={<EyeOff size={16} />}
            color="gray"
            title="Ocultar médico en Sitio Web?"
            content="Este médico dejará de estar visible en la página Web, puede volver a habilitarlo cuando desee."
            okText="Si, ocultar"
            noText="Cancelar"
          />
        ) : (
          <DeleteButton
            htmlTitle="Mostrar médico en Sitio Web"
            onActivate={(e) => {
              e?.preventDefault();
              onActivate(item?._id || "");
            }}
            isActive
            title="Activar médico en Sitio Web?"
            content="Este médico estará visible en la página Web, puede volver a ocultarlo cuando desee."
            okText="Si, activarr"
            noText="Cancelar"
          />
        )}
        <ActionButton
          title="Ver detalles"
          icon={<Eye size={16} />}
          color="blue"
          onClick={() => {
            onSee(item);
          }}
        />
        <DeleteButton
          htmlTitle="Eliminar médico"
          onAccept={(e) => {
            e?.preventDefault();
            onDelete(item?._id || "");
          }}
          title="Eliminar médico permanentemente?"
          content="Este médico dejará de estar disponible en página web y sus datos ya no quedarán guardados en la base de datos. Esta accion es irreversible"
          okText="Eliminar"
          noText="Cancelar"
        />
        <ActionButton
          title="Editar médico"
          icon={<Edit size={16} />}
          color="orange"
          onClick={() => {
            onEdit(item);
          }}
        />
      </div>
    </div>
  );
}
