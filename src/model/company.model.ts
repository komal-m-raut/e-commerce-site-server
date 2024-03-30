import { Document, Schema, Model, model } from 'mongoose';
import { IWarehouse, WarehouseSchema } from './sub-company/warehouse.model';
import { BrandSchema, IBrand } from './sub-company/brand.model';

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

interface ICompany extends Document {
  name: string;
  description?: string;
  gstNumber: string;
  gstCertificate?: string;
  panNumber: string;
  panCard?: string;
  aadhaarNumber: string;
  aadhaarCard?: string;
  adminApproval: boolean;
  owner: Schema.Types.ObjectId;
  businessInfo: BusinessInfo;
  contactInfo: ContactInfo;
  warehouseInfo: IWarehouse;
  bankingInfo: BankingInfo;
  brandInfo: IBrand;
}

const CompanySchema: Schema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    gstNumber: { type: String, unique: true },
    gstCertificate: { type: String },
    panNumber: { type: String, unique: true },
    panCard: { type: String },
    aadhaarNumber: { type: String, unique: true },
    aadhaarCard: { type: String },
    adminApproval: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'Admin' },
    businessInfo: { type: businessInfoSchema, required: true },
    contactInfo: { type: contactInfoSchema, required: true },
    warehouseInfo: { type: WarehouseSchema, required: true },
    bankingInfo: { type: bankingInfoSchema, required: true },
    brandInfo: { type: BrandSchema, required: true },
  },
  { timestamps: true, versionKey: false },
);

const CompanyModel: Model<ICompany> = model<ICompany>('Company', CompanySchema);

export { CompanyModel, ICompany };
