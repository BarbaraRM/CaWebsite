"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function JobPostingForm() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-[#2e2e2e] text-xl font-medium">
          Título de la Postulación
        </Label>
        <Input id="title" placeholder="Escriba aquí..." className="border-[#e5e7eb] rounded-md p-3 h-14" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recipient" className="text-[#2e2e2e] text-xl font-medium">
          A Quien va dirigido
        </Label>
        <Input id="recipient" placeholder="Escriba aquí..." className="border-[#e5e7eb] rounded-md p-3 h-14" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="available" className="text-[#2e2e2e] text-xl font-medium">
            Disponible
          </Label>
          <div className="flex">
            <Input id="available" type="number" defaultValue="7" className="border-[#e5e7eb] rounded-l-md p-3 h-14" />
            <div className="flex items-center justify-center bg-gray-100 border border-l-0 border-[#e5e7eb] rounded-r-md px-4 h-14 text-[#6b7280]">
              día(s)
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate" className="text-[#2e2e2e] text-xl font-medium">
            Fecha de Inicio
          </Label>
          <div className="relative">
            <Input id="startDate" placeholder="dd/mm/yyyy" className="border-[#e5e7eb] rounded-md pl-10 p-3 h-14" />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]">
              <CalendarIcon className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate" className="text-[#2e2e2e] text-xl font-medium">
            Fecha de Fin
          </Label>
          <div className="relative">
            <Input id="endDate" placeholder="dd/mm/yyyy" className="border-[#e5e7eb] rounded-md pl-10 p-3 h-14" />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]">
              <CalendarIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-[#2e2e2e] text-xl font-medium">
          Descripción de la postulación
        </Label>
        <textarea
          id="description"
          placeholder="Escriba aquí..."
          className="border-[#e5e7eb] rounded-md p-3 min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills" className="text-[#2e2e2e] text-xl font-medium">
          Habilidades Requeridas
        </Label>
        <textarea id="skills" placeholder="Escriba aquí..." className="border-[#e5e7eb] rounded-md p-3 min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements" className="text-[#2e2e2e] text-xl font-medium">
          Requisitos
        </Label>
        <textarea
          id="requirements"
          placeholder="Escriba aquí..."
          className="border-[#e5e7eb] rounded-md p-3 min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="applicationLink" className="text-[#2e2e2e] text-xl font-medium">
          Enlace para postulación
        </Label>
        <Input id="applicationLink" placeholder="https://" className="border-[#e5e7eb] rounded-md p-3 h-14" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="note" className="text-[#2e2e2e] text-xl font-medium">
          Nota Importante
        </Label>
        <textarea id="note" placeholder="Escriba aquí..." className="border-[#e5e7eb] rounded-md p-3 min-h-[100px]" />
      </div>

      <div className="space-y-4 border-t border-gray-200 pt-6">
        <h2 className="text-[#2e2e2e] text-xl font-medium">Modelo de diseño de flyer</h2>
        <p className="text-[#6b7280]">Seleccione el modelo con el que desea crear el flyer de la vacante.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div
            className={`border-2 rounded-lg overflow-hidden cursor-pointer ${selectedTemplate === 1 ? "border-[#192f5d]" : "border-[#e5e7eb]"}`}
            onClick={() => setSelectedTemplate(1)}
          >
            <Image
              src="/placeholder.svg?height=200&width=150"
              alt="Template 1"
              width={150}
              height={200}
              className="w-full h-auto"
            />
          </div>
          <div
            className={`border-2 rounded-lg overflow-hidden cursor-pointer ${selectedTemplate === 2 ? "border-[#192f5d]" : "border-[#e5e7eb]"}`}
            onClick={() => setSelectedTemplate(2)}
          >
            <Image
              src="/placeholder.svg?height=200&width=150"
              alt="Template 2"
              width={150}
              height={200}
              className="w-full h-auto"
            />
          </div>
          <div
            className={`border-2 rounded-lg overflow-hidden cursor-pointer ${selectedTemplate === 3 ? "border-[#192f5d]" : "border-[#e5e7eb]"}`}
            onClick={() => setSelectedTemplate(3)}
          >
            <Image
              src="/placeholder.svg?height=200&width=150"
              alt="Template 3"
              width={150}
              height={200}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl" className="text-[#2e2e2e] text-xl font-medium">
          Imagen (URL)
        </Label>
        <Input id="imageUrl" placeholder="https://" className="border-[#e5e7eb] rounded-md p-3 h-14" />
      </div>
    </div>
  )
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}
