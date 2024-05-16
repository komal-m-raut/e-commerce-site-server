import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
} from '@src/controller/coupon.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import { idSchema } from '@src/validation/common.validation';
import {
  createCouponSchema,
  updateCouponSchema,
} from '@src/validation/coupon.validation';
import { Router } from 'express';

const couponRouter: Router = Router();
/**
 * @swagger
 * /v1/coupons/create:
 *   post:
 *     tags:
 *       - Coupon
 *     summary: Create a new coupon
 *     security:
 *       - bearerAuth: []
 *     description: Only admin can create a new coupon.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               isDeleted:
 *                 type: boolean
 *               tenantId:
 *                 type: string
 *               supplierId:
 *                 type: string
 *               couponDetails:
 *                 type: object
 *                 required: true
 *                 properties:
 *                   couponType:
 *                     type: string
 *                     enum: ['percentageDiscount', 'flatDiscount', 'buyXGetYFree', 'freebie', 'freeShipping']
 *                     required: true
 *                   usageLimitPerCustomer:
 *                     type: string
 *                     enum: ['onlyOnce', 'custom', 'unlimited']
 *                     required: true
 *                   usageTime:
 *                     type: number
 *                   discount:
 *                     type: number
 *                     required: true
 *                   minimumOrderCondition:
 *                     type: string
 *                     enum: ['orderValue', 'orderQuantity']
 *                     required: true
 *                   minimumOrderValue:
 *                     type: number
 *                   minimumOrderQuantity:
 *                     type: number
 *                   maximumDiscount:
 *                     type: number
 *                   buyQuantity:
 *                     type: number
 *                   getQuantity:
 *                     type: number
 *                   maximumLimitPerOrder:
 *                     type: number
 *                   applyCouponOn:
 *                     type: string
 *                     enum: ['allProducts', 'specificProducts', 'specificCategory']
 *                     required: true
 *                   specificProducts:
 *                     type: array
 *                     items:
 *                       type: string
 *                   specificRootCategories:
 *                     type: array
 *                     items:
 *                       type: string
 *                   specificMainCategories:
 *                     type: array
 *                     items:
 *                       type: string
 *                   freebieCondition:
 *                     type: string
 *                     enum: ['onEveryPurchase', 'aboveCertainAmount']
 *                   freebieProduct:
 *                     type: string
 *                   freebieQuantity:
 *                     type: number
 *               functionality:
 *                 type: object
 *                 required: true
 *                 properties:
 *                   showToCustomer:
 *                     type: boolean
 *                     required: true
 *                   validForOnlinePaymentsOnly:
 *                     type: boolean
 *                     required: true
 *                   validForNewCustomersOnly:
 *                     type: boolean
 *                     required: true
 *                   autoApply:
 *                     type: boolean
 *                     required: true
 *                   applicableWithOtherCoupons:
 *                     type: boolean
 *                     required: true
 *               validity:
 *                 type: object
 *                 required: true
 *                 properties:
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     required: true
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     required: true
 *     responses:
 *       '200':
 *         description: Coupon created successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

couponRouter.post(
  '/create',
  authMiddleware({
    productPermissions: {
      promotionalProducts: true,
      createCoupons: true,
      editCoupons: true,
      deleteCoupons: true,
    },
    userPermissions: {},
  }),
  validate({ body: createCouponSchema }),
  createCoupon,
);

/**
 * @swagger
 * /v1/coupons/update/{id}:
 *   patch:
 *     tags:
 *       - Coupon
 *     summary: Update an existing coupon
 *     security:
 *       - bearerAuth: []
 *     description: Only admin can update an existing coupon.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The coupon ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               isDeleted:
 *                 type: boolean
 *               couponDetails:
 *                 type: object
 *                 properties:
 *                   couponType:
 *                     type: string
 *                     enum: ['percentageDiscount', 'flatDiscount', 'buyXGetYFree', 'freebie', 'freeShipping']
 *                   usageLimitPerCustomer:
 *                     type: string
 *                     enum: ['onlyOnce', 'custom', 'unlimited']
 *                   usageTime:
 *                     type: number
 *                   discount:
 *                     type: number
 *                   minimumOrderCondition:
 *                     type: string
 *                     enum: ['orderValue', 'orderQuantity']
 *                   minimumOrderValue:
 *                     type: number
 *                   minimumOrderQuantity:
 *                     type: number
 *                   maximumDiscount:
 *                     type: number
 *                   buyQuantity:
 *                     type: number
 *                   getQuantity:
 *                     type: number
 *                   maximumLimitPerOrder:
 *                     type: number
 *                   applyCouponOn:
 *                     type: string
 *                     enum: ['allProducts', 'specificProducts', 'specificCategory']
 *                   specificProducts:
 *                     type: array
 *                     items:
 *                       type: string
 *                   specificRootCategories:
 *                     type: array
 *                     items:
 *                       type: string
 *                   specificMainCategories:
 *                     type: array
 *                     items:
 *                       type: string
 *                   freebieCondition:
 *                     type: string
 *                     enum: ['onEveryPurchase', 'aboveCertainAmount']
 *                   freebieProduct:
 *                     type: string
 *                   freebieQuantity:
 *                     type: number
 *               functionality:
 *                 type: object
 *                 properties:
 *                   showToCustomer:
 *                     type: boolean
 *                   validForOnlinePaymentsOnly:
 *                     type: boolean
 *                   validForNewCustomersOnly:
 *                     type: boolean
 *                   autoApply:
 *                     type: boolean
 *                   applicableWithOtherCoupons:
 *                     type: boolean
 *               validity:
 *                 type: object
 *                 properties:
 *                   startDate:
 *                     type: string
 *                     format: date
 *                   endDate:
 *                     type: string
 *                     format: date
 *     responses:
 *       '200':
 *         description: Coupon updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Coupon not found
 *       '500':
 *         description: Internal server error
 */

