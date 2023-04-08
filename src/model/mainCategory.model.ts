import { Schema, model, Document } from 'mongoose';
import { IChildCategory } from './childCategory.mode';

interface IMainCategory extends Document {
  name: string;
  description?: string;
  slug: string;
  parentCategoryId: Schema.Types.ObjectId;
  children: IChildCategory[];
}

const categorySchema = new Schema<IMainCategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true },
    parentCategoryId: { type: Schema.Types.ObjectId, ref: 'RootCategory' },
    children: [{ type: Schema.Types.ObjectId, ref: 'ChildCategory' }],
  },
  { timestamps: true, versionKey: false },
);

const MainCategoryModel = model<IMainCategory>(
  'MainCategory',
  categorySchema,
  'MainCategory',
);

export { IMainCategory, MainCategoryModel };
