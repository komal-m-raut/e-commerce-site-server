import { Document, PopulatedDoc, Schema, model } from 'mongoose';
import { IRootCategory } from './rootCategory.model';
import { IMainCategory } from './mainCategory.model';
import { IChildCategory } from './childCategory.mode';
import { IAttribute } from './attribute.model';
import { IWarehouse } from './warehouse.model';
import { ITenant } from './tenant.model';
import { IBrand } from './brand.model';
import { ISKU, skuSchema } from './sku.model';

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

interface IGeneralDetails {
  productId: string;
  productName: string;
  marketplace: boolean;
  urlKey: string;
}

const GeneralDetailsSchema = new Schema<IGeneralDetails>({
  productId: { type: String, unique: true, required: true },
  productName: String,
  marketplace: Boolean,
  urlKey: String,
});

interface IProductIdentifiers {
  sku: ISKU;
  ean: string;
}

const ProductIdentifiersSchema = new Schema<IProductIdentifiers>({
  sku: skuSchema,
  ean: String,
});

interface IPricing {
  mrp: number;
  currentPrice: number;
  wholesalePricing: {
    minQuantity: number;
    maxQuantity: number;
    price: number;
  };
  resellerPrice: number;
}

const PricingSchema = new Schema<IPricing>({
  mrp: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  wholesalePricing: {
    minQuantity: Number,
    maxQuantity: Number,
    price: Number,
  },
  resellerPrice: Number,
});

interface ICategoryAndAttributes {
  rootCategory: PopulatedDoc<Schema.Types.ObjectId & IRootCategory>;
  mainCategory: PopulatedDoc<Schema.Types.ObjectId & IMainCategory>;
  childCategory: PopulatedDoc<Schema.Types.ObjectId & IChildCategory>;
  attributes: PopulatedDoc<Schema.Types.ObjectId & IAttribute>[];
}

const CategoryAndAttributesSchema = new Schema<ICategoryAndAttributes>({
  rootCategory: { type: Schema.Types.ObjectId, ref: 'RootCategory' },
  mainCategory: { type: Schema.Types.ObjectId, ref: 'MainCategory' },
  childCategory: { type: Schema.Types.ObjectId, ref: 'ChildCategory' },
  attributes: [{ type: Schema.Types.ObjectId, ref: 'Attribute' }],
});

interface IDescriptionAndSEO {
  shortDescription: string;
  longDescription: string;
  seoKeywords: string;
}

const DescriptionAndSEOSchema = new Schema<IDescriptionAndSEO>({
  shortDescription: String,
  longDescription: String,
  seoKeywords: String,
});

interface IVisibility {
  editorsChoice: boolean;
  guestCheckout: boolean;
}

const VisibilitySchema = new Schema<IVisibility>({
  editorsChoice: Boolean,
  guestCheckout: Boolean,
});

interface IGroups {
  groupName: string;
}

const GroupsSchema = new Schema({
  groupName: String,
});

// interface IProductImportable {
//   isImportable: boolean;
// }

// const CustomizationSchema = new Schema<IProductImportable>({
//   isImportable: Boolean,
// });

// interface IGiftWrapping {
//   giftWrapAvailable: boolean;
// }

// const GiftWrappingSchema = new Schema({
//   giftWrapAvailable: Boolean,
// });

// interface ICustomFields {
//   customFieldName: string;
//   customFieldValue: string;
// }

// const CustomFieldsSchema = new Schema({
//   customFieldName: String,
//   customFieldValue: String,
// });

interface ILinkedProducts {
  relatedProducts: Schema.Types.ObjectId[];
}

const LinkedProductsSchema = new Schema({
  relatedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

interface IProduct extends Document {
  supplier: ISupplier;
  generalDetails: IGeneralDetails;
  pricing: IPricing;
  categoryAndAttributes: ICategoryAndAttributes;
  productIdentifiers: IProductIdentifiers;
  descriptionAndSEO: IDescriptionAndSEO;
  visibility: IVisibility;
  groups: IGroups;
  linkedProducts: ILinkedProducts;
}

const ProductSchema: Schema<IProduct> = new Schema({
  supplier: SupplierSchema,
  generalDetails: GeneralDetailsSchema,
  pricing: PricingSchema,
  categoryAndAttributes: CategoryAndAttributesSchema,
  productIdentifiers: ProductIdentifiersSchema,
  descriptionAndSEO: DescriptionAndSEOSchema,
  visibility: VisibilitySchema,
  groups: GroupsSchema,
  linkedProducts: LinkedProductsSchema,
});

const ProductModel = model<IProduct>('Product', ProductSchema);

export { ProductModel, IProduct };
