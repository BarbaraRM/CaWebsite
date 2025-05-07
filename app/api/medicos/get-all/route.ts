import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Medico from '@/models/Medico';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.json();
    const filters = data?.filters || {};
    const textFilter = data?.textFilter || "";
    const skip = parseInt(data?.ini) || 0;
    const limit = parseInt(data?.fin);

    if (isNaN(limit)) {
      return NextResponse.json({ message: "Limit is required and must be a number" }, { status: 400 });
    }

    // Construcción del query
    const query: any = {};

    if (textFilter) {
      query.$or = [
        { nombre: { $regex: textFilter, $options: 'i' } },
        { apellido: { $regex: textFilter, $options: 'i' } },
        { especialidad: { $regex: textFilter, $options: 'i' } },
      ];
    }

    for (const key in filters) {
      if (filters[key] !== undefined && filters[key] !== null) {
        query[key] = filters[key];
      }
    }

    const total = await Medico.countDocuments(query);
    const medicos = await Medico.find(query).skip(skip).limit(limit).lean();

    return NextResponse.json({
      data: medicos,
      skip,
      limit,
      next_page: skip + limit < total,
      previous_page: skip > 0,
    });
  } catch (error: any) {
    console.error("Error fetching médicos:", error);
    return NextResponse.json(
      { message: "Error fetching médicos", error: error.message },
      { status: 500 }
    );
  }
}
