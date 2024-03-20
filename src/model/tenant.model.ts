import { Schema, model, Document, PopulatedDoc } from 'mongoose';
import { IWarehouse, WarehouseSchema } from './sub-business/warehouse.model';
import { BrandSchema, IBrand } from './sub-business/brand.model';
import { IRole } from './role.model';

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

interface CustomCard {
  cssProperties: Record<string, string>;
}

interface CustomSection {
  cardTemplate: string;
  heading: string;
  cards: CustomCard[];
}

interface HomeSection {
  preset: string;
  headerTemplate: string;
  navTemplate: string;
  sections: CustomSection[];
}

const homeSectionSchema = new Schema<HomeSection>({
  preset: { type: String, required: true },
  headerTemplate: { type: String, required: true },
  navTemplate: { type: String, required: true },
  sections: [
    {
      cardTemplate: { type: String, required: true },
      heading: { type: String, required: true },
      cards: [
        {
          cssProperties: { type: Schema.Types.Mixed },
        },
      ],
    },
  ],
});

interface MarketingPage {
  _id: Schema.Types.ObjectId;
  title: string;
  slug: string;
  html: string;
  status: 'active' | 'inactive';
  seo: {
    title: string;
    keywords: string[];
    description: string;
  };
}

const marketingPageSchema = new Schema<MarketingPage>({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  html: { type: String, required: true },
  status: { type: String, required: true },
  seo: {
    title: { type: String, required: true },
    keywords: [{ type: String }],
    description: { type: String, required: true },
  },
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
  customHomeSection: HomeSection;
  marketingPages: MarketingPage[];
  role?: PopulatedDoc<Schema.Types.ObjectId & IRole>;
}

const TenantSchema = new Schema<ITenant>({
  email: { type: String, unique: true },
  phoneNo: { type: Number, unique: true },
  password: { type: String },
  businessInfo: { type: businessInfoSchema, required: true },
  contactInfo: { type: contactInfoSchema, required: true },
  warehouseInfo: { type: WarehouseSchema, required: true },
  bankingInfo: { type: bankingInfoSchema, required: true },
  brandInfo: { type: BrandSchema, required: true },
  customHomeSection: { type: homeSectionSchema, required: true },
  marketingPages: [marketingPageSchema],
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
});

const TenantModel = model<ITenant>('Tenant', TenantSchema);
export { ITenant, TenantModel, TenantSchema };
