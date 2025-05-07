import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({
      message: "✅ Conexión a MongoDB con Mongoose exitosa",
    });
  } catch (error: any) {
    console.error("❌ Error de conexión:", error);
    return NextResponse.json(
      {
        message: "❌ Fallo la conexión a MongoDB",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
