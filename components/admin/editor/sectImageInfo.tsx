"use client";
import React, { useState } from "react";
import { ImgDetailSection } from "@/types/home";
import ImageInfoSection from "@/components/website/home/InfoImageSection";
import TextareaAutosize from "react-textarea-autosize";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/styled/Forms";

export const ImageInfoPreview = ({ data }: { data: ImgDetailSection }) => {
  return <ImageInfoSection data={data} />;
};

interface Props {
  value: ImgDetailSection;
  onChange: (val: ImgDetailSection) => void;
}

export const ImageInfoForm = ({ value, onChange }: Props) => {
  const [formData, setFormData] = useState<ImgDetailSection>(value);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      onChange(updated);
      return updated;
    });
  };

  const handleListChange = (index: number, value: string) => {
    const updatedItems = [...(formData.listItems || [])];
    updatedItems[index] = value;
    const updated = { ...formData, listItems: updatedItems };
    setFormData(updated);
    onChange(updated);
  };

  const addListItem = () => {
    const updated = {
      ...formData,
      listItems: [...(formData.listItems || []), ""],
    };
    setFormData(updated);
    onChange(updated);
  };

  const removeListItem = (index: number) => {
    const updatedItems =
      formData.listItems?.filter((_, i) => i !== index) || [];
    const updated = { ...formData, listItems: updatedItems };
    setFormData(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-4 px-3">
      <div className="flex flex-col gap-y-2">
        <div>
          <FormLabel>
            Título
            <span className="text-red-500 ml-1">*</span>
          </FormLabel>
          <Input
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <FormLabel>Descripción</FormLabel>
          <TextareaAutosize
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Escriba aquí..."
            minRows={2}
          />
        </div>

        <div>
          <FormLabel>
            Imagen (URL)
            <span className="text-red-500 ml-1">*</span>
          </FormLabel>
          <Input
            name="imageSrc"
            value={formData.imageSrc || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <FormLabel>Posición de la imagen</FormLabel>
          <select
            name="imagePosition"
            value={formData.imagePosition || "right"}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="left">Izquierda</option>
            <option value="right">Derecha</option>
          </select>
        </div>
      </div>
      <hr />

      <div className="">
        <p className="font-bold mb-1">
          Elementos de la lista{" "}
          <span className="text-gray-400">(Opcional)</span>{" "}
        </p>
        <div className="space-y-2">
          {formData.listItems?.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                value={item}
                onChange={(e) => handleListChange(index, e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeListItem(index)}
              >
                Quitar
              </Button>
            </div>
          ))}
          <Button type="button" size="sm" onClick={addListItem}>
            Añadir ítem
          </Button>
        </div>
      </div>
      <hr />

      <div className="flex flex-col gap-y-2">
        <div>
          <p className="font-bold mb-1">Datos del Botón </p>
          <FormLabel>Texto</FormLabel>
          <Input
            name="button.label"
            value={formData.button?.label || ""}
            onChange={(e) => {
              const updated = {
                ...formData,
                button: { ...formData.button, label: e.target.value },
              };
              setFormData(updated);
              onChange(updated);
            }}
          />
        </div>

        <div>
          <FormLabel>Enlace</FormLabel>
          <Input
            name="button.href"
            value={formData.button?.href || ""}
            onChange={(e) => {
              const updated = {
                ...formData,
                button: { ...formData.button, href: e.target.value },
              };
              setFormData(updated);
              onChange(updated);
            }}
          />
        </div>

        <div>
          <FormLabel>Color</FormLabel>
          <select
            name="button.color"
            value={formData.button?.color || "orange"}
            onChange={(e) => {
              const updated = {
                ...formData,
                button: { ...formData.button, color: e.target.value as any },
              };
              setFormData(updated);
              onChange(updated);
            }}
            className="w-full border rounded-md p-2"
          >
            <option value="orange">Naranja</option>
            <option value="dark">Oscuro</option>
            <option value="blue">Azul</option>
          </select>
        </div>
      </div>
    </div>
  );
};
