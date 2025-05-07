import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Vacante from "@/models/Vacante";
import mongoose from "mongoose";

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, ...data } = await req.json();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }
    const updated = await Vacante.findByIdAndUpdate(id, data, { new: true });
    if (!updated) return NextResponse.json({ error: "Vacante no encontrada" }, { status: 404 });

    return NextResponse.json({ message: "Vacante actualizada correctamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar la vacante" }, { status: 500 });
  }
}
