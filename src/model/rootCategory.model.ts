import { Schema, model, Document } from 'mongoose';
import { IMainCategory } from './mainCategory.model';

interface IRootCategory extends Document {
  name: string;
  description?: string;
  categoryImage: string;
  slug: string;
  children: IMainCategory[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

const rootCategorySchema = new Schema<IRootCategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true },
    categoryImage: { type: String },
    children: [{ type: Schema.Types.ObjectId, ref: 'MainCategory' }],
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
  },
  { timestamps: true, versionKey: false },
);

const RootCategoryModel = model<IRootCategory>(
  'RootCategory',
  rootCategorySchema,
  'RootCategory',
);

export { IRootCategory, RootCategoryModel, rootCategorySchema };
