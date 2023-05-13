// import mongoose, { Document, Schema } from 'mongoose';

// interface IWarehouse extends Document {
//   warehousePincode: string;
//   WarehouseGstin: string;
//   WarehouseGstinVerified: boolean;
//   warehouseAddress: string;
//   warehouseCity: string;
//   warehouseState: string;
//   warehouseCountry: string;
//   warehouseEmail: string;
//   warehousePhone: string;
//   startTimings: string;
//   endTimings: string;
//   processingCapacity: string;
// }

// interface IBrand extends Document {
//   name: string;
//   logo: string;
//   catalogue: string;
//   natureOfBusiness: string;
//   document: string;
//   averageMrp: string;
//   averageSp: string;
//   averageTurnover: string;
//   onlinePercentage: string;
//   yearsOfOperation: string;
//   tryyonForEarth: string;
//   primaryCategory: string;
//   secondaryCategory: string;
// }

// interface ITenant extends Document {
//   phoneNo: number;
//   countryCode: number;
//   email: string;
//   isVerified: boolean;
//   password: string;
//   gstin: string;
//   gstinVerified: boolean;
//   primaryName: string;
//   ownersName: string;
//   primaryEmail: string;
//   ownersEmail: string;
//   ownersPhone: string;
//   primaryPhone: string;
//   businessModel: string;
//   osmType: string;
//   accountHolder: string;
//   accountNumber: string;
//   accountType: string;
//   ifsc: string;
//   bank: string;
//   cheque: string;
//   totalWarehouse: number;
//   warehouse: IWarehouse[];
//   totalBrands: number;
//   brand: IBrand[];
//   declared: boolean;
// }

// const WarehouseSchema = new Schema<IWarehouse>({
//   warehousePincode: String,
//   WarehouseGstin: String,
//   WarehouseGstinVerified: Boolean,
//   warehouseAddress: String,
//   warehouseCity: String,
//   warehouseState: String,
//   warehouseCountry: String,
//   warehouseEmail: String,
//   warehousePhone: String,
//   startTimings: String,
//   endTimings: String,
//   processingCapacity: String,
// });

// const BrandSchema = new Schema<IBrand>({
//   name: String,
//   logo: String,
//   catalogue: String,
//   natureOfBusiness: String,
//   document: String,
//   averageMrp: String,
//   averageSp: String,
//   averageTurnover: String,
//   onlinePercentage: String,
//   yearsOfOperation: String,
//   tryyonForEarth: String,
//   primaryCategory: String,
//   secondaryCategory: String,
// });

// const TenantSchema = new Schema<ITenant>({
//   phoneNo: { type: Number, unique: true },
//   countryCode: Number,
//   email: { type: String, unique: true },
//   isVerified: { type: Boolean, default: false },
//   password: String,
//   gstin: String,
//   gstinVerified: Boolean,
//   primaryName: String,
//   ownersName: String,
//   primaryEmail: String,
//   ownersEmail: String,
//   ownersPhone: String,
//   primaryPhone: String,
//   businessModel: String,
//   osmType: String,
//   accountHolder: String,
//   accountNumber: String,
//   accountType: String,
//   ifsc: String,
//   bank: String,
//   cheque: String,
//   totalWarehouse: Number,
//   warehouse: [WarehouseSchema],
//   totalBrands: Number,
//   brand: [BrandSchema],
//   declared: Boolean,
// });

// const TenantModel = mongoose.model<ITenant>('Tenant', TenantSchema);
// export { ITenant, TenantModel };

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
