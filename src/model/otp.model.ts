import { Schema, model, Document } from 'mongoose';

export interface IOtp extends Document {
  otp: string;
  userType: 'admin' | 'tenant' | 'user';
  userId: Schema.Types.ObjectId;
  category: 'email' | 'phone';
  otpFor: string;
  createdAt: Date;
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
  },
  { versionKey: false, timestamps: true, expireAfterSeconds: 60 * 15 },
);

export default model<IOtp>('Otp', OtpSchema);
