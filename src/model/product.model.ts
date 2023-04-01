import { Schema, Document, model } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description?: string;
  shortDescriptions?: string;
  slug: string;
  quantity: number;
  supplier: Schema.Types.ObjectId;
  published: boolean;
  attributes: any;
  categories: Schema.Types.ObjectId[];
  SKU: Schema.Types.ObjectId[];
  manufacturer: string;
  locations: Schema.Types.ObjectId[];
  countryOfOrigin: string;
  trending: boolean;
  featuredFrom?: Date;
  featuredTo?: Date;
  guestCheckout: boolean;
  private_product: boolean;
  marketPlace: boolean;
  ProductImports: Schema.Types.ObjectId[];
  reseller?: any;
  featureImage?: string;
  gallery: string[];
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    shortDescriptions: { type: String },
    slug: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    supplier: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
    published: { type: Boolean, default: false },
    attributes: { type: Schema.Types.Mixed },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    SKU: [{ type: Schema.Types.ObjectId, ref: 'SKU' }],
    manufacturer: { type: String },
    locations: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
    countryOfOrigin: { type: String },
    trending: { type: Boolean, default: false },
    featuredFrom: { type: Date },
    featuredTo: { type: Date },
    guestCheckout: { type: Boolean, default: false },
    private_product: { type: Boolean, default: false },
    marketPlace: { type: Boolean, default: false },
    ProductImports: [{ type: Schema.Types.ObjectId, ref: 'ProductImports' }],
    reseller: { type: Schema.Types.Mixed },
    featureImage: { type: String },
    gallery: [{ type: String }],
  },
  { versionKey: false },
);

export default model<IProduct>('Product', productSchema);
