"use client";

import TableCustomeHandle, {
  SearchInputHandle,
  TableCustomeHandleRef,
} from "@/components/general/Tables/TableCustomeHandle/TableCustomeHandle";
import FilterBtn from "@/components/general/Tables/filters/FilterBtn";
import { TableTitles } from "@/components/general/Tables/interfaces/FetchParams";
import {
  FiltersOptionsProps,
  MedicoFilterModal,
  MedicoFilterValues,
} from "@/components/admin/medicos/filter/FilterModal";
import MedicoRow from "@/components/admin/medicos/medicoRow";
import VerMedicoModal from "@/components/admin/medicos/newModal/DetalleModal";
import CreateMedicoModal from "@/components/admin/medicos/newModal/newMedico";
import { authFetch } from "@/hooks/auth-fetch";
import { PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const titleTable: TableTitles[] = [
  { label: "Cedula", className: "!w-[115px] !text-center" },
  { label: "Nombres", className: "!min-w-[130px]" },
  { label: "Especialidad", className: "!w-[100px]" },
  { label: "Correo", className: "!w-[115px]" },
  { label: "Código Médico", className: "!w-[145px] !min-w-[145px]" },
  { label: "Estado", className: "!w-[80px]" },
  { label: "Actions", className: "!w-[120px]" },
];


function MedicosPage() {
  const tablaRef = useRef<TableCustomeHandleRef>(null);
  const [filtersOptions, setFiltersOptions] = useState<FiltersOptionsProps>({});

  const [openNew, setOpenNew] = useState<boolean>(false);
  const [openSee, setOpenSee] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [filters, setFilters] = useState<MedicoFilterValues | undefined>({});

  const onEdit = (id: string) => {
    setOpenNew(true);
    setOpenSee(false);
    setSelectedId(id);
  };

  const onSeeDetails = (id: string) => {
    setOpenSee(true);
    setOpenNew(false);
    setSelectedId(id);
  };

  const onDelete = async (id: string) => {
    if (id) {
      try {
        const res = await authFetch("/api/medicos/delete", {
          method: "DELETE",
          body: JSON.stringify({ medico_id: id }),
        });

        const message = await res.json();

        if (res.ok) {
          toast.success(message?.message);
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
      console.error("Falta id del medico");
    }
  };

  const onActive = async (id: string) => {
    if (id) {
      try {
        const res = await authFetch("/api/medicos/activate", {
          method: "PUT",
          body: JSON.stringify({ medico_id: id }),
        });

        const message = await res.json();

        if (res.ok) {
          toast.success(message?.message);
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
      console.error("Falta id del medico");
    }
  };

  const applyFilters = () => {
    tablaRef?.current?.refreshData();
  };

  useEffect(() => {
    if (filters === undefined) {
      tablaRef?.current?.refreshData();
    }
  }, [filters]);

  useEffect(() => {
    const getDataSet = async () => {
      const resEspecialidades = await authFetch(
        "/api/especialidades/get-dataset",
        {
          method: "POST",
        }
      );
      const especialidadesT = await resEspecialidades.json();
      setFiltersOptions({
        visibles: [
          { label: "Inactivo", value: "false" },
          { label: "Activo", value: "true" },
          { label: "Todos", value: undefined },
        ],
        especialidad: especialidadesT,
      });
    };
    getDataSet();
  }, []);

  return (
    <div className="px-4 pb-4 pt-2 flex flex-col gap-3">
      <div className="text-sm sm:px-2 md:px-4 w-full sm:bg-white rounded-lg space-y-4">
        {/* Top Bar */}
        <div className="flex justify-between sm:justify-start  items-center gap-2 flex-wrap ">
          <div className="flex flex-row gap-x-2">
            <FilterBtn
              resetFilters={() => {
                setFilters(undefined);
              }}
            >
              <MedicoFilterModal
                onApplyFilters={applyFilters}
                filters={filters}
                setFilters={setFilters}
                filtersObject={filtersOptions}
              />
            </FilterBtn>

          </div>
          <div className=" flex-1 hidden md:flex justify-end">
            <SearchInputHandle
              placeholder={"Buscar Médicos..."}
              eventName={"affiliates"}
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
        <div className="md:hidden">
          <SearchInputHandle
            placeholder={"Search affiliates..."}
            eventName={"affiliates"}
          />
        </div>
      </div>

      <div>
        <TableCustomeHandle
          ref={tablaRef}
          titles={titleTable}
          multiplicador={25}
          api_url={"/api/medicos/get-all"}
          params={{
            filters: filters,
          }}
          rowsPerPageOptions={[25, 50, 75]}
          searchName="medicos"
          mobileViewType="list"
        >
          {(item: any, index: number) => {
            return (
              <MedicoRow
                key={index}
                item={item}
                onEdit={onEdit}
                onSeeDetails={onSeeDetails}
                onDelete={onDelete}
                onActive={onActive}
              />
            );
          }}
        </TableCustomeHandle>
      </div>
      {openNew && (
        <CreateMedicoModal
          selectsData={filtersOptions}
          med_id={selectedId}
          isOpen={openNew}
          onClose={() => {
            setOpenNew(false);
            setSelectedId(undefined);
          }}
          refresh={() => {
            tablaRef?.current?.refreshData();
          }}
        />
      )}
      {selectedId && openSee && (
        <VerMedicoModal
          med_id={selectedId}
          isOpen={openSee}
          onClose={() => {
            setOpenSee(false);
            setSelectedId(undefined);
          }}
        />
      )}
    </div>
  );
}

export default MedicosPage;
