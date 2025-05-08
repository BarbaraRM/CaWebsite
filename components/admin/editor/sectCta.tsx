"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSimpleForm } from "@/hooks/useSimpleForm";
import { FormLabel } from "@/components/styled/Forms";
import { CtaSectionLast } from "@/components/website/home/CtaSection.tsx";
import TextareaAutosize from "react-textarea-autosize";

export const CtaPreview = ({
  data,
}: {
  data: any;
}) => {
 
  return <CtaSectionLast data={data} />;
};

interface Props {
  value?: {
    title?: string;
    description?: string;
    buttonText?: string;
    href?: string;
  };
  onChange: (val: any) => void;
}

export const CtaForm = ({ value, onChange }: Props) => {
  const { formData, handleChange } = useSimpleForm(
    value || {
      title: "¿Listo para cuidar tu salud?",
      description: "Estamos aquí para atenderte. Llámanos para más información, agenda tu consulta con nuestros especialistas o programa un procedimiento médico.",
      buttonText: "Contáctanos",
      href: "/contacto",
    }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onChange(formData);
      }}
      className="space-y-4 max-h-[65vh] overflow-y-auto pr-2"
    >
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
          minRows={2}
          placeholder="Escriba aquí..."
        />
      </div>

      <div>
        <FormLabel>
          Texto del botón
          <span className="text-red-500 ml-1">*</span>
        </FormLabel>
        <Input
          name="buttonText"
          value={formData.buttonText || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <FormLabel>Enlace</FormLabel>
        <Input
          name="href"
          value={formData.href || ""}
          onChange={handleChange}
        />
      </div>

      <Button type="submit">Guardar</Button>
    </form>
  );
};
