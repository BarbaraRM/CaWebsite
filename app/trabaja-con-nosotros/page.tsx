import TrabajaNosotros from "@/components/websitePages/TrabajaNosotros";
import { FALLBACK_EMPRESAINFO, FALLBACK_TRABAJOS } from "@/store/fallbackData";
import { HomeData } from "@/types/website/home";

async function getData(): Promise<HomeData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/home`, {
    next: { revalidate: 3600 }, 
  });
  if (!res.ok) throw new Error("No se pudo cargar el home");
  return res.json();
}

export default async function Home() {
  const data = FALLBACK_TRABAJOS || (await getData());
  const footerdata = FALLBACK_EMPRESAINFO;
  return <TrabajaNosotros ofertas={data} footerdata={footerdata} />;
}
