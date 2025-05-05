"use client";

import EspecialidadRow from "@/components/admin/especialidad/especialidadRow";
import CreateEspecModal from "@/components/admin/especialidad/newEspecialidad/CreateEspecModal";
import TableCustomeHandle, {
  SearchInputHandle,
  TableCustomeHandleRef,
} from "@/components/general/Tables/TableCustomeHandle/TableCustomeHandle";
import { TableTitles } from "@/components/general/Tables/interfaces/FetchParams";

import { authFetch } from "@/hooks/auth-fetch";
import { PlusIcon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const titleTable: TableTitles[] = [
  { label: "Código", className: "!w-[200px]" },
  { label: "Nombre", className: "!min-w-[100px]" },
  { label: "Estado", className: "!w-[150px]" },
  { label: "Actions", className: "!w-[150px]" },
];

function UsuariosPage() {
  const [openNew, setOpenNew] = useState<boolean>(false);
  const tablaRef = useRef<TableCustomeHandleRef>(null);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const onEdit = (id: string) => {
    setOpenNew(true);
    setSelectedId(id);
  };

  const onDelete = async (id: string) => {
    if (id) {
      try {
        const res = await authFetch("/api/especialidades/delete", {
          method: "DELETE",
          body: JSON.stringify({ registro_id: id }),
        });

        const message = await res.json();

        if (res.ok) {
          toast.success(message?.message);
          tablaRef?.current?.refreshData();
          return true;
        } else {
          toast.warning(message?.error || "No se pudo eliminar el registro");
          return false;
        }
      } catch (error) {
        toast.error("Error al eliminar el registro");
        console.error("Error:", error);
        return false;
      }
    } else {
      console.error("Falta id del registro");
    }
  };

  const onActive = async (id: string) => {
    if (id) {
      try {
        const res = await authFetch("/api/especialidades/activate", {
          method: "PUT",
          body: JSON.stringify({ registro_id: id }),
        });

        const message = await res.json();

        if (res.ok) {
          toast.success(message?.message);
          tablaRef?.current?.refreshData();
          return true;
        } else {
          toast.warning(message?.error || "No se pudo activar el registro");
          return false;
        }
      } catch (error) {
        toast.error("Error al activar el registro");
        console.error("Error:", error);
        return false;
      }
    } else {
      console.error("Falta id del registro");
    }
  };

  return (
    <div className="px-4 pb-4 pt-2 flex flex-col gap-3">
      <div className="text-sm sm:px-2 md:px-4 w-full sm:bg-white rounded-lg space-y-4">
        {/* Top Bar */}
        <div className="flex justify-between sm:justify-start  items-center gap-2 flex-wrap-reverse ">
          <div className=" flex-1 flex justify-end">
            <SearchInputHandle
              placeholder={"Buscar especialidad..."}
              eventName={"especialidades"}
            />
          </div>

          <button
            onClick={(e) => {
              e?.preventDefault();
              setOpenNew(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary-400 hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nuevo
          </button>
        </div>
      </div>

      <div>
        <TableCustomeHandle
          ref={tablaRef}
          titles={titleTable}
          multiplicador={25}
          api_url={"/api/especialidades/get-all"}
          rowsPerPageOptions={[25, 50, 75]}
          searchName="especialidades"
          mobileViewType="list"
        >
          {(item: any, index: number) => {
            return (
              <EspecialidadRow
                key={index}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
                onActive={onActive}
              />
            );
          }}
        </TableCustomeHandle>
      </div>
      {openNew && (
        <CreateEspecModal
          item_id={selectedId}
          isOpen={openNew}
          onClose={() => setOpenNew(false)}
          refresh={() => {
            tablaRef?.current?.refreshData();
          }}
        />
      )}
    </div>
  );
}

export default UsuariosPage;
