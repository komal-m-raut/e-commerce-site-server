import { Document, Schema, model, PopulatedDoc, Types } from 'mongoose';
import { IRootCategory } from './sub-product/rootCategory.model';
import { IMainCategory } from './sub-product/mainCategory.model';
import { IChildCategory } from './sub-product/childCategory.mode';
import { ITenantBrand } from './sub-company/tenantBrand.model';

import { AttributeSchema, IAttribute } from './sub-product/attribute.model';
import { ISizeChart } from './sub-product/sizeChart.model';
import { IGiftWrapping } from './sub-product/giftWrapping.model';
import { IIncludes } from './sub-product/includes.model';
import { IGroup } from './sub-product/group.model';
import { ITenant } from './tenant.model';

interface Category {
  rootCategory: PopulatedDoc<Schema.Types.ObjectId & IRootCategory>;
  mainCategory: PopulatedDoc<Schema.Types.ObjectId & IMainCategory>;
  childCategory: PopulatedDoc<Schema.Types.ObjectId & IChildCategory>;
}

const CategorySchema = new Schema<Category>(
  {
    rootCategory: {
      type: Schema.Types.ObjectId,
      ref: 'RootCategory',
      required: true,
    },
    mainCategory: {
      type: Schema.Types.ObjectId,
      ref: 'MainCategory',
      required: true,
    },
    childCategory: {
      type: Schema.Types.ObjectId,
      ref: 'ChildCategory',
      required: true,
    },
  },
  { _id: false },
);

interface GeneralDetails {
  tenantId: PopulatedDoc<Schema.Types.ObjectId & ITenant>;
  brandName: PopulatedDoc<Schema.Types.ObjectId & ITenantBrand>;
  productId: string;
  productName: string;
  status: 'approved' | 'pending' | 'rejected';
  sellerName: string;
  language: string;
  countryOfOrigin: string;
  importerName: string;
  categoryDetails: Category;
  attributeDetails: IAttribute;
  manufacturerName: string;
  manufacturerContact: string;
  hsnNo: string;
  manufacturerPartNo: string;
  globalTradeItemNo: string;
  searchKeywords: string[];
}
const GeneralDetailsSchema = new Schema<GeneralDetails>(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    brandName: {
      type: Schema.Types.ObjectId,
      ref: 'TenantBrand',
      required: true,
    },
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    productName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['approved', 'pending', 'rejected'],
      default: 'pending',
    },
    sellerName: {
      type: String,
      required: true,
    },
    language: {
      type: String,
    },
    countryOfOrigin: {
      type: String,
      required: true,
    },
    importerName: {
      type: String,
      required: true,
    },

    categoryDetails: {
      type: CategorySchema,
      required: true,
    },
    attributeDetails: {
      type: AttributeSchema,
      required: true,
    },
    manufacturerName: {
      type: String,
      required: true,
    },
    manufacturerContact: {
      type: String,
      required: true,
    },
    hsnNo: {
      type: String,
      required: true,
    },
    manufacturerPartNo: {
      type: String,
    },
    globalTradeItemNo: {
      type: String,
    },
    searchKeywords: {
      type: [String],
    },
  },
  { _id: false },
);

// Influencer Details
interface InfluencerDetails {
  isReselling: boolean;
  resellerPrice: number;
  cost: number;
  commissionType: string;
  flatCommission: number;
  percentageCommission: number;
  commissionReceivedByInfluencer: number;
}

const InfluencerDetailsSchema = new Schema<InfluencerDetails>(
  {
    isReselling: {
      type: Boolean,
      required: true,
    },
    commissionType: {
      type: String,
      enum: ['Flat', 'Percentage'],
      required: true,
    },
    resellerPrice: {
      type: Number,
    },
    cost: {
      type: Number,
    },
    flatCommission: {
      type: Number,
    },
    percentageCommission: {
      type: Number,
    },
    commissionReceivedByInfluencer: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

// 2. Product Identifiers
interface ProductIdentifiers {
  shelfNumber: number;
  influencerDetails: InfluencerDetails;
  includes: PopulatedDoc<Schema.Types.ObjectId & IIncludes>[];
}

const ProductIdentifiersSchema = new Schema<ProductIdentifiers>(
  {
    shelfNumber: {
      type: Number,
    },
    influencerDetails: {
      type: InfluencerDetailsSchema,
      required: true,
    },
    includes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Includes',
      },
    ],
  },
  { _id: false },
);

