import { Document, Schema, model } from 'mongoose';

interface IAdmin extends Document {
  username: string;
  firstName: string;
  lastName: string;
  phoneNo: number;
  email: string;
  passwordHash: string;
  token?: string;
  approved: boolean;
  email_verified: boolean;
  verificationCode?: string;
  verificationExpiry?: Date;
  role?: Schema.Types.ObjectId;
}

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  phoneNo: { type: Number, unique: true },
  email: { type: String, unique: true },
  passwordHash: { type: String },
  token: { type: String },
  approved: { type: Boolean, default: false },
  email_verified: { type: Boolean, default: false },
  verificationCode: { type: String },
  verificationExpiry: { type: Date },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
});

const AdminModel = model<IAdmin>('Admin', AdminSchema, 'Admin');

export { IAdmin, AdminModel };
