import { Schema, model, Document } from 'mongoose';

interface IChildCategory extends Document {
  name: string;
  description?: string;
  slug: string;
  parentCategoryId?: Schema.Types.ObjectId;
  productIds: Schema.Types.ObjectId[];
}

const mainCategorySchema = new Schema<IChildCategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true },
    parentCategoryId: { type: Schema.Types.ObjectId, ref: 'MainCategory' },
    productIds: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true, versionKey: false },
);

const ChildCategoryModel = model<IChildCategory>(
  'ChildCategory',
  mainCategorySchema,
  'ChildCategory',
);

export { IChildCategory, ChildCategoryModel };
