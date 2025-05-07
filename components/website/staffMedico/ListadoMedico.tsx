import { MedicoInterface } from "@/types/medico";
import { Facebook, Globe, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

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
export function processSchedule(horario: MedicoInterface["horario"]): string[] {
  const scheduleMap: Record<string, string[]> = {};
  const diasOrden = ["lun", "mar", "mier", "jue", "vier", "sab", "dom"];

  for (const dia of diasOrden) {
    const schedule = horario?.[dia];
    if (schedule && schedule.start && schedule.end) {
      const key = `${schedule.start}-${schedule.end}`;
      if (!scheduleMap[key]) scheduleMap[key] = [];
      scheduleMap[key].push(dia);
    }
  }

  return Object.entries(scheduleMap).map(([key, dias]) => {
    const [start, end] = key.split("-");
    const formattedStart = formatTime(start);
    const formattedEnd = formatTime(end);

    const esLunAVier =
      dias.length === 5 && dias.every((dia, i) => dia === diasOrden[i]);

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
                      href={doctor?.socialMedia?.sitioWeb}
                      target="_blank"
                      className="text-[#656575] hover:text-[#f29200]"
                    >
                      <Globe size={18} />
                    </a>
                  )}

                  {doctor?.socialMedia?.whatsapp && (
                    <a
                      href={doctor?.socialMedia?.whatsapp}
                      target="_blank"
                      className="text-[#656575] hover:text-[#f29200]"
                    >
                      <svg
                        className="w-4 h-4 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
                          clipRule="evenodd"
                        />
                        <path
                          fill="currentColor"
                          d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
                        />
                      </svg>
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
