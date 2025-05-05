import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { objetoAParametrosFetch } from "@/utils/generalFunctions";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const filters = data?.filters;
    const textFilter = data?.textFilter;
    const page = data?.page;
    const size = data?.size;

    const authHeader = req.headers.get("authorization"); // ← Token del frontend

    if (!authHeader) {
      return NextResponse.json({ message: "Token no enviado" }, { status: 401 });
    }

    let queryParams = "";
    if (filters || textFilter) {
      queryParams = objetoAParametrosFetch(filters, textFilter) || "";
    }

    if (!size) {
      return NextResponse.json(
        { message: "Limit is required" },
        { status: 400 }
      );
    }
    
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DEPENDENCIAS}/dependencias/listar/${page}/${size}?${queryParams}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    ); 
    const registro = response?.data;

    return NextResponse.json({
      data: registro?.data || [],
      endIndex: registro?.endIndex,
      pagina_actual: registro?.pagina_actual,
      startIndex: registro?.startIndex,
      total_paginas: registro?.total_paginas,
      total_registros: registro?.total_registros,
    });
  } catch (error: any) {
    console.error("error:", error)
    return NextResponse.json(
      { message: "Error fetching user data", error: error.message },
      { status: 500 }
    );
  }
}
