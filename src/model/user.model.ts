import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  shippingAddresses: Array<{
    streetAddress: string;
    landMark?: string;
    pinCode: string;
    city: string;
    state: string;
    country: string;
    addressType: 'Home' | 'Word';
  }>;
  phoneNumber: string;
  billingAddress?: string;
  paymentMethods: Array<{
    cardholderName: string;
    cardNumber: string;
    cardExpiryDate: string;
    cardCVV: string;
  }>;
  wishlistProducts: string[]; // Array of product IDs
  cart: Array<{
    productId: string; // Product ID
    quantity: number;
  }>;
}

// Define the User schema
const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  shippingAddresses: [
    {
      streetAddress: { type: String },
      landMark: { type: String },
      pinCode: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      addressType: { type: String, enum: ['Home', 'Work'] },
    },
  ],
  billingAddress: { type: String },
  paymentMethods: [
    {
      cardholderName: { type: String },
      cardNumber: { type: String },
      cardExpiryDate: { type: String },
      cardCVV: { type: String },
    },
  ],
  wishlistProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  cart: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const UserModel = model<IUser>('User', userSchema);

export { UserModel, IUser };
