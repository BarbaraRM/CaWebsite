import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { objetoAParametrosFetch } from "@/utils/generalFunctions";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const filters = data?.filters;
    const textFilter = data?.textFilter;

    const authHeader = req.headers.get("authorization"); // ← Token del frontend

    if (!authHeader) {
      return NextResponse.json({ message: "Token no enviado" }, { status: 401 });
    }

    let queryParams = "";
    if (filters || textFilter) {
      queryParams = objetoAParametrosFetch(filters, textFilter) || "";
    }

 
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DEPENDENCIAS}/dependencias/listar/1/100000${queryParams}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );
    return NextResponse.json(response?.data?.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching user data", error: error.message },
      { status: 500 }
    );
  }
}