couponRouter.patch(
  '/update/:id',
  authMiddleware({
    productPermissions: {
      promotionalProducts: true,
      createCoupons: true,
      editCoupons: true,
      deleteCoupons: true,
    },
    userPermissions: {},
  }),
  validate({ body: updateCouponSchema, id: idSchema }),
  updateCoupon,
);

/**
 * @swagger
 * /v1/coupons:
 *   get:
 *     tags:
 *       - Coupon
 *     description: Get all coupons.
 *     summary: Get all coupons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: itemsPerPage
 *         schema:
 *           type: number
 *         required: false
 *         description: Number of items per page
 *       - in: query
 *         name: pageNo
 *         schema:
 *           type: number
 *         required: false
 *         description: Page number
 *     responses:
 *       '200':
 *         description: Coupons fetched successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: No coupons found
 *       '500':
 *         description: Internal server error
 */
couponRouter.get(
  '/',
  authMiddleware({
    productPermissions: {
      promotionalProducts: true,
      createCoupons: true,
      editCoupons: true,
      deleteCoupons: true,
    },
    userPermissions: {},
  }),
  getAllCoupons,
);

/**
 * @swagger
 * /v1/coupons/{id}:
 *   get:
 *     tags:
 *       - Coupon
 *     summary: Get coupon by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Coupon ID
 *         schema:
 *           type: string
 *     description: Only admin can get coupon by ID.
 *     responses:
 *       '200':
 *         description: Coupon fetched successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Coupon not found
 *       '500':
 *         description: Internal server error
 */

couponRouter.get(
  '/:id',
  authMiddleware({
    productPermissions: {
      promotionalProducts: true,
      createCoupons: true,
      editCoupons: true,
      deleteCoupons: true,
    },
    userPermissions: {},
  }),
  validate({ params: idSchema }),
  getCouponById,
);

/**
 * @swagger
 * /v1/coupons/{id}:
 *   delete:
 *     tags:
 *       - Coupon
 *     summary: Delete coupon by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Coupon ID
 *         schema:
 *           type: string
 *     description: Only admin can delete coupon by ID.
 *     responses:
 *       '200':
 *         description: Coupon deleted successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Coupon not found
 *       '500':
 *         description: Internal server error
 */
couponRouter.delete(
  '/:id',
  authMiddleware({
    productPermissions: {
      promotionalProducts: true,
      createCoupons: true,
      editCoupons: true,
      deleteCoupons: true,
    },
    userPermissions: {},
  }),
  validate({ params: idSchema }),
  deleteCoupon,
);

export default couponRouter;
