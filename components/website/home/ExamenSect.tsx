"use client";

import CustomLinkButton from "@/components/general/website/ButtonCta";
import SectionTitle from "@/components/general/website/SectionTitle";
import { FeatureSection } from "@/types/home";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  data: FeatureSection;
}

function ExamenesSection({ data }: Props) {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <SectionTitle
        title={data?.title || "Your title here"}
        color="text-primary"
      />
      <p className="max-w-3xl mx-auto text-dark mb-6">
        {data?.content || "Your description here"}
      </p>
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="w-fit self-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-8 px-4 place-items-center">
          {data?.items?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-[175px] h-[175px]">
                <div className="hexagon-b">
                  <Image
                    src={item.iamgeUrl}
                    alt={item.label}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="mt-4 text-center text-[#536494] font-semibold text-lg">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      {data?.button && (
        <CustomLinkButton
          href={data?.button?.href || "/"}
          label={data?.button?.label || "Button text here"}
          variant="orange"
        />
      )}
    </section>
  );
}

export default ExamenesSection;
