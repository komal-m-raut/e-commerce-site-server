import { Schema, model, Types, PopulatedDoc } from 'mongoose';
import { ITenant } from '../tenant.model';
import { IRootCategory } from '../sub-product/rootCategory.model';
import { IMainCategory } from '../sub-product/mainCategory.model';

interface ITenantBrand extends Document {
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

const TenantBrandSchema: Schema<ITenantBrand> = new Schema({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
  userType: { type: String, enum: ['tenant', 'supplier'], required: true },
  brandName: { type: String, required: true },
  yearsOfOperation: { type: Number, required: true },
  catalogueDetails: { type: String, required: true },
  brandLogo: { type: String, required: true },
  tradeMark: { type: String, required: true },
  manufactureName: { type: String, required: true },
  manufactureAddress: { type: String, required: true },
  manufactureContact: { type: String, required: true },
  packerAddressAndContact: { type: String, required: true },
  earthFriendly: { type: String, required: true },
  isDisabled: { type: Boolean, default: false, required: true },
  rootCategoryClassification: [{ type: Types.ObjectId, ref: 'RootCategory', required: true }],
  mainCategoryClassification: [{ type: Types.ObjectId, ref: 'MainCategory', required: true }],
});

// Create a composite unique index on tenantId and brandName
TenantBrandSchema.index({ tenantId: 1, brandName: 1 }, { unique: true });

const BrandModel = model<ITenantBrand>('TenantBrand', TenantBrandSchema);

export { BrandModel, ITenantBrand, TenantBrandSchema };
