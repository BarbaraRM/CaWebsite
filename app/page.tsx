// app/page.tsx
import HomePage from "@/components/websitePages/HomePage";
import { HOME_FALLBACK_DATA, FALLBACK_EMPRESAINFO } from "@/store/fallbackData";
import { HomeData } from "@/types/home";

const isDev = process.env.NODE_ENV !== "production";

async function getHomeData(): Promise<HomeData> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/home`, {
      ...(isDev
        ? { cache: "no-store" }
        : { next: { revalidate: 60 } }),//60
    });

    if (!res.ok) throw new Error("Respuesta no OK");

    const data = await res.json();

    // Si no hay secciones, usamos fallback
    if (!data?.sections || data.sections.length === 0) {
      return HOME_FALLBACK_DATA;
    }

    return data;
  } catch (error) {
    console.error("Error al cargar el home:", error);
    return HOME_FALLBACK_DATA;
  }
}

export default async function Home() {
  const data = await getHomeData();
  const footerdata = FALLBACK_EMPRESAINFO;

  return <HomePage data={data} footerdata={footerdata} />;
}
