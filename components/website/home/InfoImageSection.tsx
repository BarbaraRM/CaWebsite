"use client";

import CustomLinkButton from "@/components/general/website/ButtonCta";
import { ImgDetailSection } from "@/types/website/home";
import { Check } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface HospitalSectionProps {
  data: ImgDetailSection;
}

export default function ImageInfoSection({ data }: HospitalSectionProps) {
  const isImageLeft = data?.imagePosition === "left";

  return (
    <section className="py-16 bg-gray-50 flex flex-col items-center justify-center min-h-[90dvh]">
      <div className="max-w-[1200px] px-4">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-center ${
            isImageLeft ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`${
              isImageLeft ? "lg:order-2" : "lg:order-1"
            } pr-0 lg:pr-12 flex flex-col`}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-dark mb-4 whitespace-pre-line font-poppins"
            >
              {data?.title || "Your title here"}
            </motion.h2>

            {data?.description && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-dark mb-8"
              >
                {data.description}
              </motion.p>
            )}

            <ul
              className={
                (data?.listItems || [])?.length > 5
                  ? "grid grid-cols-2 gap-y-3 mb-8 items-start"
                  : "grid grid-cols-1 gap-y-3 mb-8"
              }
            >
              {data?.listItems?.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span className="text-dark">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="self-center">
              {data?.button && (
                <CustomLinkButton
                  href={data?.button?.href || "/"}
                  label={data?.button?.label || "Button text here"}
                  variant={data?.button?.color || "orange"}
                />
              )}
            </div>
          </motion.div>

          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className={`${isImageLeft ? "lg:order-1" : "lg:order-2"} relative`}
          >
            <div className="relative h-[400px] w-full rounded-md overflow-hidden">
              <Image
                src={data?.imageSrc}
                alt={data?.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -right-4 -bottom-4 w-full h-full bg-primary/20 -z-10 rounded-md" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