// 3. Product Description
// ? Do I need to add SEO field?
interface ProductDescription {
  shortDescription: string;
  longDescription: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

const ProductDescriptionSchema = new Schema<ProductDescription>(
  {
    shortDescription: {
      type: String,
    },
    longDescription: {
      type: String,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: [String],
    },
  },
  { _id: false },
);

interface Customization {
  fieldName: string;
  value: string;
}

const CustomizationSchema = new Schema<Customization>(
  {
    fieldName: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  { _id: false },
);

interface QuestionAndAnswers {
  question: string;
  answer: string;
}

const QuestionAndAnswersSchema = new Schema<QuestionAndAnswers>(
  {
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
  },
  { _id: false },
);

// 4. Instructions
interface Instructions {
  isEssential: boolean;
  isFragile: boolean;
  careInstructions: string[];
  sizeChart: PopulatedDoc<Schema.Types.ObjectId & ISizeChart>;
  condition: string;
  returnAvailable: boolean;
  returnDuration: string;
  warranty: string;
  isAvailableOnline: boolean;
  questionAndAnswers: QuestionAndAnswers[];
  customFields: Customization[];
  selectMessage: string;
}

const InstructionSchema = new Schema<Instructions>(
  {
    isEssential: {
      type: Boolean,
    },
    isFragile: {
      type: Boolean,
    },
    careInstructions: {
      type: [String],
    },
    sizeChart: {
      type: Schema.Types.ObjectId,
      ref: 'ISizeChart',
    },
    condition: {
      type: String,
    },
    returnAvailable: {
      type: Boolean,
    },
    returnDuration: {
      type: String,
    },
    warranty: {
      type: String,
    },
    isAvailableOnline: {
      type: Boolean,
    },
    questionAndAnswers: {
      type: [QuestionAndAnswersSchema],
    },
    customFields: {
      type: [CustomizationSchema],
    },
    selectMessage: {
      type: String,
    },
  },
  { _id: false },
);

interface Groups {
  wholesaleGroups: PopulatedDoc<Schema.Types.ObjectId & IGroup>[];
  retailGroups: PopulatedDoc<Schema.Types.ObjectId & IGroup>[];
}

const GroupsSchema = new Schema<Groups>(
  {
    wholesaleGroups: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Group',
      },
    ],
    retailGroups: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Group',
      },
    ],
  },
  { _id: false },
);
interface Inventory {
  preBookingSelectDate: string;
  restockSelectDate: string;
  trackAvailableQuantity: boolean;
  canBePurchasedOnline: boolean;
  showWhenOutOfStockToCustomers: boolean;
  allowOrdersOnOutOfStockProducts: boolean;
  outOfStockMessage: string;
}

const InventorySchema = new Schema<Inventory>(
  {
    preBookingSelectDate: {
      type: String,
    },
    restockSelectDate: {
      type: String,
    },
    trackAvailableQuantity: {
      type: Boolean,
    },
    canBePurchasedOnline: {
      type: Boolean,
    },
    showWhenOutOfStockToCustomers: {
      type: Boolean,
    },
    allowOrdersOnOutOfStockProducts: {
      type: Boolean,
    },
    outOfStockMessage: {
      type: String,
    },
  },
  { _id: false },
);
interface GiftWrappingOptions {
  useAllGiftWrappingOptions: boolean;
  isGiftWrapping: boolean;
  specifyGiftWrappingOptions: boolean;
  giftWrapping: PopulatedDoc<Schema.Types.ObjectId & IGiftWrapping>;
}

