// components/adminPages/QuienesSomosAdmin.tsx
"use client";

import { useEffect, useState } from "react";
import { QuienessomosData } from "@/types/quienes-somos";
import Modal from "@/components/general/TailModal/TailModal";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import BackdropSave from "@/components/general/Backdrop/Backdrop";
import { BackgroundSectionTitle } from "@/components/website/BgSectionTitle";
import { Options } from "@/components/website/about/Options";
import MasonryGrid from "@/components/website/about/Gallery";
import AboutUsForm from "../admin/editor/quienesSomosForm";

export default function QuienesSomosAdmin() {
  const [data, setData] = useState<QuienessomosData | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin-panel/about");
        const json = await res.json();
        if (json && json.mainTitle) {
          setData(json);
        } else {
          toast.warn("Usando datos vacíos por defecto");
          setData({
            mainTitle: "",
            content: "",
            mision: "",
            vision: "",
            valores: "",
            gallery_photos: [],
            mainImagenUrl: "",
          });
        }
      } catch (err) {
        console.error(err)
        toast.error("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async (updated: QuienessomosData) => {
    try {
      const res = await fetch("/api/admin-panel/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        setData(updated);
        setOpen(false);
        toast.success("Guardado con éxito");
      } else {
        toast.error("Error al guardar");
      }
    } catch (err) {
      console.error(err)

      toast.error("No se pudo guardar");
    }
  };

  if (loading || !data) return <BackdropSave message="Cargando información..." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Editar Página Sobre Nosotros</h1>
        <Button onClick={() => setOpen(true)}>Editar Contenido</Button>
      </div>

      <div className="border p-4 rounded-md bg-white">
        <BackgroundSectionTitle
          title={data.mainTitle}
          content={data.content}
          imageUrl={data.mainImagenUrl}
        />
        <div className="my-4">
          <Options
            list={[
              { title: "Nuestra Misión", content: data.mision || "" },
              { title: "Nuestra Visión", content: data.vision || "" },
              { title: "Nuestros Valores", content: data.valores || "" },
            ]}
          />
        </div>
        <MasonryGrid list={data.gallery_photos} columns={5} bgColor="bg-gray-100" />
      </div>

      <Modal
        isOpen={open}
        setOpen={() => setOpen(false)}
        title="Editar Sobre Nosotros"
        onSave={() => null}
        showActions={false}
      >
        <AboutUsForm defaultValue={data} onSave={handleSave} />
      </Modal>
    </div>
  );
}
