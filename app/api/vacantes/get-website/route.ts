import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Vacante from '@/models/Vacante';

export async function GET() {
  try {
    await connectDB();
    const medicos = await Vacante.find({ visible: true }).lean();

    return NextResponse.json(medicos);
  } catch (error: any) {
    console.error("Error al obtener vacantes visibles:", error);
    return NextResponse.json([]);
  }
}
