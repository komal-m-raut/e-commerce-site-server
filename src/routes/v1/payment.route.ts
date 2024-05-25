import { createOrder, verifyOrder } from '@src/controller/payment.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import {
  createOrderSchema,
  verifyOrderSchema,
} from '@src/validation/payment.validation';
import { Router } from 'express';

const paymentRouter: Router = Router();

/**
 *  @swagger
 * /v1/payment/create-order:
 *  post:
 *   summary: Create a new order
 *   description: Create a new order
 *   tags:
 *     - Payment
 *   security:
 *     - bearerAuth: []
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           required:
 *             - amount
 *             - currency
 *             - receipt
 *           properties:
 *             amount:
 *               type: number
 *               description: The amount for the order
 *             currency:
 *               type: string
 *               description: The currency for the order
 *             receipt:
 *               type: string
 *               description: The receipt for the order
 *   responses:
 *     200:
 *       description: Order created successfully
 *     400:
 *       description: Order not created
 *     500:
 *       description: Internal server error
 */
paymentRouter.post(
  '/create-order',
  validate({ body: createOrderSchema }),
  authMiddleware(),
  createOrder,
);
/**
 *  @swagger
 * /v1/payment/verify-order:
 *  post:
 *   summary: Verify an order
 *   description: Verify an order
 *   tags:
 *     - Payment
 *   security:
 *     - bearerAuth: []
 *   parameters:
 *     - in: header
 *       name: x-razorpay-signature
 *       schema:
 *         type: string
 *       required: true
 *       description: Razorpay signature for verification
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           required:
 *             - orderId
 *             - paymentId
 *             - roleId
 *           properties:
 *             orderId:
 *               type: string
 *               description: The order id
 *             paymentId:
 *               type: string
 *               description: The payment id
 *             roleId:
 *               type: string
 *               description: The role id
 *   responses:
 *     200:
 *       description: Order verified successfully
 *     400:
 *       description: Order not found or invalid
 *     500:
 *       description: Internal server error
 */
paymentRouter.post(
  '/verify-order',
  validate({ body: verifyOrderSchema }),
  authMiddleware(),
  verifyOrder,
);

export default paymentRouter;

// {
//   "razorpay_payment_id": "pay_OEn7YO4b7e9a9p",
//   "razorpay_order_id": "order_OEn6YChl0BUqST",
//   "razorpay_signature": "a6718a9d161d79295686331494a791e57dababce2e68158cd4ca347ed4524883"
// }
