"use client";

import Header from "../website/Header";
import Footer from "../website/Footer";
import { EmpresaInforType } from "@/types/home";
import { QuienessomosData } from "@/types/quienes-somos";
import { BackgroundSectionTitle } from "../website/BgSectionTitle";
import { Options } from "@/components/website/about/Options";
import Image from "next/image";
import MasonryGrid from "../website/about/Gallery";
import { motion } from "framer-motion";

export default function QuienesSomos({
  data,
  footerdata,
}: {
  data: QuienessomosData;
  footerdata: EmpresaInforType;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow overflow-auto">
        <BackgroundSectionTitle
          title={data?.mainTitle || "Quienes Somos?"}
          content={data?.content}
          imageUrl={data?.mainImagenUrl}
        />

        <div className="min-h-[300px] flex flex-col justify-center mb-6">
          <Options
            list={[
              { title: "Nuestra Mision", content: data?.mision || "" },
              { title: "Nuestra Visión", content: data?.vision || "" },
              { title: "Nuestros Valores", content: data?.valores || "" },
            ]}
          />
        </div>

        <MasonryGrid
          list={data?.gallery_photos || []}
          columns={5}
          bgColor="bg-gray-100"
        />

        {/* Sección animada */}
        <section className="min-h-[90dvh] flex flex-col justify-center">
          <div className="relative bg-gray-900 py-24">
            <div className="absolute inset-0 z-0 opacity-90">
              <Image
                src="/bg/unete_equipo.png"
                alt="Unete a nuestro equipo"
                fill
                className="object-cover object-top"
              />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: false }}
                className="text-5xl font-bold text-white font-poppins mb-8"
              >
                ¡Únete a Nuestro Equipo!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false }}
                className="text-white text-lg mb-8"
              >
                Buscamos personas comprometidas con la salud y el bienestar de
                los demás. Si eres un profesional apasionado y deseas formar
                parte de un equipo de excelencia, ¡te estamos esperando!
              </motion.p>

              <motion.a
                href="/trabaja-con-nosotros"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false }}
                className="inline-block bg-[#f5a23d] hover:bg-[#f59b11] text-white font-medium py-3 px-8 rounded-md transition-colors"
              >
                Trabaja con nosotros
              </motion.a>
            </div>
          </div>
        </section>
      </main>
      <Footer footerdata={footerdata} />
    </div>
  );
}
