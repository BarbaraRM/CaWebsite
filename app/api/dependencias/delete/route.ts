import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Token no enviado" }, { status: 401 });
    }

    const body = await req.json();
    const { registro_id } = body;

    if (!registro_id) {
      return NextResponse.json(
        { message: "Faltan parámetros obligatorios" },
        { status: 400 }
      );
    }

    const url = `${process.env.NEXT_PUBLIC_DEPENDENCIAS}/dependencias/del/${registro_id}/0`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({
      ok: true,
    });
  } catch (error: any) {
    console.error("Error eliminando registro:", error?.response?.data || error.message);
    const status = error?.response?.status || 500;
    const message = status === 401 ? "No autorizado" : "Error interno del servidor";

    return NextResponse.json({ ok: false, message }, { status });
  }
}
