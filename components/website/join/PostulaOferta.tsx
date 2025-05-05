"use client";

import { motion } from "framer-motion";

export default function PostulaOferta() {
  return (
    <div className="relative w-full">
      {/* Split background */}
      <div className="absolute inset-0">
        <div className="h-1/2 w-full bg-[#f9f9f9]"></div>
        <div className="h-1/2 w-full bg-white"></div>
      </div>

      {/* Content container */}
      <div className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }}
          className="w-full max-w-4xl rounded-3xl bg-[#f59b11] px-4 py-6 md:p-12 text-center"
        >
          <h2 className="text-[#ffffff] text-lg md:text-3xl lg:text-4xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
            ¡Únete a nosotros y crece profesionalmente en un entorno que valora
            tu talento!
          </h2>

          <p className="text-[#ffffff] text-xs md:text-lg max-w-3xl mx-auto md:leading-relaxed">
            En Clínica Aguilar, buscamos profesionales comprometidos en todas
            las áreas, desde atención médica hasta administración y servicio al
            cliente. Valoramos el trabajo en equipo, la vocación de servicio y
            el deseo de hacer la diferencia en la vida de las personas.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
