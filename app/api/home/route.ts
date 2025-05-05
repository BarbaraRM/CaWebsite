import { FALLBACK_DATA } from "@/store/fallbackData";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Simulamos llamada a una API o DB
    const response = await fetch("https://api.ejemplo.com/home-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token-ficticio", // si aplica
      },
    });

    if (!response.ok) {
      throw new Error(`Fallo la API: ${response.statusText}`);
    }

    const apiData = await response.json();
    return NextResponse.json(apiData, { status: 200 });
  } catch (error) {
    console.error("❌ Error al obtener datos desde la API externa:", error);

    // Datos de respaldo por defecto
    const fallbackData = FALLBACK_DATA;

    return NextResponse.json(fallbackData, { status: 200 });
  }
}
