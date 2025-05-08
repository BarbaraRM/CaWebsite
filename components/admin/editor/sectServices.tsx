"use client";
import { ServiciosSectiontype } from "@/types/home";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import ServiciosSection from "@/components/website/home/ServiciosSect";

export const ServicesPreviwew = ({
  data,
}: {
  data: ServiciosSectiontype;
}) => {
 
  return <ServiciosSection data={data} />;
};

interface Props {
  value: ServiciosSectiontype;
  onChange: (val: ServiciosSectiontype) => void;
}

export const ServicesForm = ({ value, onChange }: Props) => {
  const [form, setForm] = useState<ServiciosSectiontype>(value || { title: "", items: [] });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    onChange({ ...form, [name]: value });
  };

  const handleItemChange = (index: number, field: string, val: string) => {
    const newItems = [...(form.items || [])];
    newItems[index] = { ...newItems[index], [field]: val };
    setForm((prev) => ({ ...prev, items: newItems }));
    onChange({ ...form, items: newItems });
  };

  const addItem = () => {
    const updated = [...(form.items || []), { title: "", icon: "", href: "", content: "" }];
    setForm((prev) => ({ ...prev, items: updated }));
    onChange({ ...form, items: updated });
  };

  const removeItem = (index: number) => {
    const updated = [...(form.items || [])];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, items: updated }));
    onChange({ ...form, items: updated });
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        name="title"
        value={form?.title || ""}
        onChange={handleChange}
        placeholder="Título de la sección"
        required
      />

      {form?.items?.map((item, idx) => (
        <div key={idx} className="border rounded-md p-3 flex flex-col gap-2 bg-gray-50">
          <Input
            value={item.title}
            placeholder="Título del servicio"
            onChange={(e) => handleItemChange(idx, "title", e.target.value)}
          />
          <Input
            value={item.icon}
            placeholder="Icono en SVG (string)"
            onChange={(e) => handleItemChange(idx, "icon", e.target.value)}
          />
          <Input
            value={item.href}
            placeholder="Enlace (href)"
            onChange={(e) => handleItemChange(idx, "href", e.target.value)}
          />
          <TextareaAutosize
            value={item.content}
            onChange={(e) => handleItemChange(idx, "content", e.target.value)}
            placeholder="Contenido o descripción"
            minRows={2}
          />
          <div className="flex justify-end">
            <Button type="button" variant="destructive" onClick={() => removeItem(idx)}>
              Eliminar
            </Button>
          </div>
        </div>
      ))}

      <Button type="button" onClick={addItem}>
        Agregar servicio
      </Button>
    </div>
  );
};
