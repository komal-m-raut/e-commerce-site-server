import { Schema, model, Document } from 'mongoose';

// Define the Product interface for the document
interface IProduct extends Document {
  productId: string;
  name: string;
  description: string;
  shortDescription: string;
  slug: string;
  manufacturer: string;
  countryOfOrigin: string;
  supplier: Schema.Types.ObjectId;
  gallery: string[];
  locations: Schema.Types.ObjectId[];
  guestCheckout: boolean;
  privateProduct: boolean;
  marketplace: boolean;
  rootCategory: Schema.Types.ObjectId;
  mainCategory: Schema.Types.ObjectId;
  childCategory: Schema.Types.ObjectId;
  SKU: Schema.Types.ObjectId[];
  published: boolean;
  tags: string[];
  productImports: Schema.Types.ObjectId[];
  reseller: {
    allowed: boolean;
    commissionType: string;
    amount: number;
  };
  isDraft: boolean;
}

// Define the Product schema
const productSchema = new Schema<IProduct>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  manufacturer: { type: String, required: true },
  countryOfOrigin: { type: String, required: true },
  supplier: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
  locations: [{ type: String }],
  guestCheckout: { type: Boolean, default: false },
  privateProduct: { type: Boolean, default: false },
  marketplace: { type: Boolean, default: false },
  rootCategory: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'RootCategory',
  },
  mainCategory: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'MainCategory',
  },
  childCategory: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'ChildCategory',
  },
  SKU: [{ type: Schema.Types.ObjectId, required: true, ref: 'SKU' }],
  published: { type: Boolean, default: false },
  tags: [{ type: String, required: true }],
  productImports: [{ type: Schema.Types.ObjectId, ref: 'ProductImports' }],
  reseller: {
    allowed: { type: Boolean, default: false },
    commissionType: { type: String },
    amount: { type: Number },
  },
  isDraft: { type: Boolean, default: true },
});

// Define the unique index on productId and supplier fields
productSchema.index({ productId: 1, supplier: 1 }, { unique: true });

const ProductModel = model<IProduct>('Product', productSchema);

export { ProductModel, IProduct };
