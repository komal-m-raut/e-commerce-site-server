import Joi from 'joi';
import { validateObjectId } from './common.validation';

export const AttributeValidationSchema = Joi.object({
  name: Joi.string().required(),
  value: Joi.string().required(),
  slug: Joi.string().required(),
  applicableTo: Joi.array().items(validateObjectId()).required(),
});

export const CategoryValidationSchema = Joi.object({
  rootCategory: validateObjectId().required(),
  mainCategory: validateObjectId().required(),
  childCategory: validateObjectId().required(),
});

export const GeneralDetailsValidationSchema = Joi.object({
  tenantId: validateObjectId().required(),
  status: Joi.string().optional(),
  productId: Joi.string().required(),
  sellerName: Joi.string().required(),
  language: Joi.string().optional(),
  countryOfOrigin: Joi.string().required(),
  importerName: Joi.string().required(),
  brandName: validateObjectId().required(),
  productName: Joi.string().required(),
  categoryDetails: CategoryValidationSchema.required(),
  attributeDetails: AttributeValidationSchema.required(),
  manufacturerName: Joi.string().required(),
  manufacturerContact: Joi.string().required(),
  hsnNo: Joi.string().required(),
  manufacturerPartNo: Joi.string().optional(),
  globalTradeItemNo: Joi.string().optional(),
  searchKeywords: Joi.array().items(Joi.string()).optional(),
});



const InfluencerDetailsJoiSchema = Joi.object({
  isReselling: Joi.boolean().required(),
  resellerPrice: Joi.number(),
  cost: Joi.number(),
  commissionType: Joi.string().valid('Flat', 'Percentage').required(),
  flatCommission: Joi.number(),
  percentageCommission: Joi.number(),
  commissionReceivedByInfluencer: Joi.number().required(),
});

//TODO: Change the skuId and includes to be required and also change type to validateObjectId

export const ProductIdentifiersJoiSchema = Joi.object({
  skuId: Joi.string().optional(),
  barcode: Joi.string().required(),
  size: Joi.string(),
  color: Joi.string(),
  location: Joi.string().required(),
  mrp: Joi.number().required(),
  sellingPrice: Joi.number(),
  wholesalePrice: Joi.number(),
  quantity: Joi.number().required(),
  minOrderQuantityB2B: Joi.number(),
  maxOrderQuantityB2B: Joi.number(),
  shelfNumber: Joi.number(),
  images: Joi.array().items(Joi.string()).required(),
  influencerDetails: InfluencerDetailsJoiSchema.required(),
  includes: Joi.array().items(Joi.string()).optional(),
});

// ? Is it necessary to add max characters

export const ProductDescriptionSchema = Joi.object({
  shortDescription: Joi.string().optional(),
  longDescription: Joi.string().optional(),
  metaTitle: Joi.string().optional(),
  metaDescription: Joi.string().optional(),
  metaKeywords: Joi.array().items(Joi.string()).optional(),
});

// export const updateTenantProductSchema = Joi.object({
//   generalDetails: Joi.object({
//     status: Joi.string(),
//     productId: Joi.string(),
//     language: Joi.string(),
//     manufacturer: Joi.string(),
//     supplier: Joi.string(),
//     countryOfOrigin: Joi.string(),
//     importerName: Joi.string(),
//     location: Joi.string(),
//     productName: Joi.string(),
//     urlKey: Joi.string(),
//     isMarketplace: Joi.boolean(),
//   }),
//   productIdentifiers: Joi.object({
//     skuId: Joi.string(),
//     barcode: Joi.string(),
//     hsnNo: Joi.string(),
//     manufacturerPartNumber: Joi.string(),
//     binPickingNumber: Joi.string(),
//     globalTradeItemNumber: Joi.string(),
//     searchKeywords: Joi.array().items(Joi.string()),
//   }),
//   reselling: Joi.object({
//     isReselling: Joi.boolean(),
//     commissionType: Joi.string().valid('Flat', 'Percentage'),
//     flatCommission: Joi.number(),
//     percentageCommission: Joi.number(),
//     commissionReceivedByReseller: Joi.number(),
//   }),
//   linkedProducts: Joi.object({
//     upSelling: Joi.array().items(Joi.string()),
//     crossSelling: Joi.array().items(Joi.string()),
//     bundledProducts: Joi.array().items(
//       Joi.object({
//         product: Joi.string(),
//         bundledCost: Joi.number(),
//       }),
//     ),
//   }),
//   includes: Joi.object({
//     includes: Joi.array().items(Joi.string()),
//   }),
//   category: Joi.object({
//     rootCategory: Joi.string(),
//     mainCategory: Joi.string(),
//     childCategory: Joi.string(),
//   }),
//   giftWrapping: Joi.object({
//     isGiftWrapping: Joi.boolean(),
//     giftWrapping: Joi.string(),
//   }),
//   description: Joi.object({
//     short: Joi.string(),
//     long: Joi.string(),
//   }),
//   seo: Joi.object({
//     metaTitle: Joi.string(),
//     metaDescription: Joi.string(),
//     metaKeywords: Joi.array().items(Joi.string()),
//   }),
//   instruction: Joi.object({
//     careInstructions: Joi.array().items(Joi.string()),
//     sizeChart: Joi.string(),
//     condition: Joi.string(),
//     warranty: Joi.string(),
//     isEssential: Joi.boolean(),
//     isFragile: Joi.boolean(),
//     isAvailableOnline: Joi.boolean(),
//     returnAvailable: Joi.boolean(),
//     returnDuration: Joi.string(),
//     questionAndAnswers: Joi.array().items(
//       Joi.object({
//         question: Joi.string(),
//         answer: Joi.string(),
//       }),
//     ),
//   }),
//   groups: Joi.object({
//     retailGroups: Joi.array().items(Joi.string()),
//     wholesaleGroups: Joi.array().items(Joi.string()),
//   }),
//   customization: Joi.array().items(
//     Joi.object({
//       fieldName: Joi.string(),
//       value: Joi.string(),
//     }),
//   ),
//   cod: Joi.object({
//     totalCodCharge: Joi.number(),
//     partialAdvanceCodCharge: Joi.number(),
//     isCodAvailable: Joi.boolean(),
//   }),
//   shipping: Joi.object({
//     freeShippingAbove: Joi.number(),
//     isIntegratedShipping: Joi.boolean(),
//     isPickupFromStore: Joi.boolean(),
//     packageDetails: Joi.object({
//       lengthInCm: Joi.number(),
//       widthInCm: Joi.number(),
//       heightInCm: Joi.number(),
//       weightInGm: Joi.number(),
//     }),
//   }),
// });

export const searchTenantProductSchema = Joi.object({
  search: Joi.string().required().label('Search query'),
});

export const filterTenantProductSchema = Joi.object({
  category: Joi.string(),
  manufacturer: Joi.string(),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(Joi.ref('minPrice')),
  variants: Joi.array().items(Joi.string()),
  attributes: Joi.array().items(Joi.string()),
});

export const searchAndFilterTenantProductSchema = Joi.object({
  search: Joi.string().required(),
  category: Joi.string(),
  manufacturer: Joi.string(),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(Joi.ref('minPrice')),
  variants: Joi.array().items(Joi.string()),
  attributes: Joi.array().items(Joi.string()),
});
