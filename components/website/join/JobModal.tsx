"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Calendar, Info } from "lucide-react"
import Link from "next/link"

export interface JobDetails {
  id: number
  title: string
  deadline: string
  description: string
  targetAudience: string
  duration: string
  startDate: string
  endDate: string
  requiredSkills: string
  requirements: string
  applicationLink: string
  importantNote: string
}

interface JobModalProps {
  job: JobDetails
  isOpen: boolean
  onClose: () => void
}

export function JobModal({ job, isOpen, onClose }: JobModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[90dvw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2e2e2e]">{job.title}</DialogTitle>
          <DialogDescription className="text-[#656575]">Postula hasta el {job.deadline}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <h3 className="font-semibold text-[#2e2e2e] flex items-center gap-2">
              <Info size={16} /> Descripción de la postulación
            </h3>
            <p className="text-[#656575] text-sm">{job.description}</p>
          </div>

          <div className="grid gap-2">
            <h3 className="font-semibold text-[#2e2e2e]">A Quien va dirigido</h3>
            <p className="text-[#656575] text-sm">{job.targetAudience}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-1">
              <h3 className="font-semibold text-[#2e2e2e] text-sm">Duración</h3>
              <p className="text-[#656575] text-sm">{job.duration} día(s)</p>
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold text-[#2e2e2e] text-sm flex items-center gap-1">
                <Calendar size={14} /> Inicio
              </h3>
              <p className="text-[#656575] text-sm">{job.startDate}</p>
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold text-[#2e2e2e] text-sm flex items-center gap-1">
                <Calendar size={14} /> Fin
              </h3>
              <p className="text-[#656575] text-sm">{job.endDate}</p>
            </div>
          </div>

          <div className="grid gap-2">
            <h3 className="font-semibold text-[#2e2e2e]">Habilidades Requeridas</h3>
            <p className="text-[#656575] text-sm">{job.requiredSkills}</p>
          </div>

          <div className="grid gap-2">
            <h3 className="font-semibold text-[#2e2e2e]">Requisitos</h3>
            <p className="text-[#656575] text-sm">{job.requirements}</p>
          </div>

          {job.importantNote && (
            <div className="grid gap-2">
              <h3 className="font-semibold text-[#2e2e2e]">Nota Importante</h3>
              <p className="text-[#656575] text-sm">{job.importantNote}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Link
            href={job.applicationLink || "#"}
            target="_blank"
            className="bg-[#f29200] hover:bg-[#f59b11] text-white font-medium py-3 px-6 rounded transition-colors w-full md:w-fit text-center"
          >
            POSTULA AQUÍ
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
