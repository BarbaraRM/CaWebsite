"use client";

import TableCustomeHandle, {
  TableCustomeHandleRef,
} from "@/components/general/Tables/TableCustomeHandle/TableCustomeHandle";
import { authFetch } from "@/hooks/auth-fetch";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { MedicoInterface } from "@/types/medico";
import EmpleadoForm from "../admin/vacantes/empleoForm";
import { EmpleoCard } from "../admin/vacantes/empleoCard";
import { AddEmpleoCard } from "../admin/vacantes/addEmpleoCard";
import DetalleVacanteModal from "../admin/vacantes/empleoDetail";


function VacantesPage() {
  const tablaRef = useRef<TableCustomeHandleRef>(null);
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [selectedRegistro, setSelectedRegistro] = useState<
    MedicoInterface | undefined
  >(undefined);

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


  const onDelete = async (id: string) => {
    if (!id) return console.error("Falta ID de la vacante");

    try {
      const res = await authFetch("/api/vacantes/delete", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data?.message || "Vacante eliminada");
        tablaRef.current?.refreshData();
      } else {
        toast.warning(data?.error || "No se pudo eliminar");
      }
    } catch (err) {
      toast.error("Error al eliminar la vacante");
      console.error(err);
    }
  };

  const onBlock = async (id: string) => {
    try {
      const res = await authFetch("/api/vacantes/toggle", {
        method: "PUT",
        body: JSON.stringify({ id, visible: false }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data?.message || "Vacante ocultada");
        tablaRef.current?.refreshData();
      } else {
        toast.warning(data?.error || "No se pudo ocultar");
      }
    } catch (err) {
      toast.error("Error al ocultar la vacante");
      console.error(err);
    }
  };

  const onActive = async (id: string) => {
    try {
      const res = await authFetch("/api/vacantes/toggle", {
        method: "PUT",
        body: JSON.stringify({ id, visible: true }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data?.message || "Vacante publicada");
        tablaRef.current?.refreshData();
      } else {
        toast.warning(data?.error || "No se pudo publicar");
      }
    } catch (err) {
      toast.error("Error al publicar la vacante");
      console.error(err);
    }
  };

  return (
    <div className="px-4 pb-4 pt-2 flex flex-col gap-3 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TableCustomeHandle
          ref={tablaRef}
          titles={[]}
          multiplicador={5}
          api_url={"/api/vacantes/get-all"}
          containerClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          rowsPerPageOptions={[5, 10, 30]}
          searchName="products"
          isList
          newCard={<AddEmpleoCard onClick={onOpenNew} />}
        >
          {(item: any, index: number) => {
            return <EmpleoCard key={index} item={item} onEdit={onEdit} onSee={onSee} onDelete={onDelete} onBlock={onBlock} onActivate={onActive}/>;
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
        <DetalleVacanteModal
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
