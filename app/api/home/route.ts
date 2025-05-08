// /app/api/home/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { HomeModel } from "@/models/Home";
import { HOME_FALLBACK_DATA } from "@/store/fallbackData";

export async function GET() {
  try {
    await connectDB();
    const doc = await HomeModel.findOne().lean();
    return NextResponse.json(doc || HOME_FALLBACK_DATA);
  } catch (error) {
    console.error("GET /api/home error:", error);
    return NextResponse.json(HOME_FALLBACK_DATA);
  }
}
