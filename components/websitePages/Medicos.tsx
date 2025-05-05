"use client";

import Header from "../website/Header";
import Footer from "../website/Footer";
import { EmpresaInforType } from "@/types/home";
import { MedicosHeader } from "../website/staffMedico/MedicosHeader";
import ListadoMedico from "../website/staffMedico/ListadoMedico";
import UneteAlEquipo from "../website/staffMedico/Unete";

export default function Medicos({
  medicos,
  footerdata,
}: {
  medicos: any;
  footerdata: EmpresaInforType;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow overflow-auto bg-[#F9F9F9]">
        <MedicosHeader />
        <ListadoMedico medicos={medicos} />
        <UneteAlEquipo />
      </main>
      <Footer footerdata={footerdata} />
    </div>
  );
}
