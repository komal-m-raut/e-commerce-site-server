import { Document, Schema, Model, model, PopulatedDoc } from 'mongoose';
import { ITenant } from './tenant.model';

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
  gstin: { type: String },
  pan: { type: String },
  businessName: { type: String },
  businessOwnerName: { type: String },
  businessModel: { type: String },
  natureOfBusiness: { type: String },
  tryyonForPlanet: { type: String },
  yearsOfOperation: { type: Number },
  avgMrp: { type: Number },
  avgSellingPrice: { type: Number },
  avgMonthlyTurnover: { type: Number },
  percentageOfOnlineBusiness: { type: Number },
});

interface BasicInfo {
  primaryContactName: string;
  primaryEmailId: string;
  primaryContactNumber: string;
  organizationEmail: string;
  organizationContact: string;
  businessOwnerName: string;
  businessOwnerEmail: string;
  businessOwnerContact: string;
  panNumber: string;
  businessModel: string;
}

const basicInfoSchema = new Schema<BasicInfo>(
  {
    primaryContactName: { type: String },
    primaryEmailId: { type: String },
    primaryContactNumber: { type: String },
    organizationEmail: { type: String },
    organizationContact: { type: String },
    businessOwnerName: { type: String },
    businessOwnerEmail: { type: String },
    businessOwnerContact: { type: String },
    panNumber: { type: String },
    businessModel: { type: String },
  },
  { _id: false },
);

interface BankingInfo {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  bankName: string;
  cheque: string;
}

const bankingInfoSchema = new Schema<BankingInfo>(
  {
    accountHolderName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    accountType: { type: String },
    bankName: { type: String },
    cheque: { type: String },
  },
  { _id: false },
);

interface ITenantCompany extends Document {
  name: string;
  description?: string;
  gstNumber: string;
  gstCertificate?: string;
  panNumber: string;
  panCard?: string;
  aadhaarNumber: string;
  aadhaarCard?: string;
  adminApproval: boolean;
  owner: PopulatedDoc<Schema.Types.ObjectId & ITenant>;
  businessInfo: BusinessInfo;
  basicInfo: BasicInfo;
  bankingInfo: BankingInfo;
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
    owner: { type: Schema.Types.ObjectId, ref: 'Tenant' },
    businessInfo: { type: businessInfoSchema },
    basicInfo: { type: basicInfoSchema },
    bankingInfo: { type: bankingInfoSchema },
  },
  { timestamps: true, versionKey: false },
);

CompanySchema.index({ name: 1, owner: 1 }, { unique: true });

const CompanyModel: Model<ITenantCompany> = model<ITenantCompany>(
  'TenantCompany',
  CompanySchema,
);

export { CompanyModel, ITenantCompany };
