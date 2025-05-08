// para guardar los cambios en  el home
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { HomeModel } from "@/models/Home";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const existing = await HomeModel.findOne(); // solo uno
    if (existing) {
      existing.sections = body.sections;
      await existing.save();
      return NextResponse.json({ success: true, updated: true });
    } else {
      await HomeModel.create({ sections: body.sections });
      return NextResponse.json({ success: true, created: true });
    }
  } catch (error) {
    console.error("[HOME POST]", error);
    return NextResponse.json({ success: false, error: "Error al guardar home" }, { status: 500 });
  }
}
