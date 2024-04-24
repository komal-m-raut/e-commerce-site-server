import { PopulatedDoc, Schema, model } from 'mongoose';
import { ITenantCompany } from '../tenantCompany.model';

// Warehouse Model
interface ITenantWarehouse extends Document {
warehouseName: string;
  warehousePinCode: string;
  gstinDetails: string;
  warehouseAddress: string;
  city: string;
  state: string;
  country: string;
  warehouseEmail: string;
  warehouseContact: string;
  operationStartTime: string;
  operationEndTime: string;
  perDayOrderCapacity: number;
  isDisabled: boolean;
  companyId: PopulatedDoc<Schema.Types.ObjectId & ITenantCompany>;
}
const TenantWarehouseSchema: Schema<ITenantWarehouse> = new Schema({
  warehouseName: { type: String },
  warehousePinCode: { type: String },
  gstinDetails: { type: String, unique: true },
  warehouseAddress: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  warehouseEmail: { type: String, unique: true },
  warehouseContact: { type: String },
  operationStartTime: { type: String },
  operationEndTime: { type: String },
  perDayOrderCapacity: { type: Number },
  isDisabled: { type: Boolean, default: false },
  companyId: { type: Schema.Types.ObjectId, ref: 'TenantCompany' },
});

// Add composite key
TenantWarehouseSchema.index({ companyId: 1, warehouseName: 1 }, { unique: true });

const TenantWarehouseModel = model<ITenantWarehouse>('TenantWarehouse', TenantWarehouseSchema);

export { TenantWarehouseModel, ITenantWarehouse, TenantWarehouseSchema };
