// models/about.ts
import  { Schema, model, models } from "mongoose";

const AboutSchema = new Schema({
  mision: { type: String },
  vision: { type: String },
  valores: { type: String },
  mainTitle: { type: String, required: true },
  mainImagenUrl: { type: String },
  content: { type: String },
  gallery_photos: [{ type: String }],
});

export const AboutModel =
  models.About || model("About", AboutSchema);
