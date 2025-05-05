"use client";

import { ServiciosSectiontype } from "@/types/website/home";
import { sanitizeSvg } from "@/utils/sanitizeSvg";
import { ArrowRight, HeartPulse } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/general/website/SectionTitle";
import CustomLinkButton from "@/components/general/website/ButtonCta";

interface Props {
  data: ServiciosSectiontype;
}

// Animaciones
const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ServiciosSection({ data }: Props) {
  return (
    <section className="bg-primary text-white py-20">
      <div className="flex flex-col px-4 justify-center items-center w-full gap-y-3">
        <SectionTitle title={data?.title || "Título por defecto"} />

        <motion.div
          className="mt-4 mb-8 max-w-[800px] xl:max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-3 md:gap-x-6 gap-y-6"
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
        >
          {data?.items?.map((item: any, index: number) => {
            const sanitizedIcon = item?.icon ? sanitizeSvg(item.icon) : "";
            return (
              <motion.div
                key={index}
                variants={cardVariant}
                viewport={{ once: false }}
                className="cursor-pointer text-white flex flex-col min-h-[100px] bg-white/10 hover:bg-white/30 border-l-8 border border-white rounded-md p-3 flex-1 group"
              >
                <div className="flex flex-row gap-x-2 items-center mb-6">
                  {sanitizedIcon ? (
                    <div
                      className="w-8 h-8"
                      dangerouslySetInnerHTML={{ __html: sanitizedIcon }}
                    />
                  ) : (
                    <HeartPulse className="w-8 h-8" />
                  )}
                  <div className="flex-1 text-base md:text-xl font-bold">
                    <p>{item?.title || "Your Service"}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="whitespace-pre-line px-2 !leading-tight text-sm md:text-base">
                    {item?.content || "Your content here..."}
                  </p>
                </div>

                {item?.href && (
                  <div className="mt-4 flex flex-1 justify-end items-center text-white gap-x-2">
                    <Link
                      href={item?.href}
                      className="cursor-pointer flex flex-row gap-x-1 text-white underline text-xs md:text-sm group-hover:font-bold group-hover:no-underline"
                    >
                      Saber más
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <CustomLinkButton
          href="/servicios"
          label="Conoce todos nuestros servicios"
          variant="dark"
        />
      </div>
    </section>
  );
}

export default ServiciosSection;
