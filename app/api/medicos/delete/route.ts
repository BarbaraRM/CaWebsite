import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Medico from '@/models/Medico';
import mongoose from 'mongoose';

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();

    // Validación rápida del ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const result = await Medico.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ error: 'Médico no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Médico eliminado correctamente' });
  } catch (error) {
    console.error("Error al eliminar médico:", error);
    return NextResponse.json({ error: 'Error al eliminar médico' }, { status: 500 });
  }
}
