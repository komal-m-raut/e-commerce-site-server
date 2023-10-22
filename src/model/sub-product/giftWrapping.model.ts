import { Document, Schema, model } from 'mongoose';

interface IGiftWrapping extends Document {
  name: string;
  packagingMaterial: string;
  price: number;
}

const GiftWrappingSchema = new Schema<IGiftWrapping>({
  name: { type: String, unique: true },
  packagingMaterial: { type: String },
  price: { type: Number },
});

const GiftWrappingModel = model<IGiftWrapping>(
  'GiftWrapping',
  GiftWrappingSchema,
  'GiftWrapping',
);

export { IGiftWrapping, GiftWrappingModel, GiftWrappingSchema };
