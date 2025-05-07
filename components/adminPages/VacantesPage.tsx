"use client";

import TableCustomeHandle, {
  SearchInputHandle,
  TableCustomeHandleRef,
} from "@/components/general/Tables/TableCustomeHandle/TableCustomeHandle";
import FilterBtn, {
  GeneralFilterValues,
} from "@/components/general/Tables/filters/FilterBtn";
import {
  FiltersGeneralOptionsProps,
  GenericFilterModal,
} from "@/components/general/Tables/filters/GenericFilterModal";
import { TableTitles } from "@/components/general/Tables/interfaces/FetchParams";

import { authFetch } from "@/hooks/auth-fetch";
import { PlusIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MedicoInterface } from "@/types/medico";
import { AddDoctorCard } from "../admin/medicos/addDoctorCard";
import { DoctorCard } from "../admin/medicos/doctorCard";
import DoctorForm from "../admin/medicos/doctorForm";
import ViewMedicoModal from "../admin/medicos/doctorDetail";
import EmpleadoForm from "../admin/vacantes/empleoForm";

const titleTable: TableTitles[] = [
  { label: "Código", className: "!w-[200px] !pl-6 text-start" },
  { label: "Nombre", className: "!min-w-[100px] !pl-6 text-start" },
  { label: "Descripción", className: "!min-w-[100px] !pl-6 text-start" },
  { label: "Estado", className: "!w-[150px]" },
  { label: "Actions", className: "!w-[150px]" },
];

const fields = [
  { key: "codigo", label: "Codigo" },
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripcion" },
];

function VacantesPage() {
  const tablaRef = useRef<TableCustomeHandleRef>(null);
  const [filtersOptions, setFiltersOptions] =
    useState<FiltersGeneralOptionsProps>({});
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [selectedRegistro, setSelectedRegistro] = useState<
    MedicoInterface | undefined
  >(undefined);
  const [filters, setFilters] = useState<GeneralFilterValues | undefined>({});

  const onEdit = (item: MedicoInterface) => {
    setOpenNew(true);
    setSelectedId(item?._id);
    setSelectedRegistro(item);
  };

  const onSee = (item) =>{
    setOpenDetail(true);
    setOpenNew(false);
    setSelectedId(undefined);
    setSelectedRegistro(item);
  }

  const onOpenNew = (e: any) => {
    e?.preventDefault();
    setOpenNew(true);
    setSelectedId(undefined);
    setSelectedRegistro(undefined);
  };

  const applyFilters = () => {
    tablaRef?.current?.refreshData();
  };

  const onDelete = async (id: string) => {
    if (id) {
      try {
        const res = await authFetch("/api/medicos/delete", {
          method: "DELETE",
          body: JSON.stringify({ id }),
        });
  
        const message = await res.json();
  
        if (res.ok) {
          toast.success(message?.message || "Médico eliminado");
          tablaRef?.current?.refreshData();
          return true;
        } else {
          toast.warning(message?.error || "No se pudo eliminar el médico");
          return false;
        }
      } catch (error) {
        toast.error("Error al eliminar el médico");
        console.error("Error:", error);
        return false;
      }
    } else {
      console.error("Falta ID del médico");
    }
  };
  

  const onBlock = async (id: string) => {
    if (id) {
      try {
        const res = await authFetch("/api/medicos/hide", {
          method: "PUT",
          body: JSON.stringify({ id, visible: false }),
        });
  
        const message = await res.json();
  
        if (res.ok) {
          toast.success(message?.message || "Médico ocultado");
          tablaRef?.current?.refreshData();
          return true;
        } else {
          toast.warning(message?.error || "No se pudo ocultar el médico");
          return false;
        }
      } catch (error) {
        toast.error("Error al ocultar el médico");
        console.error("Error:", error);
        return false;
      }
    } else {
      console.error("Falta ID del médico");
    }
  };
  

  const onActive = async (id: string) => {
    if (id) {
      try {
        const res = await authFetch("/api/medicos/hide", {
          method: "PUT",
          body: JSON.stringify({ id, visible: true }),
        });
  
        const message = await res.json();
  
        if (res.ok) {
          toast.success(message?.message || "Médico visible nuevamente");
          tablaRef?.current?.refreshData();
          return true;
        } else {
          toast.warning(message?.error || "No se pudo activar el médico");
          return false;
        }
      } catch (error) {
        toast.error("Error al activar el médico");
        console.error("Error:", error);
        return false;
      }
    } else {
      console.error("Falta ID del médico");
    }
  };
  
  useEffect(() => {
    const getDataSet = async () => {
      setFiltersOptions({
        visibles: [
          { label: "Inactivo", value: "false" },
          { label: "Activo", value: "true" },
          { label: "Todos", value: undefined },
        ],
      });
    };
    getDataSet();
  }, []);

  return (
    <div className="px-4 pb-4 pt-2 flex flex-col gap-3 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TableCustomeHandle
          ref={tablaRef}
          titles={titleTable}
          multiplicador={5}
          api_url={"/api/medicos/get-all"}
          params={{
            filters: filters,
          }}
          containerClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          rowsPerPageOptions={[5, 10, 30]}
          searchName="products"
          isList
          newCard={<AddDoctorCard onClick={onOpenNew} />}
        >
          {(item: any, index: number) => {
            return <DoctorCard key={index} item={item} onEdit={onEdit} onSee={onSee} onDelete={onDelete} onBlock={onBlock} onActivate={onActive}/>;
          }}
        </TableCustomeHandle>
      </div>
      {openNew && (
        <EmpleadoForm
          item_id={selectedId}
          item={selectedRegistro}
          isOpen={openNew}
          onClose={() => {
            setOpenNew(false);
            setSelectedRegistro(undefined);
            setSelectedId(undefined);
          }}
          refresh={() => {
            tablaRef?.current?.refreshData();
          }}
        />
      )}
       {openDetail && selectedRegistro && (
        <ViewMedicoModal
          item={selectedRegistro}
          open={openDetail}
          onClose={() => {
            setOpenDetail(false);
            setSelectedRegistro(undefined);
          }}
        />
      )}
    </div>
  );
}

export default VacantesPage;
