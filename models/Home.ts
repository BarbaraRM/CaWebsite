// models/Home.ts
import mongoose, { Schema } from "mongoose";

const HomeSchema = new Schema(
  {
    sections: { type: Array, required: true },
  },
  { timestamps: true }
);

export const HomeModel = mongoose.models.Home || mongoose.model("Home", HomeSchema);
