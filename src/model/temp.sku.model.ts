import { Document, Schema, model } from 'mongoose';

interface IRetailPricing {
  listPrice: number;
  salePrice: number;
}

const RetailPricingSchema = new Schema({
  listPrice: Number,
  salePrice: Number,
});

interface IWholesaleB2B {
  wholesalePrice: number;
}

const WholesaleB2BSchema = new Schema({
  wholesalePrice: Number,
});

interface IShipping {
  weight: string;
  dimensions: string;
}

const ShippingSchema = new Schema({
  weight: String,
  dimensions: String,
});

interface ISKU extends Document {
  retailPricing: IRetailPricing;
  wholesaleB2B: IWholesaleB2B;
  shipping: IShipping;
}

const skuSchema = new Schema(
  {
    retailPricing: RetailPricingSchema,
    wholesaleB2B: WholesaleB2BSchema,
    shipping: ShippingSchema,
  },
  { timestamps: true, versionKey: false },
);

const SKUModel = model<ISKU>('SKU', skuSchema);

export { SKUModel, ISKU, skuSchema };
