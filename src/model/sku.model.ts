import { Schema, model, Document } from 'mongoose';

interface ISKU extends Document {
  slug: string;
  quantity: number;
  productId: Schema.Types.ObjectId;
  supplierId: Schema.Types.ObjectId;
  published: boolean;
  attributes: Record<string, unknown>;
  categoryIds: Schema.Types.ObjectId[];
  price: number;
  discountedPrice: number;
  productImportIds: Schema.Types.ObjectId[];
  featureImage?: string;
  gallery: string[];
  cartIds: Schema.Types.ObjectId[];
}

const skuSchema = new Schema<ISKU>(
  {
    slug: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
    supplierId: { type: Schema.Types.ObjectId, required: true, ref: 'Tenant' },
    published: { type: Boolean, default: false },
    attributes: { type: Schema.Types.Mixed },
    categoryIds: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    productImportIds: [{ type: Schema.Types.ObjectId, ref: 'ProductImports' }],
    featureImage: { type: String },
    gallery: [{ type: String }],
    cartIds: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
  },
  { timestamps: true, versionKey: false },
);

const SKUModule = model<ISKU>('SKU', skuSchema);

export default SKUModule;
