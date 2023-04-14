import mongoose, { Document, Schema } from 'mongoose';

interface IWarehouse extends Document {
  warehousePincode: string;
  WarehouseGstin: string;
  WarehouseGstinVerified: boolean;
  warehouseAddress: string;
  warehouseCity: string;
  warehouseState: string;
  warehouseCountry: string;
  warehouseEmail: string;
  warehousePhone: string;
  startTimings: string;
  endTimings: string;
  processingCapacity: string;
}

interface IBrand extends Document {
  name: string;
  logo: string;
  catalogue: string;
  natureOfBusiness: string;
  document: string;
  averageMrp: string;
  averageSp: string;
  averageTurnover: string;
  onlinePercentage: string;
  yearsOfOperation: string;
  tryyonForEarth: string;
  primaryCategory: string;
  secondaryCategory: string;
}

interface ITenant extends Document {
  phoneNo: number;
  countryCode: number;
  email: string;
  isVerified: boolean;
  password: string;
  gstin: string;
  gstinVerified: boolean;
  primaryName: string;
  ownersName: string;
  primaryEmail: string;
  ownersEmail: string;
  ownersPhone: string;
  primaryPhone: string;
  businessModel: string;
  osmType: string;
  accountHolder: string;
  accountNumber: string;
  accountType: string;
  ifsc: string;
  bank: string;
  cheque: string;
  totalWarehouse: number;
  warehouse: IWarehouse[];
  totalBrands: number;
  brand: IBrand[];
  declared: boolean;
}

const WarehouseSchema = new Schema<IWarehouse>({
  warehousePincode: String,
  WarehouseGstin: String,
  WarehouseGstinVerified: Boolean,
  warehouseAddress: String,
  warehouseCity: String,
  warehouseState: String,
  warehouseCountry: String,
  warehouseEmail: String,
  warehousePhone: String,
  startTimings: String,
  endTimings: String,
  processingCapacity: String,
});

const BrandSchema = new Schema<IBrand>({
  name: String,
  logo: String,
  catalogue: String,
  natureOfBusiness: String,
  document: String,
  averageMrp: String,
  averageSp: String,
  averageTurnover: String,
  onlinePercentage: String,
  yearsOfOperation: String,
  tryyonForEarth: String,
  primaryCategory: String,
  secondaryCategory: String,
});

const TenantSchema = new Schema<ITenant>({
  phoneNo: { type: Number, unique: true },
  countryCode: Number,
  email: { type: String, unique: true },
  isVerified: { type: Boolean, default: false },
  password: String,
  gstin: String,
  gstinVerified: Boolean,
  primaryName: String,
  ownersName: String,
  primaryEmail: String,
  ownersEmail: String,
  ownersPhone: String,
  primaryPhone: String,
  businessModel: String,
  osmType: String,
  accountHolder: String,
  accountNumber: String,
  accountType: String,
  ifsc: String,
  bank: String,
  cheque: String,
  totalWarehouse: Number,
  warehouse: [WarehouseSchema],
  totalBrands: Number,
  brand: [BrandSchema],
  declared: Boolean,
});

const TenantModel = mongoose.model<ITenant>('Tenant', TenantSchema);
export { ITenant, TenantModel };
