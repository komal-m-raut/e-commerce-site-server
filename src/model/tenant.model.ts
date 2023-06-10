import { Schema, model, Document } from 'mongoose';
import { IWarehouse, WarehouseModel } from './warehouse.model';
import { BrandModel, IBrand } from './brand.model';

interface BusinessInfo {
  gstin: string;
  pan: string;
  businessName: string;
  businessOwnerName: string;
  businessModel: string;
  natureOfBusiness: string;
  tryyonForPlanet: string;
  yearsOfOperation: number;
  avgMrp: number;
  avgSellingPrice: number;
  avgMonthlyTurnover: number;
  percentageOfOnlineBusiness: number;
}

const businessInfoSchema = new Schema<BusinessInfo>({
  gstin: String,
  pan: String,
  businessName: String,
  businessOwnerName: String,
  businessModel: String,
  natureOfBusiness: String,
  tryyonForPlanet: String,
  yearsOfOperation: Number,
  avgMrp: Number,
  avgSellingPrice: Number,
  avgMonthlyTurnover: Number,
  percentageOfOnlineBusiness: Number,
});

interface ContactInfo {
  businessOwnerEmail: string;
  businessOwnerContact: string;
  organizationEmail: string;
  organizationContact: string;
  primaryEmailId: string;
  primaryContactName: string;
  primaryContactNumber: string;
}

const contactInfoSchema = new Schema<ContactInfo>({
  businessOwnerEmail: String,
  businessOwnerContact: String,
  organizationEmail: String,
  organizationContact: String,
  primaryEmailId: String,
  primaryContactName: String,
  primaryContactNumber: String,
});

interface BankingInfo {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  bankName: string;
  bankLocation: string;
  cheque: string;
}

const bankingInfoSchema = new Schema<BankingInfo>({
  accountHolderName: String,
  accountNumber: String,
  ifscCode: String,
  accountType: String,
  bankName: String,
  bankLocation: String,
  cheque: String,
});

interface ITenant extends Document {
  email: string;
  phoneNo: number;
  password: string;
  businessInfo: BusinessInfo;
  contactInfo: ContactInfo;
  warehouseInfo: IWarehouse;
  bankingInfo: BankingInfo;
  brandInfo: IBrand;
}

const TenantSchema = new Schema<ITenant>({
  email: { type: String, unique: true },
  phoneNo: { type: Number, unique: true },
  password: { type: String },
  businessInfo: { type: businessInfoSchema, required: true },
  contactInfo: { type: contactInfoSchema, required: true },
  warehouseInfo: { type: WarehouseModel, required: true },
  bankingInfo: { type: bankingInfoSchema, required: true },
  brandInfo: { type: BrandModel, required: true },
});

const TenantModel = model<ITenant>('Tenant', TenantSchema);
export { ITenant, TenantModel };
