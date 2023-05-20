import { Schema, model } from 'mongoose';

// Attribute Model
interface IAttribute extends Document {
  name: string;
  value: string;
  description: string;
  slug: string;
  applicableTo: string[]; // To which child categories does this attribute apply
  attributeType: string; // Is it a color, size, material, etc.
}

const AttributeSchema: Schema<IAttribute> = new Schema({
  name: String,
  value: String,
  description: String,
  slug: String,
  applicableTo: [String],
  attributeType: String,
});

const AttributeModel = model<IAttribute>('Attribute', AttributeSchema);

export { AttributeModel, IAttribute };
