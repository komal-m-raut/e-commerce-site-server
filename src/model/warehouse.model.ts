import { Schema, model } from 'mongoose';

// Warehouse Model
interface IWarehouse extends Document {
  warehouseName: string; // Warehouses usually have a name or identifier
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
  warehouseManager: string; // Contact person responsible for the warehouse
}

const WarehouseSchema: Schema<IWarehouse> = new Schema({
  warehouseName: String,
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
  warehouseManager: String,
});

const WarehouseModel = model<IWarehouse>('Warehouse', WarehouseSchema);

export { WarehouseModel, IWarehouse };
