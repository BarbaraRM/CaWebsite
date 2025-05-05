"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export const CtaSectionLast = ({
  data,
}: {
  data?: {
    title?: string;
    description?: string;
    buttonText?: string;
    href?: string;
  };
}) => {
  return (
    <section className="py-40" aria-labelledby="cta-title">
      <div className="py-16 bg-primary text-white w-full h-[80%]">
        <div className="container mx-auto px-4 text-center flex flex-col items-center">
          <motion.h2
            id="cta-title"
            className="text-3xl font-bold mb-4 font-poppins"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {data?.title || "¿Listo para cuidar tu salud?"}
          </motion.h2>

          <motion.p
            className="text-xl mb-8 max-w-4xl self-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {data?.description ||
              "Estamos aquí para atenderte. Llámanos para más información, agenda tu consulta con nuestros especialistas o programa un procedimiento médico."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href={data?.href || "/contacto"}
              className="bg-white text-primary hover:bg-gray-200 text-xl py-2 px-6 rounded-full items-center flex flex-row"
            >
              {data?.buttonText || "Contáctanos"}{" "}
              <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
