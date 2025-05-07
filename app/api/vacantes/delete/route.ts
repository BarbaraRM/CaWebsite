import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Vacante from "@/models/Vacante";
import mongoose from "mongoose";

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }
    await Vacante.findByIdAndDelete(id);
    return NextResponse.json({ message: "Vacante eliminada correctamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar la vacante" }, { status: 500 });
  }
}
