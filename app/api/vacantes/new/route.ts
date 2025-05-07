import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Vacante from "@/models/Vacante";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const nueva = await Vacante.create({ ...data, visible: true });
    return NextResponse.json({ id: nueva._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear la vacante" }, { status: 500 });
  }
}
