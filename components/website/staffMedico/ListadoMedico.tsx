import { MedicoInterface } from "@/types/medico";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: "easeOut",
    },
  }),
};

// Función para convertir formato 24h a 12h (am/pm)
function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = Number.parseInt(hours, 10);

  if (hour === 0) {
    return `12${minutes !== "00" ? `:${minutes}` : ""}am`;
  } else if (hour === 12) {
    return `12${minutes !== "00" ? `:${minutes}` : ""}pm`;
  } else if (hour > 12) {
    return `${hour - 12}${minutes !== "00" ? `:${minutes}` : ""}pm`;
  } else {
    return `${hour}${minutes !== "00" ? `:${minutes}` : ""}am`;
  }
}

// Función para procesar y formatear los horarios
function processSchedule(horario: MedicoInterface["horario"]): string[] {
    const scheduleMap: Record<string, string[]> = {};
    const diasOrden = ["lun", "mar", "mier", "jue", "vier", "sab", "dom"];
  
    for (const dia of diasOrden) {
      const schedule = horario[dia];
      if (schedule) {
        const key = `${schedule.start}-${schedule.end}`;
        if (!scheduleMap[key]) scheduleMap[key] = [];
        scheduleMap[key].push(dia);
      }
    }
  
    return Object.entries(scheduleMap).map(([key, dias]) => {
      const [start, end] = key.split("-");
      const formattedStart = formatTime(start);
      const formattedEnd = formatTime(end);
  
      // Detectar si los días son exactamente lun-vier
      const esLunAVier =
        dias.length === 5 &&
        dias.every((dia, i) => dia === diasOrden[i]);
  
      let formattedDays = "";
      if (esLunAVier) {
        formattedDays = "lun a vier";
      } else if (dias.length === 1) {
        formattedDays = dias[0];
      } else if (dias.length === 2) {
        formattedDays = `${dias[0]} y ${dias[1]}`;
      } else {
        const last = dias[dias.length - 1];
        formattedDays = `${dias.slice(0, -1).join(", ")} y ${last}`;
      }
  
      return `${formattedDays} ${formattedStart} a ${formattedEnd}`;
    });
  }
  

function ListadoMedico({
  medicos,
}: {
  medicos?: MedicoInterface[] | undefined;
}) {
  return (
    <div className="flex flex-col items-center px-5 pt-6 pb-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 max-w-[1300px] w-full">
      {medicos?.map((doctor: MedicoInterface, index) => {
        const formattedSchedules = processSchedule(doctor.horario);
        return (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <Image
                src={doctor.imagen || "/placeholder.svg"}
                alt={`${doctor.sufix} ${doctor.nombre} ${doctor.apellido}`}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <h3 className="text-[#2e2e2e] font-bold text-xl">
              {doctor.sufix} {doctor.nombre} {doctor.apellido}
            </h3>
            <p className="text-[#f29200] font-medium mb-2">
              {doctor.especialidad}
            </p>

            <div className="text-[#656575] text-sm mb-4">
              <p className="font-medium">Atención:</p>
              {formattedSchedules.map((schedule, idx) => (
                <p key={idx} className="text-center">
                  {schedule}
                </p>
              ))}
            </div>

            <div className="w-full border-t border-gray-200 pt-4 mt-auto">
              <div className="flex justify-center space-x-4">
                {doctor?.socialMedia?.whatsapp && (
                  <a
                    href={doctor?.socialMedia?.whatsapp}
                    target="_blank"
                    className="text-[#656575] hover:text-[#f29200]"
                  >
                    {/* WhatsApp SVG aquí */}
                  </a>
                )}
                {doctor?.socialMedia?.facebook && (
                  <a
                    href={doctor?.socialMedia?.facebook}
                    target="_blank"
                    className="text-[#656575] hover:text-[#f29200]"
                  >
                    <Facebook size={18} />
                  </a>
                )}
                {doctor?.socialMedia?.instagram && (
                  <a
                    href={doctor?.socialMedia?.instagram}
                    target="_blank"
                    className="text-[#656575] hover:text-[#f29200]"
                  >
                    <Instagram size={18} />
                  </a>
                )}
                {doctor?.socialMedia?.linkedin && (
                  <a
                    href={doctor?.socialMedia?.linkedin}
                    target="_blank"
                    className="text-[#656575] hover:text-[#f29200]"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {doctor?.socialMedia?.tiktok && (
                  <a
                    href={doctor?.socialMedia?.tiktok}
                    target="_blank"
                    className="text-[#656575] hover:text-[#f29200]"
                  >
                    <Twitter size={18} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
  );
}

export default ListadoMedico;
