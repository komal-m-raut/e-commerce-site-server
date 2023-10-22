import { Schema, model, Document, PopulatedDoc } from 'mongoose';
import { IChildCategory } from './childCategory.mode';
import { IRootCategory } from './rootCategory.model';

interface IMainCategory extends Document {
  name: string;
  description?: string;
  slug: string;
  parentCategoryIds: PopulatedDoc<Schema.Types.ObjectId & IRootCategory>[];
  children: IChildCategory[];
}

const MainCategorySchema = new Schema<IMainCategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true },
    parentCategoryIds: [{ type: Schema.Types.ObjectId, ref: 'RootCategory' }],
    children: [{ type: Schema.Types.ObjectId, ref: 'ChildCategory' }],
  },
  { timestamps: true, versionKey: false },
);

const MainCategoryModel = model<IMainCategory>(
  'MainCategory',
  MainCategorySchema,
  'MainCategory',
);

export { IMainCategory, MainCategoryModel, MainCategorySchema };
