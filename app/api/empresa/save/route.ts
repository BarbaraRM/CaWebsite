import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const dataPayload = await req.json();

    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json(
        { error: "Token no proporcionado" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_INFORMACION}/upsert/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPayload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error al guardar registro", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Registro actualizado",
    });
  } catch (error: any) {
    console.error("Error al procesar registro:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
