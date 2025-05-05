"use client";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  content?: string;
  imageUrl?: string;
}

export const BackgroundSectionTitle = ({ title, content, imageUrl }: Props) => {
  return (
    <section className="flex flex-col relative max-h-[400px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('${imageUrl || "/bg/bg_maternidad.png"}')`,
            filter: "brightness(0.7)",
          }}
        />
      </div>

      {/* Content */}
      <div className="justify-center flex-1 h-full flex flex-col relative z-10 px-4 py-6 md:py-24 max-w-7xl mx-auto text-center text-white">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold mb-12 lg:mb-12 2xl:mb-14 tracking-wide leading-normal"
        >
          {title || "Your title here"}
        </motion.p>

        {content && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl max-w-6xl mx-auto mb-16 !leading-relaxed font-light"
          >
            {content || "Experiencia en Maternidad"}
          </motion.p>
        )}
      </div>
    </section>
  );
};
