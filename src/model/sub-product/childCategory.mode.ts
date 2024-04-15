import { Schema, model, Document, PopulatedDoc } from 'mongoose';
import { IAttribute } from './attribute.model';
import { IMainCategory } from './mainCategory.model';
import { IVariant } from './variant.model';
import { IMarketplaceProduct } from '../marketplaceProduct.model';

interface IChildCategory extends Document {
  name: string;
  description?: string;
  slug: string;
  parentCategoryIds?: PopulatedDoc<Schema.Types.ObjectId & IMainCategory>[];
  parentCategoryId: string[];
  productIds: PopulatedDoc<Schema.Types.ObjectId & IMarketplaceProduct>[];
  attributes: PopulatedDoc<Schema.Types.ObjectId & IAttribute>[];
  variants: PopulatedDoc<Schema.Types.ObjectId & IVariant>[];
}

const ChildCategorySchema = new Schema<IChildCategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true },
    parentCategoryIds: [{ type: Schema.Types.ObjectId, ref: 'MainCategory' }],
    productIds: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    attributes: [{ type: Schema.Types.ObjectId, ref: 'Attribute' }],
    variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }],
    parentCategoryId: [String],
  },
  { timestamps: true, versionKey: false },
);

const ChildCategoryModel = model<IChildCategory>(
  'ChildCategory',
  ChildCategorySchema,
  'ChildCategory',
);

export { IChildCategory, ChildCategoryModel, ChildCategorySchema };
