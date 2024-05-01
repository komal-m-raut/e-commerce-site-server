import Joi from 'joi';
import { optionalObjectId, validateObjectId } from './common.validation';

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
  shortDescription: Joi.string(),
  longDescription: Joi.string(),
  metaTitle: Joi.string(),
  metaDescription: Joi.string(),
  metaKeywords: Joi.array().items(Joi.string()),
});

const CustomizationSchema = Joi.object({
  fieldName: Joi.string(),
  value: Joi.string(),
});

const QuestionAndAnswersSchema = Joi.object({
  question: Joi.string(),
  answer: Joi.string(),
});

export const InstructionSchema = Joi.object({
  isEssential: Joi.boolean(),
  isFragile: Joi.boolean(),
  careInstructions: Joi.array().items(Joi.string()),
  sizeChart: Joi.string(),
  condition: Joi.string(),
  returnAvailable: Joi.boolean(),
  returnDuration: Joi.string(),
  warranty: Joi.string(),
  isAvailableOnline: Joi.boolean(),
  questionAndAnswers: Joi.array().items(QuestionAndAnswersSchema),
  customFields: Joi.array().items(CustomizationSchema),
  selectMessage: Joi.string(),
});

const VisibilityOptionsJoiSchema = Joi.object({
  isFeatured: Joi.boolean(),
  isBudgetPicks: Joi.boolean(),
  isTrendingNow: Joi.boolean(),
  isMostLoved: Joi.boolean(),
  isMostViewed: Joi.boolean(),
  isAllGiftItems: Joi.boolean(),
  isNewArrival: Joi.boolean(),
  isDealOfTheDay: Joi.boolean(),
  isDealOfTheWeek: Joi.boolean(),
  isTopPick: Joi.boolean(),
});

export const VisibilitySchema = Joi.object({
  guestCheckout: VisibilityOptionsJoiSchema,
  privateGroup: VisibilityOptionsJoiSchema,
});

export const GroupsSchema = Joi.object({
  wholesaleGroups: Joi.array().items(optionalObjectId()),
  retailGroups: Joi.array().items(optionalObjectId()),
});

export const InventorySchema = Joi.object({
  preBookingSelectDate: Joi.string(),
  restockSelectDate: Joi.string(),
  trackAvailableQuantity: Joi.boolean(),
  canBePurchasedOnline: Joi.boolean(),
  showWhenOutOfStockToCustomers: Joi.boolean(),
  allowOrdersOnOutOfStockProducts: Joi.boolean(),
  outOfStockMessage: Joi.string(),
});

export const GiftWrappingOptionsSchema = Joi.object({
  useAllGiftWrappingOptions: Joi.boolean(),
  isGiftWrapping: Joi.boolean(),
  specifyGiftWrappingOptions: Joi.boolean(),
  giftWrapping: optionalObjectId(),
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
