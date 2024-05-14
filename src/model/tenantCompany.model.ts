import { Document, Schema, Model, model, PopulatedDoc } from 'mongoose';
import { ITenant } from './tenant.model';

interface BasicInfo {
  businessOwnerName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  businessModel: string;
  businessOwnerEmail: string;
  businessOwnerContact: string;
  panNumber: string;
  primaryContactName: string;
  primaryEmailId: string;
  primaryContactNumber: string;
}

const basicInfoSchema = new Schema<BasicInfo>(
  {
    businessOwnerName: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
    businessModel: { type: String },
    businessOwnerEmail: { type: String },
    businessOwnerContact: { type: String },
    panNumber: { type: String },
    primaryContactName: { type: String },
    primaryEmailId: { type: String },
    primaryContactNumber: { type: String },
  },
  { _id: false },
);

interface OrganizationDetails {
  registeredCompanyName: string;
  gstin: string;
  panNumber: string;
  registeredCompanyAddress: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  gstCertificate: string;
  organizationEmail: string;
  organizationContact: string;
}

const organizationDetailsSchema = new Schema<OrganizationDetails>(
  {
    registeredCompanyName: { type: String },
    gstin: { type: String },
    panNumber: { type: String },
    registeredCompanyAddress: { type: String },
    city: { type: String },
    pincode: { type: String },
    state: { type: String },
    country: { type: String },
    gstCertificate: { type: String },
    organizationEmail: { type: String },
    organizationContact: { type: String },
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
  aadhaarNumber: string;
  aadhaarCard?: string;
  adminApproval: boolean;
  owner: PopulatedDoc<Schema.Types.ObjectId & ITenant>;
  basicInfo: BasicInfo;
  organizationDetails: OrganizationDetails[];
  bankingInfo: BankingInfo;
}

const CompanySchema: Schema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    aadhaarNumber: { type: String, unique: true },
    aadhaarCard: { type: String },
    adminApproval: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'Tenant' },
    organizationDetails: { type: [organizationDetailsSchema] },
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
