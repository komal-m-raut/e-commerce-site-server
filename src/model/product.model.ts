import { Document, Schema, model, PopulatedDoc } from 'mongoose';
import { IRootCategory } from './rootCategory.model';
import { IMainCategory } from './mainCategory.model';
import { IChildCategory } from './childCategory.mode';
import { ITenant } from './tenant.model';
import { IBrand } from './brand.model';
import { IWarehouse } from './warehouse.model';
import { IAttribute } from './attribute.model';
import { ISKU, SKUModel } from './sku.model';

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
  visibility: IVisibility;
  sku: ISKU[];
}

const ProductSchema: Schema<IProduct> = new Schema({
  supplier: SupplierSchema,
  basicDetails: BasicDetailsSchema,
  visibility: VisibilitySchema,
  sku: [SKUModel],
});

const ProductModel = model<IProduct>('Product', ProductSchema);

export { ProductModel, IProduct };
