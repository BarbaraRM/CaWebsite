import mongoose, { Schema, model, models } from "mongoose";

export interface OfertaLaboral extends mongoose.Document {
  title: string;
  targetAudience: string;
  startDate: string;
  endDate: string;
  description: string;
  requiredSkills: string;
  requirements: string;
  applicationLink: string;
  importantNote: string;
  imageUrl: string;
  deadline: string;
  duration: string;
  startPostOn: string;
  visible?: boolean;
}

const VacanteSchema = new Schema<OfertaLaboral>(
  {
    title: { type: String, required: true },
    targetAudience: String,
    startDate: String,
    endDate: String,
    description: String,
    requiredSkills: String,
    requirements: String,
    applicationLink: String,
    importantNote: String,
    imageUrl: String,
    deadline: String,
    duration: String,
    startPostOn: String,
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.Vacante || model<OfertaLaboral>("Vacante", VacanteSchema);
