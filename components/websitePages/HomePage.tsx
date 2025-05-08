import Header from "../website/Header";
import Footer from "../website/Footer";
import { EmpresaInforType, HomeData } from "@/types/home";
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
  preview,
}: {
  data: HomeData;
  footerdata: EmpresaInforType;
  preview?: boolean;
}) {
  console.log(data?.sections || "");

  return (
    <div className="min-h-screen flex flex-col">
      {!preview && <Header />}
      <main className="flex-grow overflow-auto">
        {data?.sections
          ?.filter((sec) => sec.visible !== false)
          ?.map((section) => {
            switch (section.type) {
              case "hero":
                return (
                  <HeroSlider key={section.id} slides={section.props.slides} />
                );
              case "information":
                return (
                  <InformationSection
                    key={section.id}
                    information={section.props}
                  />
                );
              case "services":
                return (
                  <ServiciosSection key={section.id} data={section.props} />
                );
              case "background":
                return (
                  <BackgroundSection key={section.id} data={section.props} />
                );
              case "features":
                return (
                  <ExamenesSection key={section.id} data={section.props} />
                );
              case "imageinfo":
                return (
                  <ImageInfoSection key={section.id} data={section.props} />
                );
              case "doctors":
                return (
                  <BestDoctorsSection key={section.id} data={section.props} />
                );
              case "cta":
                return <CtaSectionLast key={section.id} data={section.props} />;
              default:
                return null;
            }
          })}
      </main>
      {!preview && <Footer footerdata={footerdata} />}
    </div>
  );
}
