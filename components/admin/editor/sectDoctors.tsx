"use client";
import React from "react";

import { BestDoctorsType } from "@/types/home";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BestDoctorsSection } from "@/components/website/home/BestDoctors";
import { useSimpleForm } from "@/hooks/useSimpleForm";
import { FormLabel } from "@/components/styled/Forms";

export const DoctorsPreview = ({
  data,
}: {
  data: BestDoctorsType;
}) => {
 
  return <BestDoctorsSection data={data} />;
};

interface Props {
  value: BestDoctorsType;
  onChange: (val: BestDoctorsType) => void;
}

export const DoctorsForm = ({ value, onChange }: Props) => {
  const { formData, handleChange, setFormData } = useSimpleForm<BestDoctorsType>(
    value || { title: "", items: [] }
  );

  const handleItemChange = (index: number, field: string, val: string) => {
    const updated = [...formData.items];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, items: updated });
    onChange({ ...formData, items: updated });
  };

  const addDoctor = () => {
    const updated = {
      ...formData,
      items: [...formData.items, { name: "", specialty: "", image: "" }],
    };
    setFormData(updated);
    onChange(updated);
  };

  const removeDoctor = (index: number) => {
    const updated = {
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    };
    setFormData(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
      <div>
        <FormLabel>
          Título <span className="text-red-500 ml-1">*</span>
        </FormLabel>
        <Input
          name="title"
          value={formData.title}
          onChange={(e) => {
            handleChange(e);
            onChange({ ...formData, title: e.target.value });
          }}
          required
        />
      </div>

      <div className="space-y-4">
        {formData.items.map((item, index) => (
          <div
            key={index}
            className="p-3 border rounded-md bg-gray-100 space-y-2"
          >
            <div>
              <FormLabel>
                Nombre <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <Input
                value={item.name}
                onChange={(e) => handleItemChange(index, "name", e.target.value)}
                required
              />
            </div>
            <div>
              <FormLabel>
                Especialidad <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <Input
                value={item.specialty}
                onChange={(e) => handleItemChange(index, "specialty", e.target.value)}
                required
              />
            </div>
            <div>
              <FormLabel>URL de Imagen</FormLabel>
              <Input
                value={item.image || ""}
                onChange={(e) => handleItemChange(index, "image", e.target.value)}
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeDoctor(index)}
            >
              Eliminar doctor
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addDoctor} variant="secondary">
          Agregar médico
        </Button>
      </div>
    </div>
  );
};
