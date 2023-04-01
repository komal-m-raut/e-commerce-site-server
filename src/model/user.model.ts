import { Document, Schema, Model, model } from 'mongoose';

interface IUser extends Document {
  username: string;
  firstName: string;
  lastName: string;
  phoneNo: number;
  email: string;
  passwordHash: string;
  token?: string;
  email_verified: boolean;
  verificationCode?: string;
  verificationExpiry?: Date;
  associations?: any; // Define the Associations type here
  company?: any; // Define the Company type here
  role?: Schema.Types.ObjectId;
  roleId?: Schema.Types.ObjectId;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNo: { type: Number, unique: true },
    email: { type: String, unique: true },
    passwordHash: { type: String },
    token: { type: String },
    email_verified: { type: Boolean, default: false },
    verificationCode: { type: String },
    verificationExpiry: { type: Date },
    associations: { type: Schema.Types.Mixed }, // Change 'any' to the type of Associations
    company: { type: Schema.Types.Mixed }, // Change 'any' to the type of Company
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    roleId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true, toJSON: { virtuals: true }, versionKey: false },
);

UserSchema.virtual('fullName').get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

const UserModel: Model<IUser> = model<IUser>('User', UserSchema);

export { UserModel, IUser };
