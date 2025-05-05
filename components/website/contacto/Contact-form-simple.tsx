"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextareaAutosize from "react-textarea-autosize";

export default function ContactFormSimple({}) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Envíanos un mensaje</h2>
      
      <form
        action="https://formsubmit.co/barbararomero.clinica@gmail.com"
        method="POST"
        className="space-y-6"
      >
        {/* Formsubmit hidden inputs */}
        <input type="hidden" name="_subject" value={formData.asunto || "Nuevo mensaje desde el formulario"} />
        {/* <input type="hidden" name="_next" value="https://example.com/gracias" /> */}
        <input type="hidden" name="_captcha" value="false" />

        <div className="space-y-2">
          <Label htmlFor="name">Nombre completo *</Label>
          <Input
            id="name"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="telefono"
              type="tel"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="(123) 456-7890"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Asunto *</Label>
          <Input
            id="subject"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            placeholder="Asunto de tu mensaje"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensaje *</Label>
          <TextareaAutosize
            id="message"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
            placeholder="Escribe tu mensaje aquí..."
            minRows={2}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#f59b11] hover:bg-[#e08a00] text-white"
        >
          Enviar mensaje
        </Button>
      </form>
    </div>
  );
}
