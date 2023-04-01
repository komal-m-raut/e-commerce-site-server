import { Schema, model } from 'mongoose';

interface IAttribute extends Document {
  name: string;
  description?: string;
  slug: string;
}

const attributeSchema = new Schema<IAttribute>(
  {
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const AttributeModel = model<IAttribute>('Attribute', attributeSchema);

export default AttributeModel;
