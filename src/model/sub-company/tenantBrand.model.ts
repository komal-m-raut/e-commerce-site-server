import { Schema, model, Types, PopulatedDoc } from 'mongoose';
import { ITenant } from '../tenant.model';
import { IRootCategory } from '../sub-product/rootCategory.model';
import { IMainCategory } from '../sub-product/mainCategory.model';

interface ITenantBrand extends Document {
  companyId: PopulatedDoc<Schema.Types.ObjectId & ITenant>;
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

const TenantBrandSchema: Schema<ITenantBrand> = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: 'TenantCompany', required: true },
  brandName: { type: String, required: true },
  yearsOfOperation: { type: Number },
  catalogueDetails: { type: String },
  brandLogo: { type: String },
  tradeMark: { type: String },
  manufactureName: { type: String, required: true },
  manufactureAddress: { type: String, required: true },
  manufactureContact: { type: String, required: true },
  packerAddressAndContact: { type: String },
  earthFriendly: { type: String },
  isDisabled: { type: Boolean, default: false, required: true },
  rootCategoryClassification: [{ type: Types.ObjectId, ref: 'RootCategory', required: true }],
  mainCategoryClassification: [{ type: Types.ObjectId, ref: 'MainCategory', required: true }],
});

// Create a composite unique index on tenantId and brandName
TenantBrandSchema.index({ companyId: 1, brandName: 1 }, { unique: true });

const TenantBrandModel = model<ITenantBrand>('TenantBrand', TenantBrandSchema);

export { TenantBrandModel, ITenantBrand, TenantBrandSchema };
