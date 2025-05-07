import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI no está definida en .env.local");
}

let isConnected: boolean = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("✅ Conectado a MongoDB con Mongoose");
  } catch (error) {
    console.error("❌ Error de conexión con Mongoose:", error);
    throw error;
  }
};
