import { PopulatedDoc, Schema, model } from 'mongoose';
import { IChildCategory } from './childCategory.mode';

// Attribute Model
interface IAttribute extends Document {
  name: string;
  value: string;
  slug: string;
  applicableTo: PopulatedDoc<Schema.Types.ObjectId & IChildCategory>[]; // To which child categories does this attribute apply
}

const AttributeSchema: Schema<IAttribute> = new Schema(
  {
    name: String,
    value: String,
    slug: String,
    applicableTo: [{ type: Schema.Types.ObjectId, ref: 'ChildCategory' }],
  },
  { _id: false },
);

const AttributeModel = model<IAttribute>('Attribute', AttributeSchema);

export { AttributeModel, IAttribute, AttributeSchema };
