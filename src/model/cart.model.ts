import { Document, model, Schema } from 'mongoose';

interface ICart extends Document {
  uid: string;
  skus: Schema.Types.ObjectId[]; // Array of SKU Ids
  skuIds: string[]; // Array of SKU Ids as strings
  checkedOut: boolean;
  lastUpdated: Date;
}

const CartSchema: Schema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    skus: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SKU',
      },
    ],
    skuIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SKU',
      },
    ],
    checkedOut: {
      type: Boolean,
      default: false,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false },
);

const Cart = model<ICart>('Cart', CartSchema);

export default Cart;
