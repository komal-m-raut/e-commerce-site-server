import { Schema, model, Document } from 'mongoose';
import { IMainCategory } from './mainCategory.model';

interface IRootCategory extends Document {
  name: string;
  description?: string;
  slug: string;
  children: IMainCategory[];
}

const rootCategorySchema = new Schema<IRootCategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true },
    children: [{ type: Schema.Types.ObjectId, ref: 'MainCategory' }],
  },
  { timestamps: true, versionKey: false },
);

const RootCategoryModel = model<IRootCategory>(
  'RootCategory',
  rootCategorySchema,
  'RootCategory',
);

export { IRootCategory, RootCategoryModel };
