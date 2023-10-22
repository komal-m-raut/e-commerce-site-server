import { Document, Schema, model, PopulatedDoc } from 'mongoose';
import { IRootCategory, rootCategorySchema } from './rootCategory.model';
import { IMainCategory, MainCategorySchema } from './mainCategory.model';
import { ChildCategorySchema, IChildCategory } from './childCategory.mode';
import { ITenant, TenantSchema } from './tenant.model';
import { BrandSchema, IBrand } from './brand.model';
import { IWarehouse, WarehouseSchema } from './warehouse.model';
import { AttributeSchema, IAttribute } from './attribute.model';
import { ISKU, skuSchema } from './sku.model';
import { GroupSchema, IGroup } from './sub-product/group.model';
import { ISizeChart, SizeChartSchema } from './sub-product/sizeChart.model';
import {
  GiftWrappingSchema,
  IGiftWrapping,
} from './sub-product/giftWrapping.model';
import { IIncludes, IncludesSchema } from './sub-product/includes.model';

// 1. General Details
interface GeneralDetails {
  status: string;
  productId: string;
  language: string;
  manufacturer: PopulatedDoc<Schema.Types.ObjectId & IBrand>;
  supplier: PopulatedDoc<Schema.Types.ObjectId & ITenant>;
  countryOfOrigin: string;
  importerName: string;
  location: PopulatedDoc<Schema.Types.ObjectId & IWarehouse>;
  productName: string;
  urlKey: string;
  isMarketplace: boolean;
}

const GeneralDetailsSchema = new Schema<GeneralDetails>({
  status: {
    type: String,
  },
  productId: {
    type: String,
  },
  language: {
    type: String,
  },
  manufacturer: {
    type: BrandSchema,
    ref: 'Brand',
  },
  supplier: {
    type: TenantSchema,
    ref: 'Tenant',
  },
  countryOfOrigin: {
    type: String,
  },
  importerName: {
    type: String,
  },
  location: {
    type: WarehouseSchema,
    ref: 'Warehouse',
  },
  productName: {
    type: String,
  },
  urlKey: {
    type: String,
  },
  isMarketplace: {
    type: Boolean,
  },
});

// 2. Product Identifiers
interface ProductIdentifiers {
  skuId: PopulatedDoc<Schema.Types.ObjectId & ISKU>;
  barcode: string;
  hsnNo: string;
  manufacturerPartNumber: string;
  binPickingNumber: string;
  globalTradeItemNumber: string;
  searchKeywords: string[];
}

const ProductIdentifiersSchema = new Schema<ProductIdentifiers>({
  skuId: {
    type: skuSchema,
    ref: 'SKU',
  },
  barcode: {
    type: String,
  },
  hsnNo: {
    type: String,
  },
  manufacturerPartNumber: {
    type: String,
  },
  binPickingNumber: {
    type: String,
  },
  globalTradeItemNumber: {
    type: String,
  },
  searchKeywords: {
    type: [String],
  },
});

// 3. Reselling
interface Reselling {
  isReselling: boolean;
  commissionType: 'Flat' | 'Percentage';
  flatCommission: number;
  percentageCommission: number;
  commissionReceivedByReseller: number;
}

const ResellingSchema = new Schema<Reselling>({
  isReselling: {
    type: Boolean,
  },
  commissionType: {
    type: String,
    enum: ['Flat', 'Percentage'],
  },
  flatCommission: {
    type: Number,
  },
  percentageCommission: {
    type: Number,
  },
  commissionReceivedByReseller: {
    type: Number,
  },
});

// 4. Linked Products
interface LinkedProducts {
  upSelling: PopulatedDoc<Schema.Types.ObjectId & ISKU>[];
  crossSelling: PopulatedDoc<Schema.Types.ObjectId & ISKU>[];
  bundledProducts: {
    product: PopulatedDoc<Schema.Types.ObjectId & ISKU>;
    bundledCost: number;
  }[];
}

const LinkedProductsSchema = new Schema<LinkedProducts>({
  upSelling: [
    {
      type: skuSchema,
      ref: 'SKU',
    },
  ],
  crossSelling: [
    {
      type: skuSchema,
      ref: 'SKU',
    },
  ],
  bundledProducts: [
    {
      product: {
        type: skuSchema,
        ref: 'SKU',
      },
      bundledCost: {
        type: Number,
      },
    },
  ],
});

// 5. Includes
interface Includes {
  includes: PopulatedDoc<Schema.Types.ObjectId & IIncludes>[];
}

// 6. Category
interface Category {
  rootCategory: PopulatedDoc<Schema.Types.ObjectId & IRootCategory>;
  mainCategory: PopulatedDoc<Schema.Types.ObjectId & IMainCategory>;
  childCategory: PopulatedDoc<Schema.Types.ObjectId & IChildCategory>;
}

