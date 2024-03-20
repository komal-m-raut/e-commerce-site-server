import { Schema, model } from 'mongoose';
import { ChildCategorySchema, IChildCategory } from './childCategory.mode';

// Variant Model
interface IVariant extends Document {
  name: string;
  value: string[];
  slug: string;
  applicableTo: IChildCategory[]; // To which child categories does this variant apply
}

const VariantSchema: Schema<IVariant> = new Schema({
  name: String,
  value: [String],
  slug: String,
  applicableTo: [ChildCategorySchema],
});

const VariantModel = model<IVariant>('Variant', VariantSchema);

export { VariantModel, IVariant, VariantSchema };
