import { Eye, Edit, EyeOff } from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";
import { MedicoInterface } from "@/types/medico";
import DeleteButton from "@/components/general/DeleteButton/DeleteButton";
import { OfertaLaboral } from "@/types/oferta";
import dayjs from "dayjs";

interface Props {
  item: OfertaLaboral;
  onEdit: (item: MedicoInterface) => void;
  onSee: (item: MedicoInterface) => void;
  onDelete: (id: string) => void;
  onBlock: (id: string) => void;
  onActivate: (id: string) => void;
}
export function EmpleoCard({
  item,
  onEdit,
  onSee,
  onDelete,
  onBlock,
  onActivate,
}: Props) {
  return (
    <div className="m-1 bg-white rounded-lg shadow-md overflow-hidden border-gray-50 border flex flex-col">
      <div className="relative">
        <div className="w-full flex justify-center pt-6 pb-2">
          <div className="relative w-full">
            <img
              src={item?.imageUrl || "/doctors/default.png"}
              alt="Doctor profile"
              className="h-[150px] max-h-[150px] md:h-[200px] md:max-h-[200px] overflow-hidden w-full object-cover object-top"
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
        <h3 className="text-base font-bold text-[#030a14]">
          {item?.title || ""}
        </h3>
        <p className="text-[#656575] text-sm">{`${
          item?.startDate ? dayjs(item?.startDate)?.format("DD/MM/YYYY") : ""
        }${item?.startDate && item?.endDate ? " - " : ""}${
          item?.endDate ? dayjs(item?.endDate)?.format("DD/MM/YYYY") : ""
        }
        `}</p>

        <p className="text-sm leading-tight line-clamp-3 mt-2 text-justify text-gray-600">
          <b>Descripción:</b> {item?.description}
        </p>
        {item?.applicationLink && (
          <div className="w-full flex flex-row items-center ">
            <a
              className="text-blue-500 underline cursor-pointer text-sm text-start hover:no-underline hover:text-blue-600"
              href={item?.applicationLink}
              target="_blank"
            >
              Enlace para postulacion
            </a>
          </div>
        )}
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
            title="Ocultar vacante en Sitio Web?"
            content="Este médico dejará de estar visible en la página Web, puede volver a habilitarlo cuando desee."
            okText="Si, ocultar"
            noText="Cancelar"
          />
        ) : (
          <DeleteButton
            htmlTitle="Mostrar vacante en Sitio Web"
            onActivate={(e) => {
              e?.preventDefault();
              onActivate(item?._id || "");
            }}
            isActive
            title="Activar vacante en Sitio Web?"
            content="Esta vacante estará visible en la página Web, puede volver a ocultarlo cuando desee."
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
          htmlTitle="Eliminar vacante"
          onAccept={(e) => {
            e?.preventDefault();
            onDelete(item?._id || "");
          }}
          title="Eliminar vacante permanentemente?"
          content="Esta vacante dejará de estar disponible en página web y sus datos ya no quedarán guardados en la base de datos. Esta accion es irreversible"
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
