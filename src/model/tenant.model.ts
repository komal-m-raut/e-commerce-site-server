import { Schema, model, Document, PopulatedDoc } from 'mongoose';
import { IRole } from './role.model';

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
  preset: { type: String },
  headerTemplate: { type: String },
  navTemplate: { type: String },
  sections: [
    {
      cardTemplate: { type: String },
      heading: { type: String },
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
  title: { type: String },
  slug: { type: String },
  html: { type: String },
  status: { type: String },
  seo: {
    title: { type: String },
    keywords: [{ type: String }],
    description: { type: String },
  },
});

interface ITenant extends Document {
  name: string;
  phoneNo: number;
  email: string;
  password: string;
  domain: string;
  customHomeSection: HomeSection;
  marketingPages: MarketingPage[];
  role: PopulatedDoc<Schema.Types.ObjectId & IRole>;
  addOns: Record<string, any>;
  isVerified: boolean;
}

const TenantSchema = new Schema<ITenant>(
  {
    name: { type: String },
    phoneNo: { type: Number, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    domain: { type: String, unique: true },
    customHomeSection: { type: homeSectionSchema },
    marketingPages: [marketingPageSchema],
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      default: '661b923a035c08718a53f50c',
    },
    addOns: { type: Schema.Types.Mixed },
    isVerified: { type: Boolean, default: false },
  },
  { versionKey: false },
);

const TenantModel = model<ITenant>('Tenant', TenantSchema);
export { ITenant, TenantModel, TenantSchema };
