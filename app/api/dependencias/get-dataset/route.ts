import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization"); // ← Token del frontend

    if (!authHeader) {
      return NextResponse.json(
        { message: "Token no enviado" },
        { status: 401 }
      );
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DEPENDENCIAS}/dependencias/listar/1/1000?activo=true`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );

    let dataToSend = (response?.data?.data || [])?.map((item) => ({
      codigo: item.codigo,
      nombre: item.nombre,
    }));
    return NextResponse.json(dataToSend || []);
  } catch (error: any) {
    return NextResponse.json([]);
  }
}
