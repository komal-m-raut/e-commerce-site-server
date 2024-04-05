import Joi from 'joi';
import { validateObjectId } from './common.validation';

export const createProductSchema = Joi.object({
  generalDetails: Joi.object({
    status: Joi.string().required(),
    productId: Joi.string().required(),
    language: Joi.string().required(),
    manufacturer: validateObjectId().required(),
    countryOfOrigin: Joi.string().required(),
    importerName: Joi.string().required(),
    location: validateObjectId().required(),
    productName: Joi.string().required(),
    urlKey: Joi.string().required(),
    isMarketplace: Joi.boolean().required(),
  }).required(),
});

export const updateProductSchema = Joi.object({
  generalDetails: Joi.object({
    status: Joi.string(),
    productId: Joi.string(),
    language: Joi.string(),
    manufacturer: Joi.string(),
    supplier: Joi.string(),
    countryOfOrigin: Joi.string(),
    importerName: Joi.string(),
    location: Joi.string(),
    productName: Joi.string(),
    urlKey: Joi.string(),
    isMarketplace: Joi.boolean(),
  }),
  productIdentifiers: Joi.object({
    skuId: Joi.string(),
    barcode: Joi.string(),
    hsnNo: Joi.string(),
    manufacturerPartNumber: Joi.string(),
    binPickingNumber: Joi.string(),
    globalTradeItemNumber: Joi.string(),
    searchKeywords: Joi.array().items(Joi.string()),
  }),
  reselling: Joi.object({
    isReselling: Joi.boolean(),
    commissionType: Joi.string().valid('Flat', 'Percentage'),
    flatCommission: Joi.number(),
    percentageCommission: Joi.number(),
    commissionReceivedByReseller: Joi.number(),
  }),
  linkedProducts: Joi.object({
    upSelling: Joi.array().items(Joi.string()),
    crossSelling: Joi.array().items(Joi.string()),
    bundledProducts: Joi.array().items(
      Joi.object({
        product: Joi.string(),
        bundledCost: Joi.number(),
      }),
    ),
  }),
  includes: Joi.object({
    includes: Joi.array().items(Joi.string()),
  }),
  category: Joi.object({
    rootCategory: Joi.string(),
    mainCategory: Joi.string(),
    childCategory: Joi.string(),
  }),
  giftWrapping: Joi.object({
    isGiftWrapping: Joi.boolean(),
    giftWrapping: Joi.string(),
  }),
  description: Joi.object({
    short: Joi.string(),
    long: Joi.string(),
  }),
  seo: Joi.object({
    metaTitle: Joi.string(),
    metaDescription: Joi.string(),
    metaKeywords: Joi.array().items(Joi.string()),
  }),
  instruction: Joi.object({
    careInstructions: Joi.array().items(Joi.string()),
    sizeChart: Joi.string(),
    condition: Joi.string(),
    warranty: Joi.string(),
    isEssential: Joi.boolean(),
    isFragile: Joi.boolean(),
    isAvailableOnline: Joi.boolean(),
    returnAvailable: Joi.boolean(),
    returnDuration: Joi.string(),
    questionAndAnswers: Joi.array().items(
      Joi.object({
        question: Joi.string(),
        answer: Joi.string(),
      }),
    ),
  }),
  groups: Joi.object({
    retailGroups: Joi.array().items(Joi.string()),
    wholesaleGroups: Joi.array().items(Joi.string()),
  }),
  customization: Joi.array().items(
    Joi.object({
      fieldName: Joi.string(),
      value: Joi.string(),
    }),
  ),
  cod: Joi.object({
    totalCodCharge: Joi.number(),
    partialAdvanceCodCharge: Joi.number(),
    isCodAvailable: Joi.boolean(),
  }),
  shipping: Joi.object({
    freeShippingAbove: Joi.number(),
    isIntegratedShipping: Joi.boolean(),
    isPickupFromStore: Joi.boolean(),
    packageDetails: Joi.object({
      lengthInCm: Joi.number(),
      widthInCm: Joi.number(),
      heightInCm: Joi.number(),
      weightInGm: Joi.number(),
    }),
  }),
});

export const searchProductSchema = Joi.object({
  search: Joi.string().required().label('Search query'),
});

export const filterProductSchema = Joi.object({
  category: Joi.string(),
  manufacturer: Joi.string(),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(Joi.ref('minPrice')),
  variants: Joi.array().items(Joi.string()),
  attributes: Joi.array().items(Joi.string()),
});

export const searchAndFilterSchema = Joi.object({
  search: Joi.string().required(),
  category: Joi.string(),
  manufacturer: Joi.string(),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(Joi.ref('minPrice')),
  variants: Joi.array().items(Joi.string()),
  attributes: Joi.array().items(Joi.string()),
});
