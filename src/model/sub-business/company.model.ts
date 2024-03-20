import { Document, Schema, Model, model } from 'mongoose';

interface ICompany extends Document {
  name: string;
  description?: string;
  gstNumber: string;
  gstCertificate?: string;
  panNumber: string;
  panCard?: string;
  aadharNumber: string;
  aadharCard?: string;
  adminApproval: boolean;
  owner: Schema.Types.ObjectId; // Change 'string' to the type of User
  ownerId: Schema.Types.ObjectId;
  tenant?: any; // Define the Tenant type here
}

const CompanySchema: Schema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    gstNumber: { type: String, unique: true },
    gstCertificate: { type: String },
    panNumber: { type: String, unique: true },
    panCard: { type: String },
    aadharNumber: { type: String, unique: true },
    aadharCard: { type: String },
    adminApproval: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }, // Change 'string' to the type of User
    ownerId: { type: Schema.Types.ObjectId, unique: true },
    tenant: { type: Schema.Types.Mixed }, // Change 'any' to the type of Tenant
  },
  { timestamps: true, versionKey: false },
);

const CompanyModel: Model<ICompany> = model<ICompany>('Company', CompanySchema);

export { CompanyModel, ICompany };
