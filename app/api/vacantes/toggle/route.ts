import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Vacante from "@/models/Vacante";
import mongoose from "mongoose";

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, visible } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const result = await Vacante.findByIdAndUpdate(id, { visible }, { new: true });
    if (!result) return NextResponse.json({ error: "Vacante no encontrada" }, { status: 404 });

    return NextResponse.json({ message: `Vacante ${visible ? "publicada" : "ocultada"}` });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar visibilidad" }, { status: 500 });
  }
}
