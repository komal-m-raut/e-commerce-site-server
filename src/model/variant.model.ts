import { Schema, model } from 'mongoose';

// Variant Model
interface IVariant extends Document {
  name: string;
  value: string;
  description: string;
  slug: string;
  applicableTo: string[]; // To which main categories does this variant apply
  variantType: string; // Is it a color, size, material, etc.
}

const VariantSchema: Schema<IVariant> = new Schema({
  name: String,
  value: String,
  description: String,
  slug: String,
  applicableTo: [String],
  variantType: String,
});

const VariantModel = model<IVariant>('Variant', VariantSchema);

export { VariantModel, IVariant };
