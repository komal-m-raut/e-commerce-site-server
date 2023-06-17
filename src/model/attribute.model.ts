import { Schema, model } from 'mongoose';
import { childCategorySchema, IChildCategory } from './childCategory.mode';

// Attribute Model
interface IAttribute extends Document {
  name: string;
  value: string;
  slug: string;
  applicableTo: IChildCategory[]; // To which child categories does this attribute apply
}

const AttributeSchema: Schema<IAttribute> = new Schema({
  name: String,
  value: String,
  slug: String,
  applicableTo: [childCategorySchema],
});

const AttributeModel = model<IAttribute>('Attribute', AttributeSchema);

export { AttributeModel, IAttribute };
