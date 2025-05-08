import TrabajaNosotros from "@/components/websitePages/TrabajaNosotros";
import { FALLBACK_EMPRESAINFO, FALLBACK_TRABAJOS } from "@/store/fallbackData";

const isDev = process.env.NODE_ENV !== "production";

async function getData(): Promise<any> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacantes/get-website`, {
      ...(isDev
        ? { cache: "no-store" }
        : { next: { revalidate: 60 } }),//60
    });
    if (!res.ok) throw new Error("Respuesta no OK");
    const data = await res.json();
    if (!data || data.length === 0) {
      return FALLBACK_TRABAJOS;
    }
    return data;
  } catch (error) {
    console.error("Error al cargar el home:", error);
    return FALLBACK_TRABAJOS;
  }
}

export default async function Home() {
  const data = await getData();
  const footerdata = FALLBACK_EMPRESAINFO;
  return <TrabajaNosotros ofertas={data} footerdata={footerdata} />;
}
