import { Schema, model } from 'mongoose';

interface ICareInstructions extends Document {
  name: string;
  description: string;
  tenant: Schema.Types.ObjectId;
}

const CareInstructionsSchema = new Schema<ICareInstructions>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    tenant: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false },
);

CareInstructionsSchema.index({ name: 1, tenant: 1 }, { unique: true });

const CareInstructionsModel = model<ICareInstructions>(
  'CareInstructions',
  CareInstructionsSchema,
  'CareInstructions',
);

export { ICareInstructions, CareInstructionsModel };
