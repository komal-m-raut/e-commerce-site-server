import { Schema, model, Types, PopulatedDoc } from 'mongoose';
import { ITenant } from '../tenant.model';
import { IRootCategory } from '../sub-product/rootCategory.model';
import { IMainCategory } from '../sub-product/mainCategory.model';

interface IBrand extends Document {
  tenantId?: PopulatedDoc<Schema.Types.ObjectId & ITenant>;
  userType: 'tenant' | 'supplier';
  isDisabled: boolean;
  brandName: string;
  yearsOfOperation: number;
  catalogueDetails: string;
  brandLogo: string;
  tradeMark: string;
  manufactureName: string;
  manufactureAddress: string;
  manufactureContact: string;
  packerAddressAndContact: string;
  earthFriendly: string;
  rootCategoryClassification: PopulatedDoc<
    Schema.Types.ObjectId & IRootCategory
  >[];
  mainCategoryClassification: PopulatedDoc<
    Schema.Types.ObjectId & IMainCategory
  >[];
}

const BrandSchema: Schema<IBrand> = new Schema({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant' }, // Add tenantId
  userType: { type: String, enum: ['tenant', 'supplier'] },
  brandName: { type: String },
  yearsOfOperation: { type: Number },
  catalogueDetails: { type: String },
  brandLogo: { type: String },
  tradeMark: { type: String },
  manufactureName: { type: String },
  manufactureAddress: { type: String },
  manufactureContact: { type: String },
  packerAddressAndContact: { type: String },
  earthFriendly: { type: String },
  isDisabled: { type: Boolean, default: false },
  rootCategoryClassification: [{ type: Types.ObjectId, ref: 'RootCategory' }],
  mainCategoryClassification: [{ type: Types.ObjectId, ref: 'MainCategory' }],
});

// Create a composite unique index on tenantId and brandName
BrandSchema.index({ tenantId: 1, brandName: 1 }, { unique: true });

//TODO: Create a composite unique index on supplierId and brandName

const BrandModel = model<IBrand>('Brand', BrandSchema);

export { BrandModel, IBrand, BrandSchema };
