import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Medico from '@/models/Medico';
import mongoose from 'mongoose';

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, ...updateData } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const result = await Medico.findByIdAndUpdate(id, updateData, { new: true });

    if (!result) {
      return NextResponse.json({ error: 'Médico no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Médico actualizado correctamente' });
  } catch (error: any) {
    console.error("Error al actualizar médico:", error);
    return NextResponse.json({ error: 'Error al actualizar médico' }, { status: 500 });
  }
}
