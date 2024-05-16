import Joi from 'joi';
import { optionalObjectId } from './common.validation';

export const createCouponSchema = Joi.object({
  code: Joi.string().required(),
  description: Joi.string(),
  isActive: Joi.boolean(),
  isDeleted: Joi.boolean(),
  tenantId: optionalObjectId(),
  supplierId: Joi.string(),
  couponDetails: Joi.object({
    couponType: Joi.string()
      .valid(
        'percentageDiscount',
        'flatDiscount',
        'buyXGetYFree',
        'freebie',
        'freeShipping',
      )
      .required(),
    usageLimitPerCustomer: Joi.string()
      .valid('onlyOnce', 'custom', 'unlimited')
      .required(),
    usageTime: Joi.number(),
    discount: Joi.number().required(),
    minimumOrderCondition: Joi.string()
      .valid('orderValue', 'orderQuantity')
      .required(),
    minimumOrderValue: Joi.number(),
    minimumOrderQuantity: Joi.number().optional(),
    maximumDiscount: Joi.number(),
    buyQuantity: Joi.number(),
    getQuantity: Joi.number(),
    maximumLimitPerOrder: Joi.number(),
    applyCouponOn: Joi.string()
      .valid('allProducts', 'specificProducts', 'specificCategory')
      .required(),
    specificProducts: Joi.array().items(optionalObjectId()).optional(),
    specificRootCategories: Joi.array().items(optionalObjectId()).optional(),
    specificMainCategories: Joi.array().items(optionalObjectId()).optional(),
    freebieCondition: Joi.string().valid(
      'onEveryPurchase',
      'aboveCertainAmount',
    ),
    freebieProduct: optionalObjectId(),
    freebieQuantity: Joi.number(),
  }),
  functionality: Joi.object({
    showToCustomer: Joi.boolean().required(),
    validForOnlinePaymentsOnly: Joi.boolean().required(),
    validForNewCustomersOnly: Joi.boolean().required(),
    autoApply: Joi.boolean().required(),
    applicableWithOtherCoupons: Joi.boolean().required(),
  }),
  validity: Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  }),
});

export const updateCouponSchema = Joi.object({
  code: Joi.string(),
  description: Joi.string(),
  isActive: Joi.boolean(),
  isDeleted: Joi.boolean(),
  couponDetails: Joi.object({
    couponType: Joi.string().valid(
      'percentageDiscount',
      'flatDiscount',
      'buyXGetYFree',
      'freebie',
      'freeShipping',
    ),
    usageLimitPerCustomer: Joi.string().valid(
      'onlyOnce',
      'custom',
      'unlimited',
    ),
    usageTime: Joi.number(),
    discount: Joi.number(),
    minimumOrderCondition: Joi.string().valid('orderValue', 'orderQuantity'),
    minimumOrderValue: Joi.number(),
    minimumOrderQuantity: Joi.number().optional(),
    maximumDiscount: Joi.number(),
    buyQuantity: Joi.number(),
    getQuantity: Joi.number(),
    maximumLimitPerOrder: Joi.number(),
    applyCouponOn: Joi.string().valid(
      'allProducts',
      'specificProducts',
      'specificCategory',
    ),
    specificProducts: Joi.array().items(optionalObjectId()).optional(),
    specificRootCategories: Joi.array().items(optionalObjectId()).optional(),
    specificMainCategories: Joi.array().items(optionalObjectId()).optional(),
    freebieCondition: Joi.string().valid(
      'onEveryPurchase',
      'aboveCertainAmount',
    ),
    freebieProduct: optionalObjectId(),
    freebieQuantity: Joi.number(),
  }).optional(),
  functionality: Joi.object({
    showToCustomer: Joi.boolean(),
    validForOnlinePaymentsOnly: Joi.boolean(),
    validForNewCustomersOnly: Joi.boolean(),
    autoApply: Joi.boolean(),
    applicableWithOtherCoupons: Joi.boolean(),
  }).optional(),
  validity: Joi.object({
    startDate: Joi.date(),
    endDate: Joi.date(),
  }).optional(),
});
