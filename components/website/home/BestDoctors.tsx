"use client";

import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { BestDoctorsType } from "@/types/website/home";
import SectionTitle from "@/components/general/website/SectionTitle";
import { motion } from "framer-motion";

interface Props {
  data: BestDoctorsType;
}

export const BestDoctorsSection = ({ data }: Props) => {
  return (
    <section className="py-16" aria-labelledby="doctors-title">
      <div className="container mx-auto px-4 space-y-10">
        <SectionTitle
          title={data?.title || "Your title here"}
          color="text-third"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data?.items?.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="bg-third h-32"></div>
                <CardHeader className="relative">
                  <div className="absolute -top-28 left-1/2 transform -translate-x-1/2">
                    <Image
                      src={doctor.image || "/doctors/default.png"}
                      alt={`Foto de ${doctor.name}`}
                      width={100}
                      height={100}
                      className="rounded-full w-[150px] h-[150px] max-w-[150px] max-h-[150px] border-4 border-white overflow-hidden object-cover object-top"
                    />
                  </div>
                  <div className="h-6"></div>
                  <CardTitle className="text-center mt-20 font-poppins">
                    {doctor.name}
                  </CardTitle>
                  <CardDescription className="text-center text-primary font-semibold">
                    {doctor.specialty}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
