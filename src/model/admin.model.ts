import { Document, Schema, model } from 'mongoose';

interface IAdmin extends Document {
  username: string;
  firstName: string;
  lastName: string;
  phoneNo: number;
  email: string;
  passwordHash: string;
  approved: boolean;
  emailVerified: boolean;
  role?: Schema.Types.ObjectId;
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
  },
  { timestamps: true, versionKey: false },
);

const AdminModel = model<IAdmin>('Admin', AdminSchema, 'Admin');

export { IAdmin, AdminModel };
