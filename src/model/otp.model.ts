import { Schema, model, Document } from 'mongoose';

export interface IOtp extends Document {
  otp: string;
  userType: string;
  userId: string;
  createdAt: Date;
}

const OtpSchema: Schema = new Schema(
  {
    otp: { type: String, required: true, select: false },
    userType: { type: String, required: true, enum: ["admin", "tenant", "user"] },
    userId: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 900, // expires in 15 minutes (900 seconds)
    },
  },
  { versionKey: false },
);

export default model<IOtp>('Otp', OtpSchema);
