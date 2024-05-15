import Joi from 'joi';
import { validateObjectId } from './common.validation';


const couponDetailsSchema = Joi.object({
  couponType: Joi.string().valid('percentageDiscount', 'flatDiscount', 'buyXGetYFree', 'freebie', 'freeShipping').required(),
  usageLimitPerCustomer: Joi.string().valid('onlyOnce', 'custom', 'unlimited').required(),
  usageTime: Joi.number(),
  discount: Joi.number().required(),
  minimumOrderCondition: Joi.string().valid('orderValue', 'orderQuantity').required(),
  minimumOrderValue: Joi.number(),
  minimumOrderQuantity: Joi.number(),
  maximumDiscount: Joi.number(),
  buyQuantity: Joi.number(),
  getQuantity: Joi.number(),
  maximumLimitPerOrder: Joi.number(),
  applyCouponOn: Joi.string().valid('allProducts', 'specificProducts', 'specificCategory').required(),
  specificProducts: Joi.array().items(validateObjectId()),
  specificRootCategories: Joi.array().items(validateObjectId()),
  specificMainCategories: Joi.array().items(validateObjectId()),
  freebieCondition: Joi.string().valid('onEveryPurchase', 'aboveCertainAmount'),
  freebieProduct: validateObjectId(),
  freebieQuantity: Joi.number(),
});

const couponFunctionalitySchema = Joi.object({
  showToCustomer: Joi.boolean().required(),
  validForOnlinePaymentsOnly: Joi.boolean().required(),
  validForNewCustomersOnly: Joi.boolean().required(),
  autoApply: Joi.boolean().required(),
  applicableWithOtherCoupons: Joi.boolean().required(),
});

const couponValiditySchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});

export const createCouponSchema = Joi.object({
  code: Joi.string().required(),
  description: Joi.string(),
  isActive: Joi.boolean(),
  isDeleted: Joi.boolean(),
  tenantId: validateObjectId(),
  supplierId: Joi.string(),
  couponDetails: couponDetailsSchema.required(),
  functionality: couponFunctionalitySchema.required(),
  validity: couponValiditySchema.required(),
});

