"use client";

import HomePage from "@/components/websitePages/HomePage";
import { FALLBACK_EMPRESAINFO } from "@/store/fallbackData";
import { useEffect, useState } from "react";
import { HomeData } from "@/types/home";

export default function PreviewPage() {
  const [data, setData] = useState<HomeData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("home_preview_data");
    if (saved) {
      setData(JSON.parse(saved));
    }

    // Limpieza al cerrar la pestaña
    const cleanup = () => {
      localStorage.removeItem("home_preview_data");
    };

    window.addEventListener("beforeunload", cleanup);

    return () => {
      window.removeEventListener("beforeunload", cleanup);
      cleanup(); // Por si acaso el componente se desmonta
    };
  }, []);

  if (!data) return <p className="text-center mt-10">Cargando vista previa...</p>;

  return <HomePage data={data} footerdata={FALLBACK_EMPRESAINFO} preview={true}/>;
}
