import { PopulatedDoc, Schema, model } from 'mongoose';
import { ITenantProduct } from './tenantProduct.model';
import { IRootCategory } from './sub-product/rootCategory.model';
import { IMainCategory } from './sub-product/mainCategory.model';
import { ITenant } from './tenant.model';

interface CouponDetails {
  couponType:
    | 'percentageDiscount'
    | 'flatDiscount'
    | 'buyXGetYFree'
    | 'freebie'
    | 'freeShipping';
  usageLimitPerCustomer: 'onlyOnce' | 'custom' | 'unlimited';
  usageTime: number;
  discount: number; // For 'percentage_discount' and 'flat_discount'
  minimumOrderCondition: 'orderValue' | 'orderQuantity';
  minimumOrderValue: number;
  minimumOrderQuantity: number;
  maximumDiscount: number; // For 'percentage_discount' and 'flat_discount'

  buyQuantity: number; // For 'buy_x_get_y_free'
  getQuantity: number;
  maximumLimitPerOrder: number;

  applyCouponOn: 'allProducts' | 'specificProducts' | 'specificCategory';
  specificProducts: PopulatedDoc<Schema.Types.ObjectId & ITenantProduct>[]; // This field is used if 'applyCouponOn' is 'specific_products'.
  specificRootCategories: PopulatedDoc<Schema.Types.ObjectId & IRootCategory>[];
  specificMainCategories: PopulatedDoc<Schema.Types.ObjectId & IMainCategory>[];

  freebieCondition: 'onEveryPurchase' | 'aboveCertainAmount';
  freebieProduct: PopulatedDoc<Schema.Types.ObjectId & ITenantProduct>;
  freebieQuantity: number;
}

const CouponDetailsSchema = new Schema<CouponDetails>(
  {
    couponType: {
      type: String,
      required: true,
      enum: [
        'percentageDiscount',
        'flatDiscount',
        'buyXGetYFree',
        'freebie',
        'freeShipping',
      ],
    },
    usageLimitPerCustomer: {
      type: String,
      required: true,
      enum: ['onlyOnce', 'custom', 'unlimited'],
    },
    usageTime: {
      type: Number,
    },
    discount: {
      type: Number,
      required: true,
    },
    minimumOrderCondition: {
      type: String,
      required: true,
      enum: ['orderValue', 'orderQuantity'],
    },
    minimumOrderValue: {
      type: Number,
    },
    minimumOrderQuantity: {
      type: Number,
    },
    maximumDiscount: {
      type: Number,
    },
    buyQuantity: {
      type: Number,
    },
    getQuantity: {
      type: Number,
    },
    maximumLimitPerOrder: {
      type: Number,
    },
    applyCouponOn: {
      type: String,
      required: true,
      enum: ['allProducts', 'specificProducts', 'specificCategory'],
    },
    specificProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'TenantProduct',
      },
    ],
    specificRootCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'RootCategory',
      },
    ],
    specificMainCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'MainCategory',
      },
    ],
    freebieCondition: {
      type: String,
      enum: ['onEveryPurchase', 'aboveCertainAmount'],
    },
    freebieProduct: {
      type: Schema.Types.ObjectId,
      ref: 'TenantProduct',
    },
    freebieQuantity: {
      type: Number,
    },
  },
  { _id: false },
);

interface CouponFunctionality {
  showToCustomer: boolean;
  validForOnlinePaymentsOnly: boolean;
  validForNewCustomersOnly: boolean;
  autoApply: boolean;
  applicableWithOtherCoupons: boolean;
}

const CouponFunctionalitySchema = new Schema<CouponFunctionality>(
  {
    showToCustomer: {
      type: Boolean,
      required: true,
      default: false,
    },
    validForOnlinePaymentsOnly: {
      type: Boolean,
      required: true,
      default: false,
    },
    validForNewCustomersOnly: {
      type: Boolean,
      required: true,
      default: false,
    },
    autoApply: {
      type: Boolean,
      required: true,
      default: false,
    },
    applicableWithOtherCoupons: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { _id: false },
);

interface CouponValidity {
  startDate: Date;
  endDate: Date;
}

const CouponValiditySchema = new Schema<CouponValidity>(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { _id: false },
);

interface Coupons {
  id: string;
  code: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  tenantId: PopulatedDoc<Schema.Types.ObjectId & ITenant>;
  supplierId: string; //TODO - change supplier type later
  couponDetails: CouponDetails;
  functionality: CouponFunctionality;
  validity: CouponValidity;
}

const CouponSchema = new Schema<Coupons>(
  {
    code: { type: String, required: true, unique: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    supplierId: { type: String },
    couponDetails: { type: CouponDetailsSchema, required: true },
    functionality: { type: CouponFunctionalitySchema, required: true },
    validity: { type: CouponValiditySchema, required: true },
  },
  { timestamps: true, versionKey: false },
);

//create coupons model
const CouponsModel = model<Coupons>('Coupon', CouponSchema);

export { Coupons, CouponsModel };
