import { PopulatedDoc, Schema, model } from 'mongoose';
import { IChildCategory } from './childCategory.mode';

// Variant Model
interface IVariant extends Document {
  name: string;
  value: string[];
  applicableTo: PopulatedDoc<Schema.Types.ObjectId & IChildCategory>[]; // To which child categories does this variant apply
}

const VariantSchema: Schema<IVariant> = new Schema({
  name: String,
  value: [String],
  applicableTo: [{ type: Schema.Types.ObjectId, ref: 'ChildCategory' }],
});

const VariantModel = model<IVariant>('Variant', VariantSchema);

export { VariantModel, IVariant, VariantSchema };
