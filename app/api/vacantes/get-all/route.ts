import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Vacante from "@/models/Vacante";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { filters = {}, textFilter = "", ini = 0, fin } = await req.json();

    const skip = parseInt(ini, 10) || 0;
    const limit = parseInt(fin, 10) || 10;

    const query: any = {};

    if (textFilter) {
      query.$or = [
        { title: { $regex: textFilter, $options: "i" } },
        { description: { $regex: textFilter, $options: "i" } },
      ];
    }

    for (const key in filters) {
      if (filters[key] !== undefined && filters[key] !== null) {
        query[key] = filters[key];
      }
    }

    const total = await Vacante.countDocuments(query);
    const vacantes = await Vacante.find(query).skip(skip).limit(limit).lean();

    return NextResponse.json({
      data: vacantes,
      skip,
      limit,
      total,
      next_page: skip + limit < total,
      previous_page: skip > 0,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener vacantes" }, { status: 500 });
  }
}
