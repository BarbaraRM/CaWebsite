// app/page.tsx
import Medicos from "@/components/websitePages/Medicos";
import { FALLBACK_EMPRESAINFO, FALLBACK_MEDICOS } from "@/store/fallbackData";

const isDev = process.env.NODE_ENV !== "production";

async function getData(): Promise<any> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/medicos/get-website`, {
      ...(isDev
        ? { cache: "no-store" }
        : { next: { revalidate: 60 } }),//60
    });

    if (!res.ok) throw new Error("Respuesta no OK");

    const data = await res.json();

    // Si no hay secciones, usamos fallback
    if (!data || data.length === 0) {
      return FALLBACK_MEDICOS;
    }

    return data;
  } catch (error) {
    console.error("Error al cargar el home:", error);
    return FALLBACK_MEDICOS;
  }
}

export default async function Page() {
  const data = await getData();
  const footerdata = FALLBACK_EMPRESAINFO;
  return <Medicos medicos={data} footerdata={footerdata} />;
}
