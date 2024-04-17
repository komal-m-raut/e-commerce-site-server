import { Schema, model } from 'mongoose';

// Warehouse Model
interface IWarehouse extends Document {
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
}

const WarehouseSchema: Schema<IWarehouse> = new Schema({
  warehousePinCode: String,
  gstinDetails: String,
  warehouseAddress: String,
  city: String,
  state: String,
  country: String,
  warehouseEmail: String,
  warehouseContact: String,
  operationStartTime: String,
  operationEndTime: String,
  perDayOrderCapacity: Number,
});

const WarehouseModel = model<IWarehouse>('Warehouse', WarehouseSchema);

export { WarehouseModel, IWarehouse, WarehouseSchema };
