import app from '@src/app';
import Joi from 'joi';

const retailPricingSchema = Joi.object({
  mrp: Joi.number(),
  sellingPrice: Joi.number(),
  cost: Joi.number(),
  tax: Joi.number(),
  quantity: Joi.number(),
  specialPriceFrom: Joi.string(),
  specialPriceTo: Joi.string(),
  minimumOrderQuantity: Joi.number(),
  maximumOrderQuantity: Joi.number(),
  preBookingAvailableOn: Joi.string(),
  restockAvailableOn: Joi.string(),
});

const b2bPricingSchema = Joi.object({
  mrp: Joi.number(),
  wholesalePrice: Joi.number(),
  specialPriceFrom: Joi.string(),
  specialPriceTo: Joi.string(),
  minimumOrderQuantity: Joi.number(),
  maximumOrderQuantity: Joi.number(),
  preBookingAvailableOn: Joi.string(),
  restockAvailableOn: Joi.string(),
});

const imagesSchema = Joi.object({
  imageURLs: Joi.array().items(Joi.string()),
  thumbnailImage: Joi.string(),
});

const visibilityOptionsSchema = Joi.object({
  isEditorsChoice: Joi.boolean(),
  isTrendingNow: Joi.boolean(),
  isNewArrival: Joi.boolean(),
  isProductRecommendation: Joi.boolean(),
  isBestSeller: Joi.boolean(),
  isBrandAtSlashedPrice: Joi.boolean(),
  isMostLoved: Joi.boolean(),
  isFeatured: Joi.boolean(),
  isOnOurRadar: Joi.boolean(),
  isTopPick: Joi.boolean(),
  isDealOfTheDay: Joi.boolean(),
  isSpecialOffer: Joi.boolean(),
  isBudgetPicks: Joi.boolean(),
  isYourWardrobeMustHave: Joi.boolean(),
});

export const visibilitySchema = Joi.object({
  guestCheckout: visibilityOptionsSchema,
  privateGroup: visibilityOptionsSchema,
});

export const createSkuSchema = Joi.object({
  variants: Joi.array()
    .items(
      Joi.object({
        images: imagesSchema.required(),
        retailPricing: retailPricingSchema.required(),
        b2bPricing: b2bPricingSchema.required(),
        visibility: visibilitySchema,
        variant: Joi.object({
          name: Joi.string().required(),
          value: Joi.array().items(Joi.string()).required(),
          applicableTo: Joi.array().items(Joi.string()).required(),
        }).required(),
        productIdentifier: Joi.object({
          barcode: Joi.string().required(),
          hsnNo: Joi.string().required(),
          manufacturerPartNumber: Joi.string().required(),
          binPickingNumber: Joi.string().required(),
          globalTradeItemNumber: Joi.string().required(),
          searchKeywords: Joi.array().items(Joi.string()).required(),
        }).required(),
      }),
    )
    .required(),
});

export const updateSkuSchema = Joi.object({
  images: imagesSchema,
  retailPricing: retailPricingSchema,
  b2bPricing: b2bPricingSchema,
  visibility: visibilitySchema,
  variants: Joi.array().items(Joi.object()),
});
