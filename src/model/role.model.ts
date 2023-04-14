import { Document, Schema, model } from 'mongoose';

interface IRole extends Document {
  title: string;
  adminRoles: any[];
  tenantRoles: any[];
  admins: Schema.Types.ObjectId[]; // Array of ObjectId references to Admin documents
  users: Schema.Types.ObjectId[]; // Array of ObjectId references to User documents
}

const RoleSchema = new Schema(
  {
    title: { type: String, unique: true },
    adminRoles: [{ type: Schema.Types.Mixed }],
    tenantRoles: [{ type: Schema.Types.Mixed }],
    admins: [{ type: Schema.Types.ObjectId, ref: 'Admin' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { versionKey: false },
);

export default model<IRole>('Role', RoleSchema);
