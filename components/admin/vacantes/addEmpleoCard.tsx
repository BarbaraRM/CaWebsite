"use client"

import { UserPlus } from "lucide-react"

export function AddEmpleoCard({ onClick }: { onClick: (e) => void }) {
  return (
    <div
      onClick={onClick}
      className="border-2 border-dashed border-[#6b6f7b] rounded-lg p-6 flex flex-col items-center justify-center h-full min-h-[300px] cursor-pointer hover:bg-[#efefef] transition-colors"
    >
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#efefef] mb-4">
        <UserPlus className="w-6 h-6 text-[#656575]" />
      </div>
      <h3 className="text-[#656575] text-lg font-medium text-center">Agregar Nueva Vacante</h3>
    </div>
  )
}
