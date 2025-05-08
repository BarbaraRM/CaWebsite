// app/api/about/route.ts
import { NextResponse } from "next/server";
import { QuienessomosData } from "@/types/quienes-somos";
import { connectDB } from "@/lib/mongoose";
import { FALLBACK_SOMOS_DATA } from "@/store/fallbackData";
import { AboutModel } from "@/models/About";

export async function GET() {
  await connectDB();
  try {
    const existing = await AboutModel.findOne({});
    if (!existing) {
      return NextResponse.json(FALLBACK_SOMOS_DATA);
    }
    return NextResponse.json(existing);
  } catch (error) {
    console.error("GET /api/about failed:", error);
    return NextResponse.json(FALLBACK_SOMOS_DATA);
  }
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const body: QuienessomosData = await req.json();
    const doc = await AboutModel.findOne({});
    if (doc) {
      doc.set(body);
      await doc.save();
    } else {
      await AboutModel.create(body);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/about failed:", error);
    return NextResponse.json({ success: false, error: "No se pudo guardar" }, { status: 500 });
  }
}
