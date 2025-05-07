import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Medico from '@/models/Medico';

export async function GET() {
  try {
    await connectDB();
    const medicos = await Medico.find({ visible: true }).lean();

    return NextResponse.json(medicos);
  } catch (error: any) {
    console.error("Error al obtener médicos visibles:", error);
    return NextResponse.json({ error: 'Error al obtener médicos visibles' }, { status: 500 });
  }
}
