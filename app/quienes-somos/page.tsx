// app/page.tsx
import QuienesSomos from "@/components/websitePages/Somos";
import { FALLBACK_EMPRESAINFO, FALLBACK_SOMOS_DATA } from "@/store/fallbackData";

const isDev = process.env.NODE_ENV !== "production";

async function getData(): Promise<any> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin-panel/about`, {
      ...(isDev
        ? { cache: "no-store" }
        : { next: { revalidate: 60 } }
      )//{ next: { revalidate: 60 } }),//60
    });
    if (!res.ok) throw new Error("Respuesta no OK");
    const data = await res.json();
    if (!data || data.length === 0) {
      return FALLBACK_SOMOS_DATA;
    }
    return data;
  } catch (error) {
    console.error("Error al cargar el home:", error);
    return FALLBACK_SOMOS_DATA;
  }
}

export default async function Home() {
  const data = await getData();
  const footerdata = FALLBACK_EMPRESAINFO;
  return <QuienesSomos data={data} footerdata={footerdata} />;
}
