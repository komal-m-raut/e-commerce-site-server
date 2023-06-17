import { Schema, model, Document } from 'mongoose';
import { IVariant, VariantSchema } from './variant.model';

interface IShippingDetails {
  quantity: number;
  weight: string;
  dimensions: string;
  packingDimensions: string;
  codAvailable: boolean;
  codCharge?: number;
}

const ShippingDetailsSchema = new Schema<IShippingDetails>({
  quantity: Number,
  weight: String,
  dimensions: String,
  packingDimensions: String,
  codAvailable: Boolean,
  codCharge: Number,
});

interface ICost {
  mrp: number;
  sellingPrice: number;
  specialPrice: {
    isEnabled: boolean;
    price: number;
    startDate: Date;
    endDate: Date;
  };
}

const CostSchema = new Schema<ICost>({
  mrp: Number,
  sellingPrice: Number,
  specialPrice: {
    isEnabled: Boolean,
    price: Number,
    startDate: Date,
    endDate: Date,
  },
});

interface ISKU extends Document {
  quantity: number;
  cost: ICost;
  shipping: IShippingDetails;
  featuredTo: Date;
  featuredFrom: Date;
  trending: boolean;
  variants: IVariant[];
  slug: string;
  published: boolean;
  gallery: string[];
}

const skuSchema = new Schema<ISKU>(
  {
    cost: { type: CostSchema, required: true },
    featuredFrom: { type: Date, required: true },
    featuredTo: { type: Date, required: true },
    trending: { type: Boolean, default: false },
    variants: { type: [VariantSchema], required: true },
    shipping: { type: ShippingDetailsSchema, required: true },
    slug: { type: String, required: true },
    quantity: { type: Number, default: 0, required: true },
    published: { type: Boolean, default: false },
    gallery: [{ type: String }],
  },
  { timestamps: true, versionKey: false },
);

const SKUModel = model<ISKU>('SKU', skuSchema);

export { SKUModel, ISKU, skuSchema };
