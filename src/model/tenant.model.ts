import { Schema, Document, model } from 'mongoose';

interface ITenant extends Document {
  phoneNo: number;
  countryCode: number;
  email: string;
  password: string;
  primaryName: string;
  ownersName: string;
  primaryEmail: string;
  ownersEmail: string;
  ownersPhone: string;
  primaryPhone: string;
  businessModel: string;
  osmType: string;
  warehousePincode: string;
  WarehouseGstin: string;
  warehouseAddress: string;
  warehouseCity: string;
  warehouseState: string;
  warehouseCountry: string;
  warehouseEmail: string;
  warehousePhone: string;
  startTimings: string;
  endTimings: string;
  processingCapacity: string;
  accountHolder: string;
  accountNumber: string;
  accountType: string;
  ifsc: string;
  bank: string;
  cheque: string;
  brandCount: string;
  declared: string;
}

const TenantSchema: Schema = new Schema(
  {
    phoneNo: { type: Number, unique: true },
    countryCode: Number,
    email: { type: String, unique: true },
    password: String,
    primaryName: String,
    ownersName: String,
    primaryEmail: String,
    ownersEmail: String,
    ownersPhone: String,
    primaryPhone: String,
    businessModel: String,
    osmType: String,
    warehousePincode: String,
    WarehouseGstin: String,
    warehouseAddress: String,
    warehouseCity: String,
    warehouseState: String,
    warehouseCountry: String,
    warehouseEmail: String,
    warehousePhone: String,
    startTimings: String,
    endTimings: String,
    processingCapacity: String,
    accountHolder: String,
    accountNumber: String,
    accountType: String,
    ifsc: String,
    bank: String,
    cheque: String,
    brandCount: String,
    declared: String,
  },
  { versionKey: false },
);

const TenantModel = model<ITenant>('Tenant', TenantSchema);

export { ITenant, TenantModel };
