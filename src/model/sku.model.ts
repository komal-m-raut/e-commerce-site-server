import { Schema, model, Document } from 'mongoose';

interface ISKU extends Document {
  credentials: string;
  credentialType: string;
  quantity: number;
  cost: {
    mrp: number;
    sellingPrice: number;
    specialPrice: {
      price: number;
      startDate: Date;
      endDate: Date;
      offerMsg: string;
    };
  };
  featuredFrom: Date;
  featuredTo: Date;
  trending: boolean;
  attributes: {
    name: string;
    value: string;
  }[];
  variants: {
    name: string;
    options: string[];
  }[];
  shipping: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  };
  slug: string;
  productId: Schema.Types.ObjectId;
  published: boolean;
  gallery: string[];
  cartIds: Schema.Types.ObjectId[];
}

const skuSchema = new Schema<ISKU>(
  {
    credentials: { type: String, required: true },
    credentialType: { type: String, required: true },
    cost: {
      type: {
        mrp: Number,
        sellingPrice: Number,
        specialPrice: {
          price: Number,
          startDate: Date,
          endDate: Date,
        },
      },
      required: true,
    },
    featuredFrom: { type: Date, required: true },
    featuredTo: { type: Date, required: true },
    trending: { type: Boolean, default: false },
    attributes: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    variants: [
      {
        name: { type: String, required: true },
        options: [{ type: String }],
      },
    ],
    shipping: {
      weight: { type: Number, required: true },
      dimensions: {
        length: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
      },
    },

    slug: { type: String, required: true },
    quantity: { type: Number, default: 0, required: true },
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
    published: { type: Boolean, default: false },
    gallery: [{ type: String }],
    cartIds: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
  },
  { timestamps: true, versionKey: false },
);

const SKUModule = model<ISKU>('SKU', skuSchema);

export default SKUModule;

/*
credentials
quantity
cost
featuredFrom
featuredTo
featureImage
trending
attributes
variants
*/
