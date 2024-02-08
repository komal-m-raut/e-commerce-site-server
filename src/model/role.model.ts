import { Document, Schema, model } from 'mongoose';

interface IRole extends Document {
  roleId: number;
  name: string; // Add enum based on the roles
  subscription: string; // Add enum based on the subscription
  canManageProducts: boolean; // Sample permissions
  canProcessOrders: boolean;
  canEditUsers: boolean;
  dateOfJoining: Date;
  description: string;
}

const RoleSchema = new Schema(
  {
    roleId: { type: Number, unique: true },
    name: { type: String, unique: true },
    subscription: { type: String },
    canManageProducts: { type: Boolean, default: false },
    canProcessOrders: { type: Boolean, default: false },
    canEditUsers: { type: Boolean, default: false },
    dateOfJoining: { type: Date, default: Date.now },
    description: { type: String },
  },
  { versionKey: false },
);

const RoleModel = model<IRole>('Role', RoleSchema);

export { IRole, RoleModel };
