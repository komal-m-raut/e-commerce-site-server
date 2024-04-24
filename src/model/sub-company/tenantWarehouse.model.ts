import { PopulatedDoc, Schema, model } from 'mongoose';
import { ITenant } from '../tenant.model';

// Warehouse Model
interface ITenantWarehouse extends Document {
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
  tenantId?: PopulatedDoc<Schema.Types.ObjectId & ITenant>;
}

const TenantWarehouseSchema: Schema<ITenantWarehouse> = new Schema({
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
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant' },
});

const WarehouseModel = model<ITenantWarehouse>('TenantWarehouse', TenantWarehouseSchema);

export { WarehouseModel, ITenantWarehouse, TenantWarehouseSchema };
