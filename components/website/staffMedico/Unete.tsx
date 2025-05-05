"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function UneteAlEquipo() {
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
          <h1 className="mb-6 text-2xl font-bold text-white md:text-5xl">
            ¿Listo para cuidar tu salud?
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-sm md:text-lg text-white">
            Estamos aquí para atenderte. Llámanos para más información, agenda tu consulta con nuestros especialistas o
            programa un procedimiento médico.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-medium text-[#f29200] transition-colors hover:bg-opacity-90"
          >
            Contáctanos
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
