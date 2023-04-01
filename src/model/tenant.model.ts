import { Schema, Document, model } from 'mongoose';

interface ITenant extends Document {
  name: string;
  phoneNo: number;
  email: string;
  description?: string;
  companyId: Schema.Types.ObjectId;
  Associations: Schema.Types.ObjectId[];
  Product: Schema.Types.ObjectId[];
  SKU: Schema.Types.ObjectId[];
  Location: Schema.Types.ObjectId[];
  productImports: Schema.Types.ObjectId[];
  ApiKey: Schema.Types.ObjectId[];
}

const TenantSchema: Schema = new Schema(
  {
    name: { type: String },
    phoneNo: { type: Number, unique: true },
    email: { type: String, unique: true },
    description: { type: String },
    companyId: { type: Schema.Types.ObjectId, unique: true },
    Associations: [{ type: Schema.Types.ObjectId }],
    Product: [{ type: Schema.Types.ObjectId }],
    SKU: [{ type: Schema.Types.ObjectId }],
    Location: [{ type: Schema.Types.ObjectId }],
    productImports: [{ type: Schema.Types.ObjectId }],
    ApiKey: [{ type: Schema.Types.ObjectId }],
  },
  { versionKey: false },
);

const TenantModel = model<ITenant>('Tenant', TenantSchema);

export { ITenant, TenantModel };
