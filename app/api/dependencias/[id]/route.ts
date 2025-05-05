import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { TipoExamenInterface } from "@/types/globals";
import { getUserFullName } from "@/utils/user";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Token no enviado" }, { status: 401 });
  }
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DEPENDENCIAS}/dependencia/${id}`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );
    const itemDB: TipoExamenInterface = response.data;
    const temporal = {
      _id: itemDB?._id,
      codigo: itemDB?.codigo,
      nombre: itemDB?.nombre,
      descripcion: itemDB?.descripcion,
      activo: itemDB?.activo || false,
      createdAt: itemDB?.createdAt,
      creator: getUserFullName(itemDB?.creator?.user),
    };
    return NextResponse.json(temporal);
  } catch (error: any) {
    console.error(
      "Error fetching medico:",
      error?.response?.data || error.message
    );

    if (error.response?.status === 401) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Error al obtener información del registro" },
      { status: 500 }
    );
  }
}
