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
  password: { type: String, required: true },
  shippingAddresses: [
    {
      streetAddress: { type: String, required: true },
      landMark: { type: String },
      pinCode: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      addressType: { type: String, required: true, enum: ['Home', 'Work'] },
    },
  ],
  phoneNumber: { type: String, required: true },
  billingAddress: { type: String },
  paymentMethods: [
    {
      cardholderName: { type: String, required: true },
      cardNumber: { type: String, required: true },
      cardExpiryDate: { type: String, required: true },
      cardCVV: { type: String, required: true },
    },
  ],
  wishlistProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  cart: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

const UserModel = model<IUser>('User', userSchema);

export { UserModel, IUser };
