import { Document, Schema, model } from 'mongoose';

interface ISizeChart extends Document {
  name: string;
  description: string;
  rows: string[];
  columns: string[];
}

const SizeChartSchema = new Schema<ISizeChart>({
  name: { type: String, unique: true },
  description: { type: String },
  rows: { type: [String] },
  columns: { type: [String] },
});

const SizeChartModel = model<ISizeChart>(
  'SizeChart',
  SizeChartSchema,
  'SizeChart',
);

export { ISizeChart, SizeChartModel, SizeChartSchema };
