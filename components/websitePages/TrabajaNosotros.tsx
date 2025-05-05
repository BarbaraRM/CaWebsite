"use client";

import Header from "../website/Header";
import Footer from "../website/Footer";
import { EmpresaInforType } from "@/types/home";
import { JoinHeaderTitle } from "../website/join/JoinHeader";
import ListadoOfertas from "../website/join/ListadoOfertas";
import PostulaOferta from "../website/join/PostulaOferta";

export default function TrabajaNosotros({
  ofertas,
  footerdata,
}: {
  ofertas: any;
  footerdata: EmpresaInforType;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow overflow-auto bg-[#F9F9F9]">
        <JoinHeaderTitle />
        <ListadoOfertas ofertas={ofertas} />
        <PostulaOferta />
      </main>
      <Footer footerdata={footerdata} />
    </div>
  );
}
