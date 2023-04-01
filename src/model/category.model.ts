import { Schema, model, Document } from 'mongoose';

interface ICategory extends Document {
  name: string;
  description?: string;
  slug: string;
  root: boolean;
  parentCategoryId?: Schema.Types.ObjectId;
  parentCategory?: ICategory;
  children: ICategory[];
  productIds: Schema.Types.ObjectId[];
  skuIds: Schema.Types.ObjectId[];
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true },
    root: { type: Boolean, default: false },
    parentCategoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    children: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    productIds: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    skuIds: [{ type: Schema.Types.ObjectId, ref: 'SKU' }],
  },
  { timestamps: true, versionKey: false },
);

const CategoryModel = model<ICategory>('Category', categorySchema);

export default CategoryModel;
