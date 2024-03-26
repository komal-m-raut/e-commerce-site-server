import { Document, Schema, model } from 'mongoose';

interface ISizeChart extends Document {
  name: string;
  description: string;
  rows: string[];
  columns: string[];
  tenantId: Schema.Types.ObjectId;
}

const SizeChartSchema = new Schema<ISizeChart>({
  name: { type: String },
  description: { type: String },
  rows: { type: [String] },
  columns: { type: [String] },
  tenantId: { type: Schema.Types.ObjectId, required: true },
});

SizeChartSchema.index({ name: 1, tenantId: 1 }, { unique: true });

const SizeChartModel = model<ISizeChart>(
  'SizeChart',
  SizeChartSchema,
  'SizeChart',
);

export { ISizeChart, SizeChartModel, SizeChartSchema };
