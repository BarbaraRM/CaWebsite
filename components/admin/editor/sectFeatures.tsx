"use client";
import React from "react";
import {  FeatureSection } from "@/types/home";
import TextareaAutosize from "react-textarea-autosize";
import ExamenesSection from "@/components/website/home/ExamenSect";

export const FeaturesPreview = ({
  data,
}: {
  data: FeatureSection;
}) => {
 
  return <ExamenesSection data={data} />;
};

interface Props {
  value: FeatureSection;
  onChange: (val: FeatureSection) => void;
}

export const FeaturesForm = ({ value, onChange }: Props) => {
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
      items: [...(value.items || []), { iamgeUrl: "", label: "", color: "" }],
    });
  };

  const removeItem = (index: number) => {
    const updatedItems = [...(value.items || [])];
    updatedItems.splice(index, 1);
    onChange({ ...value, items: updatedItems });
  };

  const handleButtonChange = (e: React.ChangeEvent<any>) => {
    const button = value.button || {};
    onChange({
      ...value,
      button: { ...button, [e.target.name]: e.target.value },
    });
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

      <div className="space-y-2">
        <label className="font-semibold">Ítems:</label>
        {(value.items || []).map((item, idx) => (
          <div key={idx} className="grid grid-cols-1 gap-2 border p-2 rounded">
            <input
              type="text"
              placeholder="URL de imagen"
              value={item.iamgeUrl}
              onChange={(e) => handleItemChange(idx, "iamgeUrl", e.target.value)}
            />
            <input
              type="text"
              placeholder="Etiqueta"
              value={item.label}
              onChange={(e) => handleItemChange(idx, "label", e.target.value)}
            />
            <input
              type="text"
              placeholder="Color (opcional)"
              value={item.color || ""}
              onChange={(e) => handleItemChange(idx, "color", e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="text-red-500 text-sm underline"
            >
              Eliminar ítem
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="text-blue-500 text-sm underline"
        >
          + Agregar ítem
        </button>
      </div>

      <div className="border-t pt-4 mt-4 space-y-2">
        <label className="font-semibold">Botón:</label>
        <input
          type="text"
          name="label"
          placeholder="Texto del botón"
          value={value.button?.label || ""}
          onChange={handleButtonChange}
        />
        <input
          type="text"
          name="href"
          placeholder="Enlace del botón"
          value={value.button?.href || ""}
          onChange={handleButtonChange}
        />
      </div>
    </div>
  );
};
