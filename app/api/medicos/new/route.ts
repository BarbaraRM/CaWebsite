import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Medico from '@/models/Medico';
import { MedicoInterface } from '@/types/medico';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body: MedicoInterface = await req.json();

    const nuevoMedico = await Medico.create({
      ...body,
      visible: body.visible ?? true, // por defecto true si no se envía
    });

    return NextResponse.json({ id: nuevoMedico._id }, { status: 201 });
  } catch (error: any) {
    console.error("Error al crear médico:", error);
    return NextResponse.json({ error: 'Error al crear médico' }, { status: 500 });
  }
}
