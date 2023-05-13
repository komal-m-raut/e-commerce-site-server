// import { Schema, model, Document } from 'mongoose';

// // Define the Product interface for the document
// interface IProduct extends Document {
//   productId: string;
//   name: string;
//   description: string;
//   shortDescription: string;
//   slug: string;
//   manufacturer: string;
//   countryOfOrigin: string;
//   supplier: Schema.Types.ObjectId;
//   gallery: string[];
//   locations: Schema.Types.ObjectId[];
//   guestCheckout: boolean;
//   privateProduct: boolean;
//   marketplace: boolean;
//   rootCategory: Schema.Types.ObjectId;
//   mainCategory: Schema.Types.ObjectId;
//   childCategory: Schema.Types.ObjectId;
//   SKU: Schema.Types.ObjectId[];
//   published: boolean;
//   tags: string[];
//   productImports: Schema.Types.ObjectId[];
//   reseller: {
//     allowed: boolean;
//     commissionType: string;
//     amount: number;
//   };
//   isDraft: boolean;
// }

// // Define the Product schema
// const productSchema = new Schema<IProduct>({
//   productId: { type: String, required: true },
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   shortDescription: { type: String, required: true },
//   slug: { type: String, required: true, unique: true },
//   manufacturer: { type: String, required: true },
//   countryOfOrigin: { type: String, required: true },
//   supplier: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
//   locations: [{ type: String }],
//   guestCheckout: { type: Boolean, default: false },
//   privateProduct: { type: Boolean, default: false },
//   marketplace: { type: Boolean, default: false },
//   rootCategory: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'RootCategory',
//   },
//   mainCategory: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'MainCategory',
//   },
//   childCategory: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'ChildCategory',
//   },
//   SKU: [{ type: Schema.Types.ObjectId, required: true, ref: 'SKU' }],
//   published: { type: Boolean, default: false },
//   tags: [{ type: String, required: true }],
//   productImports: [{ type: Schema.Types.ObjectId, ref: 'ProductImports' }],
//   reseller: {
//     allowed: { type: Boolean, default: false },
//     commissionType: { type: String },
//     amount: { type: Number },
//   },
//   isDraft: { type: Boolean, default: true },
// });

// // Define the unique index on productId and supplier fields
// productSchema.index({ productId: 1, supplier: 1 }, { unique: true });

// const ProductModel = model<IProduct>('Product', productSchema);

// export { ProductModel, IProduct };

import { Document, Schema, model, PopulatedDoc } from 'mongoose';
import { IRootCategory } from './rootCategory.model';
import { IMainCategory } from './mainCategory.model';
import { IChildCategory } from './childCategory.mode';
import { ITenant } from './tenant.model';
import { IBrand } from './brand.model';
import { IWarehouse } from './warehouse.model';
import { IAttribute } from './attribute.model';

interface ISpecialPrice {
  price: number;
  startDate: Date;
  endDate: Date;
  offerMsg: string;
}

const SpecialPriceSchema = new Schema<ISpecialPrice>({
  price: Number,
  startDate: Date,
  endDate: Date,
  offerMsg: String,
});

interface ICost {
  mrp: number;
  sellingPrice: number;
  specialPrice: ISpecialPrice;
}

const CostSchema = new Schema<ICost>({
  mrp: Number,
  sellingPrice: Number,
  specialPrice: SpecialPriceSchema,
});

interface ISku {
  size: string;
  color: string;
  quantity: number;
  cost: ICost;
  featuredFrom: Date;
  featuredTo: Date;
  trending: boolean;
  published: boolean;
  gallery: string[];
}

const SkuSchema = new Schema<ISku>({
  size: String,
  color: String,
  quantity: Number,
  cost: CostSchema,
  featuredFrom: Date,
  featuredTo: Date,
  trending: Boolean,
  published: Boolean,
  gallery: [String],
});

interface ISupplier {
  language: string;
  manufacturer: PopulatedDoc<Schema.Types.ObjectId & IBrand>;
  supplier: PopulatedDoc<Schema.Types.ObjectId & ITenant>;
  countryOfOrigin: string;
  location: PopulatedDoc<Schema.Types.ObjectId & IWarehouse>;
}

const SupplierSchema = new Schema<ISupplier>({
  language: String,
  manufacturer: { type: Schema.Types.ObjectId, ref: 'Brand' },
  supplier: { type: Schema.Types.ObjectId, ref: 'Tenant' },
  countryOfOrigin: String,
  location: { type: Schema.Types.ObjectId, ref: 'Warehouse' },
});

interface IBasicDetails {
  productId: string;
  productName: string;
  marketplace: boolean;
  urlKey: string;
  shortDescription: string;
  longDescription: string;
  rootCategory: PopulatedDoc<Schema.Types.ObjectId & IRootCategory>;
  mainCategory: PopulatedDoc<Schema.Types.ObjectId & IMainCategory>;
  childCategory: PopulatedDoc<Schema.Types.ObjectId & IChildCategory>;
  attributes: PopulatedDoc<Schema.Types.ObjectId & IAttribute>[];
}

const BasicDetailsSchema = new Schema<IBasicDetails>({
  productId: String,
  productName: String,
  marketplace: Boolean,
  urlKey: String,
  shortDescription: String,
  longDescription: String,
  rootCategory: { type: Schema.Types.ObjectId, ref: 'RootCategory' },
  mainCategory: { type: Schema.Types.ObjectId, ref: 'MainCategory' },
  childCategory: { type: Schema.Types.ObjectId, ref: 'ChildCategory' },
  attributes: [{ type: Schema.Types.ObjectId, ref: 'Attribute' }],
});

interface IShippingDetails {
  quantity: number;
  weight: string;
  dimensions: string;
  packingDimensions: string;
  codAvailable: boolean;
}

const ShippingDetailsSchema = new Schema<IShippingDetails>({
  quantity: Number,
  weight: String,
  dimensions: String,
  packingDimensions: String,
  codAvailable: Boolean,
});

interface IVisibility {
  editorsChoice: boolean;
  guestCheckout: boolean;
}

const VisibilitySchema = new Schema<IVisibility>({
  editorsChoice: Boolean,
  guestCheckout: Boolean,
});

interface IProduct extends Document {
  supplier: ISupplier;
  basicDetails: IBasicDetails;
  shippingDetails: IShippingDetails;
  visibility: IVisibility;
  sku: ISku[];
}

const ProductSchema: Schema<IProduct> = new Schema({
  supplier: SupplierSchema,
  basicDetails: BasicDetailsSchema,
  shippingDetails: ShippingDetailsSchema,
  visibility: VisibilitySchema,
  sku: [SkuSchema],
});

export const Product = model<IProduct>('Product', ProductSchema);
