"use client";
import React from "react";
import { BackgroundSectionType } from "@/types/home";
import TextareaAutosize from "react-textarea-autosize";
import { BackgroundSection } from "@/components/website/home/BgSection";

export const BackgroundPreview = ({
  data,
}: {
  data: BackgroundSectionType;
}) => {
 
  return <BackgroundSection data={data} />;
};

interface Props {
  value: BackgroundSectionType;
  onChange: (val: BackgroundSectionType) => void;
}

export const BackgroundForm = ({ value, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<any>) => {
    onChange({ ...value, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index: number, field: string, val: string) => {
    const updatedItems = [...(value.items || [])];
    updatedItems[index][field] = val;
    onChange({ ...value, items: updatedItems });
  };

  const addItem = () => {
    onChange({
      ...value,
      items: [...(value.items || []), { icon: "", title: "", content: "" }],
    });
  };

  const removeItem = (index: number) => {
    const updatedItems = [...(value.items || [])];
    updatedItems.splice(index, 1);
    onChange({ ...value, items: updatedItems });
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        name="title"
        value={value.title || ""}
        onChange={handleChange}
        placeholder="Título"
      />
      <TextareaAutosize
        name="content"
        value={value.content || ""}
        onChange={handleChange}
        placeholder="Contenido"
        minRows={2}
      />
      <input
        type="text"
        name="background"
        value={value.background || ""}
        onChange={handleChange}
        placeholder="URL de fondo"
      />
      <div className="space-y-3">
        <label className="font-semibold">Ítems:</label>
        {(value.items || []).map((item, index) => (
          <div key={index} className="grid grid-cols-1 gap-2 border p-2 rounded">
            <input
              type="text"
              placeholder="Icono (svg o texto)"
              value={item.icon}
              onChange={(e) => handleItemChange(index, "icon", e.target.value)}
            />
            <input
              type="text"
              placeholder="Título"
              value={item.title || ""}
              onChange={(e) => handleItemChange(index, "title", e.target.value)}
            />
            <TextareaAutosize
              placeholder="Contenido"
              value={item.content || ""}
              onChange={(e) => handleItemChange(index, "content", e.target.value)}
              minRows={2}
            />
            <button type="button" onClick={() => removeItem(index)} className="text-red-500 text-sm underline">
              Eliminar ítem
            </button>
          </div>
        ))}
        <button type="button" onClick={addItem} className="text-blue-500 text-sm underline">
          + Agregar ítem
        </button>
      </div>
    </div>
  );
};
