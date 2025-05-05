// app/page.tsx
import HomePage from "@/components/websitePages/HomePage";
import { FALLBACK_DATA, FALLBACK_EMPRESAINFO } from "@/store/fallbackData";
import { HomeData } from "@/types/home";

async function getHomeData(): Promise<HomeData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/home`, {
    next: { revalidate: 3600 }, // ⏱️ Revalida cada 1 hora = Incremental Static Regeneration
  });
  if (!res.ok) throw new Error("No se pudo cargar el home");
  return res.json();
}

export default async function Home() {
  const data = FALLBACK_DATA || (await getHomeData());
  const footerdata = FALLBACK_EMPRESAINFO;
  return <HomePage data={data} footerdata={footerdata} />;
}
