import Header from "../website/Header";
import Footer from "../website/Footer";
import { EmpresaInforType, HomeData } from "@/types/website/home";
import HeroSlider from "../website/home/Hero";
import InformationSection from "../website/home/Information";
import ServiciosSection from "../website/home/ServiciosSect";
import { BackgroundSection } from "../website/home/BgSection";
import { CtaSectionLast } from "../website/home/CtaSection.tsx";
import ExamenesSection from "../website/home/ExamenSect";
import ImageInfoSection from "../website/home/InfoImageSection";
import { BestDoctorsSection } from "../website/home/BestDoctors";

export default function Home({
  data,
  footerdata,
}: {
  data: HomeData;
  footerdata: EmpresaInforType;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow overflow-auto">
        <HeroSlider slides={data?.hero?.slides || []} />
        <InformationSection information={data?.information} />
        <ServiciosSection data={data?.servicios} />
        <BackgroundSection data={data?.maternidad} />
        <ExamenesSection data={data?.diagnosticos} />
        <ImageInfoSection data={data?.detalle_hosp} />
        <ImageInfoSection data={data?.detalle_ce} />
        <BestDoctorsSection data={data?.doctors} />
        <CtaSectionLast data={data?.cta} />
      </main>
      <Footer footerdata={footerdata} />
    </div>
  );
}
