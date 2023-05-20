import { Schema, model, Document, PopulatedDoc } from 'mongoose';
import { IChildCategory } from './childCategory.mode';
import { IVariant } from './variant.model';
import { IRootCategory } from './rootCategory.model';

interface IMainCategory extends Document {
  name: string;
  description?: string;
  slug: string;
  parentCategoryId: PopulatedDoc<Schema.Types.ObjectId & IRootCategory>;
  children: PopulatedDoc<Schema.Types.ObjectId & IChildCategory>[];
  variants: PopulatedDoc<Schema.Types.ObjectId & IVariant>[];
}

const categorySchema = new Schema<IMainCategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true },
    parentCategoryId: { type: Schema.Types.ObjectId, ref: 'RootCategory' },
    children: [{ type: Schema.Types.ObjectId, ref: 'ChildCategory' }],
    variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }],
  },
  { timestamps: true, versionKey: false },
);

const MainCategoryModel = model<IMainCategory>(
  'MainCategory',
  categorySchema,
  'MainCategory',
);

export { IMainCategory, MainCategoryModel };
