import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Token no enviado" }, { status: 401 });
  }
  try {
    // const response = await axios.get(
    //   `${process.env.NEXT_PUBLIC_INFORMACION}/data-empresa`,
    //   {
    //     headers: {
    //       Authorization: authHeader,
    //     },
    //   }
    // );

    const empresaData: EmpresaInterface = {
      nombre: "Empresa Ejemplo S.A.",
      nivelEmpresa: "grande",
      ruc: "1234567890001",
      razonSocial: "Empresa Ejemplo Sociedad Anónima",
      provincia: "Pichincha",
      canton: "Quito",
      direccion: "Av. Principal 123 y Secundaria",
      telefono1: "022123456",
      telefono2: "099123456",
      descripcion:
        "Empresa dedicada a servicios de tecnología y desarrollo de software.",
      sigla: "EESA",
      unicodigo: "EMP001",
      institucion: "Ministerio de Salud",
      nombreEstablecimiento: "Centro Médico Empresarial",
      logoUrl: "/images/logo.png",
    };
    //return NextResponse.json(response.data);
    return NextResponse.json(empresaData);
  } catch (error: any) {
    console.error(
      "Error fetching medico:",
      error?.response?.data || error.message
    );

    if (error.response?.status === 401) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Error al obtener información del medico" },
      { status: 500 }
    );
  }
}