const GiftWrappingOptionsSchema = new Schema<GiftWrappingOptions>(
  {
    useAllGiftWrappingOptions: {
      type: Boolean,
    },
    isGiftWrapping: {
      type: Boolean,
    },
    specifyGiftWrappingOptions: {
      type: Boolean,
    },
    giftWrapping: {
      type: Schema.Types.ObjectId,
      ref: 'GiftWrapping',
    },
  },
  { _id: false },
);

// interface LinkedProducts {
//   upSelling: PopulatedDoc<Schema.Types.ObjectId & ITenantSKU>[];
//   crossSelling: PopulatedDoc<Schema.Types.ObjectId & ITenantSKU>[];
//   bundledProducts: {
//     product: PopulatedDoc<Schema.Types.ObjectId & ITenantSKU>;
//     bundledCost: number;
//   }[];
// }

// const LinkedProductsSchema = new Schema<LinkedProducts>({
//   upSelling: [
//     {
//       type: skuSchema,
//       ref: 'SKU',
//     },
//   ],
//   crossSelling: [
//     {
//       type: skuSchema,
//       ref: 'SKU',
//     },
//   ],
//   bundledProducts: [
//     {
//       product: {
//         type: skuSchema,
//         ref: 'SKU',
//       },
//       bundledCost: {
//         type: Number,
//       },
//     },
//   ],
// });

// 11. Groups
// export interface Groups {
//   retailGroups: PopulatedDoc<Schema.Types.ObjectId & IGroup>[];
//   wholesaleGroups: PopulatedDoc<Schema.Types.ObjectId & IGroup>[];
// }

// 13. COD

// interface COD {
//   totalCodCharge: number;
//   partialAdvanceCodCharge: number;
//   isCodAvailable: boolean;
// }

// const CODSchema = new Schema<COD>({
//   totalCodCharge: {
//     type: Number,
//   },
//   partialAdvanceCodCharge: {
//     type: Number,
//   },
//   isCodAvailable: {
//     type: Boolean,
//   },
// });

// 14. Shipping

// interface Shipping {
//   freeShippingAbove: number;
//   isIntegratedShipping: boolean;
//   isPickupFromStore: boolean;
//   packageDetails: {
//     lengthInCm: number;
//     widthInCm: number;
//     heightInCm: number;
//     weightInGm: number;
//   };
// }

// const ShippingSchema = new Schema<Shipping>({
//   freeShippingAbove: {
//     type: Number,
//   },
//   isIntegratedShipping: {
//     type: Boolean,
//   },
//   isPickupFromStore: {
//     type: Boolean,
//   },
//   packageDetails: {
//     lengthInCm: {
//       type: Number,
//     },
//     widthInCm: {
//       type: Number,
//     },
//     heightInCm: {
//       type: Number,
//     },
//     weightInGm: {
//       type: Number,
//     },
//   },
// });

interface ITenantProduct extends Document {
  generalDetails: GeneralDetails;
  productIdentifiers: ProductIdentifiers[];
  productDescription: ProductDescription;
  instructions: Instructions;
  groups: Groups;
  inventory: Inventory;
  giftWrapping: GiftWrappingOptions;
  isDraft: boolean;
}

// Create the Product Schema
const productSchema = new Schema<ITenantProduct>({
  generalDetails: { type: GeneralDetailsSchema, required: true },
  productIdentifiers: [{ type: ProductIdentifiersSchema }],
  productDescription: { type: ProductDescriptionSchema },
  instructions: { type: InstructionSchema },
  groups: { type: GroupsSchema },
  inventory: { type: InventorySchema },
  giftWrapping: { type: GiftWrappingOptionsSchema },
  isDraft: { type: Boolean, default: true },
});

// ? Is it necessary to create an index for productName and brandName? or should I create it for productId?

productSchema.index(
  { 'generalDetails.productName': 1, 'generalDetails.tenantId': 1 },
  { unique: true },
);

// Create the Product model
const TenantProductModel = model<ITenantProduct>(
  'TenantProducts',
  productSchema,
);

export { TenantProductModel, ITenantProduct };
