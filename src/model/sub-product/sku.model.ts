import { Schema, model, Document } from 'mongoose';
import { IVariant, VariantSchema } from './variant.model';

export interface RetailPricing {
  mrp: number;
  sellingPrice: number;
  cost: number;
  tax: number;
  quantity: number;
  specialPriceFrom: string;
  specialPriceTo: string;
  minimumOrderQuantity: number;
  maximumOrderQuantity: number;
  preBookingAvailableOn: string;
  restockAvailableOn: string;
}

const RetailPricingSchema = new Schema<RetailPricing>({
  mrp: {
    type: Number,
  },
  sellingPrice: {
    type: Number,
  },
  cost: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  specialPriceFrom: {
    type: String,
  },
  specialPriceTo: {
    type: String,
  },
  minimumOrderQuantity: {
    type: Number,
  },
  maximumOrderQuantity: {
    type: Number,
  },
  preBookingAvailableOn: {
    type: String,
  },
  restockAvailableOn: {
    type: String,
  },
});

// 4. B2B Pricing
export interface B2BPricing {
  mrp: number;
  wholesalePrice: number;
  specialPriceFrom: string;
  specialPriceTo: string;
  minimumOrderQuantity: number;
  maximumOrderQuantity: number;
  preBookingAvailableOn: string;
  restockAvailableOn: string;
}

const B2BPricingSchema = new Schema<B2BPricing>({
  mrp: {
    type: Number,
  },
  wholesalePrice: {
    type: Number,
  },
  specialPriceFrom: {
    type: String,
  },
  specialPriceTo: {
    type: String,
  },
  minimumOrderQuantity: {
    type: Number,
  },
  maximumOrderQuantity: {
    type: Number,
  },
  preBookingAvailableOn: {
    type: String,
  },
  restockAvailableOn: {
    type: String,
  },
});

interface Images {
  imageURLs: string[];
  thumbnailImage: string;
}

const ImagesSchema = new Schema<Images>({
  imageURLs: {
    type: [String],
  },
  thumbnailImage: {
    type: String,
  },
});
interface VisibilityOptions {
  isEditorsChoice: boolean;
  isTrendingNow: boolean;
  isNewArrival: boolean;
  isProductRecommendation: boolean;
  isBestSeller: boolean;
  isBrandAtSlashedPrice: boolean;
  isMostLoved: boolean;
  isFeatured: boolean;
  isOnOurRadar: boolean;
  isTopPick: boolean;
  isDealOfTheDay: boolean;
  isSpecialOffer: boolean;
  isBudgetPicks: boolean;
  isYourWardrobeMustHave: boolean;
  isPrivateGroup: boolean;
  isPriceVisible: boolean;
}

interface Visibility {
  guestCheckout: VisibilityOptions;
  privateGroup: VisibilityOptions;
}

const VisibilityOptionsSchema = new Schema<VisibilityOptions>({
  isEditorsChoice: {
    type: Boolean,
  },
  isTrendingNow: {
    type: Boolean,
  },
  isNewArrival: {
    type: Boolean,
  },
  isProductRecommendation: {
    type: Boolean,
  },
  isBestSeller: {
    type: Boolean,
  },
  isBrandAtSlashedPrice: {
    type: Boolean,
  },
  isMostLoved: {
    type: Boolean,
  },
  isFeatured: {
    type: Boolean,
  },
  isOnOurRadar: {
    type: Boolean,
  },
  isTopPick: {
    type: Boolean,
  },
  isDealOfTheDay: {
    type: Boolean,
  },
  isSpecialOffer: {
    type: Boolean,
  },
  isBudgetPicks: {
    type: Boolean,
  },
  isYourWardrobeMustHave: {
    type: Boolean,
  },
});

const VisibilitySchema = new Schema<Visibility>({
  guestCheckout: {
    type: VisibilityOptionsSchema,
  },
  privateGroup: {
    type: VisibilityOptionsSchema,
  },
});

interface ISKU extends Document {
  retailPricing: RetailPricing;
  b2bPricing: B2BPricing;
  images: Images;
  visibility: Visibility;
  variant: IVariant;
}

const skuSchema = new Schema<ISKU>(
  {
    images: { type: ImagesSchema },
    retailPricing: { type: RetailPricingSchema },
    b2bPricing: { type: B2BPricingSchema },
    visibility: {
      type: VisibilitySchema,
    },
    variant: { type: VariantSchema, required: true },
  },
  { timestamps: true, versionKey: false },
);

const SKUModel = model<ISKU>('SKU', skuSchema);

export { SKUModel, ISKU, skuSchema };