const CategorySchema = new Schema<Category>({
  rootCategory: {
    type: rootCategorySchema,
    ref: 'RootCategory',
  },
  mainCategory: {
    type: MainCategorySchema,
    ref: 'MainCategory',
  },
  childCategory: {
    type: ChildCategorySchema,
    ref: 'ChildCategory',
  },
});

// 7. Gift Wrapping
interface GiftWrapping {
  isGiftWrapping: boolean;
  giftWrapping: PopulatedDoc<Schema.Types.ObjectId & IGiftWrapping>;
}

// 8. Description
interface Description {
  short: string;
  long: string;
}

const DescriptionSchema = new Schema<Description>({
  short: {
    type: String,
  },
  long: {
    type: String,
  },
});

// 9. SEO
interface SEO {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

const SEOSchema = new Schema<SEO>({
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  metaKeywords: {
    type: [String],
  },
});

// 10. Instruction
interface Instruction {
  careInstructions: string[];
  sizeChart: PopulatedDoc<Schema.Types.ObjectId & ISizeChart>;
  condition: string;
  warranty: string;
  isEssential: boolean;
  isFragile: boolean;
  isAvailableOnline: boolean;
  returnAvailable: boolean;
  returnDuration: string;
  questionAndAnswers: { question: string; answer: string }[];
}

const InstructionSchema = new Schema<Instruction>({
  careInstructions: {
    type: [String],
  },
  sizeChart: {
    type: SizeChartSchema,
    ref: 'SizeChart',
  },
  condition: {
    type: String,
  },
  warranty: {
    type: String,
  },
  isEssential: {
    type: Boolean,
  },
  isFragile: {
    type: Boolean,
  },
  isAvailableOnline: {
    type: Boolean,
  },
  returnAvailable: {
    type: Boolean,
  },
  returnDuration: {
    type: String,
  },
  questionAndAnswers: [
    {
      question: {
        type: String,
      },
      answer: {
        type: String,
      },
    },
  ],
});

// 11. Groups
interface Groups {
  retailGroups: PopulatedDoc<Schema.Types.ObjectId & IGroup>[];
  wholesaleGroups: PopulatedDoc<Schema.Types.ObjectId & IGroup>[];
}

// 12. Customization
interface Customization {
  fieldName: string;
  value: string;
}

const CustomizationSchema = new Schema<Customization>({
  fieldName: {
    type: String,
  },
  value: {
    type: String,
  },
});

// 13. COD
interface COD {
  totalCodCharge: number;
  partialAdvanceCodCharge: number;
  isCodAvailable: boolean;
}

const CODSchema = new Schema<COD>({
  totalCodCharge: {
    type: Number,
  },
  partialAdvanceCodCharge: {
    type: Number,
  },
  isCodAvailable: {
    type: Boolean,
  },
});

// 14. Shipping
interface Shipping {
  freeShippingAbove: number;
  isIntegratedShipping: boolean;
  isPickupFromStore: boolean;
  packageDetails: {
    lengthInCm: number;
    widthInCm: number;
    heightInCm: number;
    weightInGm: number;
  };
}

const ShippingSchema = new Schema<Shipping>({
  freeShippingAbove: {
    type: Number,
  },
  isIntegratedShipping: {
    type: Boolean,
  },
  isPickupFromStore: {
    type: Boolean,
  },
  packageDetails: {
    lengthInCm: {
      type: Number,
    },
    widthInCm: {
      type: Number,
    },
    heightInCm: {
      type: Number,
    },
    weightInGm: {
      type: Number,
    },
  },
});

// Define the Product Document
interface IProduct extends Document {
  generalDetails: GeneralDetails;
  productIdentifiers: ProductIdentifiers;
  reselling: Reselling;
  includes: Includes;
  category: Category;
  attributes: IAttribute[];
  description: Description;
  seo: SEO;
  instruction: Instruction;
  groups: Groups;
  customization: Customization[];
  cod: COD;
  shipping: Shipping;
  giftWrapping: GiftWrapping;
  linkedProducts: LinkedProducts;
}

// Create the Product Schema
const productSchema = new Schema<IProduct>({
  generalDetails: { type: GeneralDetailsSchema },
  productIdentifiers: { type: ProductIdentifiersSchema },
  reselling: { type: ResellingSchema },
  linkedProducts: { type: LinkedProductsSchema },
  includes: { type: IncludesSchema },
  category: { type: CategorySchema },
  attributes: [{ type: AttributeSchema }],
  giftWrapping: {
    type: {
      isGiftWrapping: Boolean,
      giftWrapping: GiftWrappingSchema,
    },
  },
  description: { type: DescriptionSchema },
  seo: { type: SEOSchema },
  instruction: { type: InstructionSchema },
  groups: {
    type: {
      retailGroups: GroupSchema,
      wholesaleGroups: GroupSchema,
    },
  },
  customization: [{ type: CustomizationSchema }],

  cod: { type: CODSchema },
  shipping: { type: ShippingSchema },
});

// Create the Product model
const ProductModel = model<IProduct>('Product', productSchema);

export { ProductModel, IProduct };
