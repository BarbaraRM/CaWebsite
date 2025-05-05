"use client";

import CreateGenericNewModal from "@/components/general/Tables/GenericBase/GenericNewModal";
import GenericBaseRow from "@/components/general/Tables/GenericBase/GenericRow";
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
import { TipoExamenInterface } from "@/types/globals";
import { PlusIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

const titleTable: TableTitles[] = [
  { label: "Código", className: "!w-[200px]" },
  { label: "Nombre", className: "!min-w-[100px]" },
  { label: "Descripción", className: "!min-w-[100px]" },
  { label: "Estado", className: "!w-[150px]" },
  { label: "Actions", className: "!w-[150px]" },
];


function DependenciasPage() {
  const tablaRef = useRef<TableCustomeHandleRef>(null);
  const [filtersOptions, setFiltersOptions] =
    useState<FiltersGeneralOptionsProps>({});
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [selectedRegistro, setSelectedRegistro] = useState<
    TipoExamenInterface | undefined
  >(undefined);

  const [filters, setFilters] = useState<GeneralFilterValues | undefined>({});

  const onEdit = (id: string, item: TipoExamenInterface) => {
    setOpenNew(true);
    setSelectedId(id);
    setSelectedRegistro(item);
  };

  const applyFilters = () => {
    tablaRef?.current?.refreshData();
  };

  const onDelete = async (id: string) => {
    if (id) {
      try {
        const res = await authFetch("/api/dependencias/delete", {
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
        const res = await authFetch("/api/dependencias/activate", {
          method: "DELETE",
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
              <GenericFilterModal
                onApplyFilters={applyFilters}
                filters={filters}
                setFilters={setFilters}
                filtersObject={filtersOptions}
              />
            </FilterBtn>

          </div>
          <div className=" flex-1 hidden md:flex justify-end">
            <SearchInputHandle
              placeholder={"Buscar Dependencia..."}
              eventName={"dependencias"}
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
            placeholder={"Buscar Dependencia..."}
            eventName={"dependencias"}
          />
        </div>
      </div>

      <div>
        <TableCustomeHandle
          ref={tablaRef}
          titles={titleTable}
          multiplicador={25}
          api_url={"/api/dependencias/get-all"}
          params={{
            filters: filters,
          }}
          rowsPerPageOptions={[25, 50, 75]}
          searchName="dependencias"
          mobileViewType="list"
        >
          {(item: any, index: number) => {
            return (
              <GenericBaseRow
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
        <CreateGenericNewModal
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
          fetchUrl={"/api/dependencias/send"}
          title={{
            new: "Crear Nueva Dependencia",
            edit: "Editar Dependencia",
          }}
        />
      )}
    </div>
  );
}

export default DependenciasPage;
