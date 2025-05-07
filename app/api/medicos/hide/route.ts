import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Medico from '@/models/Medico';
import mongoose from 'mongoose';

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, visible } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const result = await Medico.findByIdAndUpdate(id, { visible }, { new: true });

    if (!result) {
      return NextResponse.json({ error: 'Médico no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: `Médico ${visible ? 'visible' : 'oculto'}` });
  } catch (error) {
    console.error("Error al actualizar visibilidad:", error);
    return NextResponse.json({ error: 'Error al actualizar visibilidad del médico' }, { status: 500 });
  }
}
