import { Document, PopulatedDoc, Schema, model } from 'mongoose';
import { IRole } from './role.model';
import { ICompany } from './company.model';

interface IAdmin extends Document {
  username: string;
  firstName: string;
  lastName: string;
  phoneNo: number;
  email: string;
  passwordHash: string;
  approved: boolean;
  emailVerified: boolean;
  role?: PopulatedDoc<Schema.Types.ObjectId & IRole>;
  type: 'super-admin' | 'tenant' | 'supplier';
  companies?: PopulatedDoc<Schema.Types.ObjectId & ICompany>[];
}

const AdminSchema = new Schema<IAdmin>(
  {
    username: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNo: { type: Number, unique: true },
    email: { type: String, unique: true },
    passwordHash: { type: String },
    approved: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    type: {
      type: String,
      enum: ['super-admin', 'tenant', 'supplier'],
      default: 'supplier',
    },
    companies: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
  },
  { timestamps: true, versionKey: false },
);

const AdminModel = model<IAdmin>('Admin', AdminSchema, 'Admin');

export { IAdmin, AdminModel };
