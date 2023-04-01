import { Document, model, Schema } from 'mongoose';

interface ILocation extends Document {
  name: string;
  address: string;
  pincode: string;
  state: string;
  country: string;
  tenant: Schema.Types.ObjectId; // Tenant ID
  products: Schema.Types.ObjectId[]; // Array of Product Ids
  productIds: Schema.Types.ObjectId[]; // Array of Product Ids as strings
}

const LocationSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    productIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

const Location = model<ILocation>('Location', LocationSchema);

export default Location;
