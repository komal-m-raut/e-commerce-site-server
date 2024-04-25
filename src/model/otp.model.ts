import { Schema, model, Document } from 'mongoose';

export interface IOtp extends Document {
  otp: string;
  userType: 'admin' | 'tenant' | 'user';
  userId: Schema.Types.ObjectId;
  category: 'email' | 'phoneNo';
  otpFor: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

const OtpSchema: Schema = new Schema(
  {
    otp: { type: String, required: true, select: false },
    userType: {
      type: String,
      required: true,
      enum: ['admin', 'tenant', 'user'],
    },
    category: {
      type: String,
      required: true,
      enum: ['email', 'phoneNo'],
    },
    otpFor: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    expiresAt: { type: Date, default: Date.now, index: { expires: '15m' } },
  },
  { versionKey: false, timestamps: true },
);

export default model<IOtp>('Otp', OtpSchema);
