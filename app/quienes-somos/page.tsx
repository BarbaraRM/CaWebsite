// app/page.tsx
import QuienesSomos from "@/components/websitePages/Somos";
import { FALLBACK_EMPRESAINFO, FALLBACK_SOMOS_DATA } from "@/store/fallbackData";
import { HomeData } from "@/types/home";

async function getData(): Promise<HomeData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/home`, {
    next: { revalidate: 3600 }, 
  });
  if (!res.ok) throw new Error("No se pudo cargar el home");
  return res.json();
}

export default async function Home() {
  const data = FALLBACK_SOMOS_DATA || (await getData());
  const footerdata = FALLBACK_EMPRESAINFO;
  return <QuienesSomos data={data} footerdata={footerdata} />;
}
