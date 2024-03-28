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
  images: imagesSchema.required(),
  retailPricing: retailPricingSchema.required(),
  b2bPricing: b2bPricingSchema.required(),
  visibility: visibilitySchema,
  variants: Joi.array().items(Joi.object()).required(),
});

export const updateSkuSchema = Joi.object({
  images: imagesSchema,
  retailPricing: retailPricingSchema,
  b2bPricing: b2bPricingSchema,
  visibility: visibilitySchema,
  variants: Joi.array().items(Joi.object()),
});
