import mongoose, { Schema, Document, models, model } from "mongoose";

export interface MedicoInterface extends Document {
  sufix?: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  visible?: boolean;
  horario: {
    lun?: { start?: string; end?: string };
    mar?: { start?: string; end?: string };
    mier?: { start?: string; end?: string };
    jue?: { start?: string; end?: string };
    vier?: { start?: string; end?: string };
    sab?: { start?: string; end?: string };
    dom?: { start?: string; end?: string };
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
    whatsapp?: string;
  };
  imagen: string;
}

const MedicoSchema = new Schema<MedicoInterface>(
  {
    sufix: String,
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    especialidad: { type: String, required: true },
    visible: { type: Boolean, default: true },
    horario: {
      lun: { start: String, end: String },
      mar: { start: String, end: String },
      mier: { start: String, end: String },
      jue: { start: String, end: String },
      vier: { start: String, end: String },
      sab: { start: String, end: String },
      dom: { start: String, end: String },
    },
    socialMedia: {
      facebook: String,
      instagram: String,
      linkedin: String,
      tiktok: String,
      whatsapp: String,
    },
    imagen: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default models.Medico || model<MedicoInterface>("Medico", MedicoSchema);
