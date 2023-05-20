import { Schema, model, Document, PopulatedDoc } from 'mongoose';
import { IAttribute } from './attribute.model';
import { IMainCategory } from './mainCategory.model';
import { IProduct } from './product.model';
import { IVariant } from './variant.model';

interface IChildCategory extends Document {
  name: string;
  description?: string;
  slug: string;
  parentCategoryId?: PopulatedDoc<Schema.Types.ObjectId & IMainCategory>[];
  productIds: PopulatedDoc<Schema.Types.ObjectId & IProduct>[];
  attributes: PopulatedDoc<Schema.Types.ObjectId & IAttribute>[];
  variants: PopulatedDoc<Schema.Types.ObjectId & IVariant>[];
}

const childCategorySchema = new Schema<IChildCategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true },
    parentCategoryId: { type: Schema.Types.ObjectId, ref: 'MainCategory' },
    productIds: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    attributes: [{ type: Schema.Types.ObjectId, ref: 'Attribute' }],
    variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }],
  },
  { timestamps: true, versionKey: false },
);

const ChildCategoryModel = model<IChildCategory>(
  'ChildCategory',
  childCategorySchema,
  'ChildCategory',
);

export { IChildCategory, ChildCategoryModel };
