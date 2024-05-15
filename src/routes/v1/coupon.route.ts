import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  updateCoupon,
} from '@src/controller/coupon.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import { idSchema } from '@src/validation/common.validation';
import { createCouponSchema } from '@src/validation/coupon.validation';
import { Router } from 'express';

const couponRouter: Router = Router();

/**
 * @swagger
 * /coupon/create:
 *  post:
 *   tags:
 *    - Coupon
 *   summary: Create a new coupon
 *   description: Only admin can create a new coupon.
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *               required: true
 *             description:
 *               type: string
 *             isActive:
 *               type: boolean
 *             isDeleted:
 *               type: boolean
 *             tenantId:
 *               type: string
 *             supplierId:
 *               type: string
 *             couponDetails:
 *               type: object
 *               required: true
 *               properties:
 *                 couponType:
 *                   type: string
 *                   enum: ['percentageDiscount', 'flatDiscount', 'buyXGetYFree', 'freebie', 'freeShipping']
 *                   required: true
 *                 usageLimitPerCustomer:
 *                   type: string
 *                   enum: ['onlyOnce', 'custom', 'unlimited']
 *                   required: true
 *                 usageTime:
 *                   type: number
 *                 discount:
 *                   type: number
 *                   required: true
 *                 minimumOrderCondition:
 *                   type: string
 *                   enum: ['orderValue', 'orderQuantity']
 *                   required: true
 *                 minimumOrderValue:
 *                   type: number
 *                 minimumOrderQuantity:
 *                   type: number
 *                 maximumDiscount:
 *                   type: number
 *                 buyQuantity:
 *                   type: number
 *                 getQuantity:
 *                   type: number
 *                 maximumLimitPerOrder:
 *                   type: number
 *                 applyCouponOn:
 *                   type: string
 *                   enum: ['allProducts', 'specificProducts', 'specificCategory']
 *                   required: true
 *                 specificProducts:
 *                   type: array
 *                   items:
 *                     type: string
 *                 specificRootCategories:
 *                   type: array
 *                   items:
 *                     type: string
 *                 specificMainCategories:
 *                   type: array
 *                   items:
 *                     type: string
 *                 freebieCondition:
 *                   type: string
 *                   enum: ['onEveryPurchase', 'aboveCertainAmount']
 *                 freebieProduct:
 *                   type: string
 *                 freebieQuantity:
 *                   type: number
 *             functionality:
 *               type: object
 *               required: true
 *               properties:
 *                 showToCustomer:
 *                   type: boolean
 *                   required: true
 *                 validForOnlinePaymentsOnly:
 *                   type: boolean
 *                   required: true
 *                 validForNewCustomersOnly:
 *                   type: boolean
 *                   required: true
 *                 autoApply:
 *                   type: boolean
 *                   required: true
 *                 applicableWithOtherCoupons:
 *                   type: boolean
 *                   required: true
 *             validity:
 *               type: object
 *               required: true
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   required: true
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   required: true
 *   responses:
 *     '200':
 *       description: Coupon created successfully
 *     '400':
 *       description: Bad request
 *     '401':
 *       description: Unauthorized
 *     '500':
 *       description: Internal server error
 */

couponRouter.post(
  '/create',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: createCouponSchema }),
  createCoupon,
);


couponRouter.patch(
  '/update',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: createCouponSchema }),
  updateCoupon,
);

couponRouter.get(
  '/',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  getAllCoupons,
);

couponRouter.get(
  '/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ params: idSchema }),
  getAllCoupons,
);

couponRouter.delete(
  '/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ params: idSchema }),
  deleteCoupon,
);

export default couponRouter;
