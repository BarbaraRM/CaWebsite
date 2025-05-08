"use client";
import React from "react";
import { InformationSectionType } from "@/types/home";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import InformationSection from "@/components/website/home/Information";

export const InformationPreviwew = ({
  data,
}: {
  data: InformationSectionType;
}) => {
 
  return <InformationSection information={data} />;
};

interface Props {
  value: InformationSectionType;
  onChange: (val: InformationSectionType) => void;
}

export const InformationForm = ({ value, onChange }: Props) => {
  const update = (key: keyof InformationSectionType, val: any) => {
    onChange({ ...value, [key]: val });
  };

  const updateItem = (index: number, key: "icon" | "text", val: string) => {
    const items = [...(value.items || [])];
    items[index] = { ...items[index], [key]: val };
    onChange({ ...value, items });
  };

  const addItem = () => {
    const items = [...(value.items || []), { icon: "", text: "" }];
    onChange({ ...value, items });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Contenido</Label>
        <TextareaAutosize
          id="content"
          name="content"
          value={value.content || ""}
          onChange={(e) => update("content", e.target.value)}
          required
          placeholder="Escriba aqui.."
          minRows={2}
        />
      </div>
      <div>
        <Label>Items</Label>
        <div className="space-y-2">
          {(value.items || []).map((item, idx) => (
            <div key={idx} className="space-y-1 border p-2 rounded">
              <Input
                placeholder="Icono SVG"
                value={item.icon}
                onChange={(e) => updateItem(idx, "icon", e.target.value)}
              />
              <TextareaAutosize
                placeholder="Texto"
                value={item.text}
                onChange={(e) => updateItem(idx, "text", e.target.value)}
              />
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={addItem} className="mt-2">
          Agregar Item
        </Button>
      </div>
    </div>
  );
};
