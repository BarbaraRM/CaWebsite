// forms/AboutUsForm.tsx
"use client";

import { QuienessomosData } from "@/types/quienes-somos";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { useSimpleForm } from "@/hooks/useSimpleForm";
import { useEffect } from "react";
import { FormLabel } from "@/components/styled/Forms";

export default function AboutUsForm({
  defaultValue,
  onSave,
}: {
  defaultValue?: QuienessomosData;
  onSave: (data: QuienessomosData) => void;
}) {
  const { formData, setFormData, handleChange } =
    useSimpleForm<QuienessomosData>(defaultValue || {
      mainTitle: "",
      content: "",
      mision: "",
      vision: "",
      valores: "",
      gallery_photos: [],
      mainImagenUrl: "",
    });

  useEffect(() => {
    if (defaultValue) setFormData(defaultValue);
  }, [defaultValue, setFormData]);

  const handleGalleryChange = (value: string, index: number) => {
    const updated = [...formData.gallery_photos];
    updated[index] = value;
    setFormData({ ...formData, gallery_photos: updated });
  };

  const addGalleryItem = () => {
    setFormData({
      ...formData,
      gallery_photos: [...formData.gallery_photos, ""],
    });
  };

  const removeGalleryItem = (index: number) => {
    const updated = formData.gallery_photos.filter((_, i) => i !== index);
    setFormData({ ...formData, gallery_photos: updated });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(formData);
      }}
      className="space-y-6 max-h-[70vh] overflow-y-auto pr-2"
    >
      <div>
        <FormLabel>
          Título Principal <span className="text-red-500 ml-1">*</span>
        </FormLabel>
        <Input
          name="mainTitle"
          value={formData.mainTitle}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <FormLabel>Contenido Principal</FormLabel>
        <TextareaAutosize
          name="content"
          value={formData.content || ""}
          onChange={handleChange}
          placeholder="Escriba aquí..."
          minRows={2}
        />
      </div>

      <div>
        <FormLabel>Imagen de Portada (URL)</FormLabel>
        <Input
          name="mainImagenUrl"
          value={formData.mainImagenUrl || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <FormLabel>Misión</FormLabel>
        <TextareaAutosize
          name="mision"
          value={formData.mision || ""}
          onChange={handleChange}
          placeholder="Escriba aquí..."
          minRows={2}
        />
      </div>

      <div>
        <FormLabel>Visión</FormLabel>
        <TextareaAutosize
          name="vision"
          value={formData.vision || ""}
          onChange={handleChange}
          placeholder="Escriba aquí..."
          minRows={2}
        />
      </div>

      <div>
        <FormLabel>Valores</FormLabel>
        <TextareaAutosize
          name="valores"
          value={formData.valores || ""}
          onChange={handleChange}
          placeholder="Escriba aquí..."
          minRows={2}
        />
      </div>

      <div className="space-y-2">
        <FormLabel>Galería de Imágenes</FormLabel>
        {formData.gallery_photos.map((url, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              value={url}
              onChange={(e) => handleGalleryChange(e.target.value, index)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeGalleryItem(index)}
            >
              Eliminar
            </Button>
          </div>
        ))}
        <Button type="button" size="sm" onClick={addGalleryItem}>
          Agregar imagen
        </Button>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit">Guardar cambios</Button>
      </div>
    </form>
  );
}
