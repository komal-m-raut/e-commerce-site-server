import {
  createUser,
  loginUser,
  updateCart,
  updateUser,
  updateWishlist,
} from '@src/controller/user.controller';
import validate from '@src/middleware/validate';
import { userIdSchema } from '@src/validation/common.validation';
import {
  cartSchema,
  loginUserSchema,
  registerUserSchema,
  updateUserSchema,
  wishlistSchema,
} from '@src/validation/user.validation';
import { Router } from 'express';

const userRouter: Router = Router();

//*POST ROUTE

/**
 * @swagger
 * /v1/user/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: User with this Email is already registered
 *       500:
 *         description: Failed to create user
 */

userRouter.post(
  '/register',
  validate({ body: registerUserSchema }),
  createUser,
);

/**
 * @swagger
 * /v1/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Failed to login user
 */
userRouter.post('/login', validate({ body: loginUserSchema }), loginUser);

//*PATCH ROUTE

/**
 * @swagger
 * /v1/user/{userId}:
 *   patch:
 *     tags:
 *       - User
 *     summary: Update user information
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               shippingAddresses:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     streetAddress:
 *                       type: string
 *                     landMark:
 *                       type: string
 *                     pinCode:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     country:
 *                       type: string
 *                     addressType:
 *                       type: string
 *                       enum: ['Home', 'Work']
 *               phoneNumber:
 *                 type: string
 *               billingAddress:
 *                 type: string
 *               paymentMethods:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     cardholderName:
 *                       type: string
 *                     cardNumber:
 *                       type: string
 *                     cardExpiryDate:
 *                       type: string
 *                     cardCVV:
 *                       type: string
 *               wishlistProducts:
 *                 type: array
 *                 items:
 *                   type: string
 *               cart:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to update user
 */
userRouter.patch(
  '/:userId',
  validate({ body: updateUserSchema, params: userIdSchema }),
  updateUser,
);

/**
 * @swagger
 * /v1/user/{userId}/wishlist:
 *   patch:
 *     tags:
 *       - User
 *     summary: Update user wishlist
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Wishlist updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to update wishlist
 */


userRouter.patch(
  '/:userId/wishlist',
  validate({ body: wishlistSchema, params: userIdSchema }),
  updateWishlist,
);

/**
 * @swagger
 * /v1/user/{userId}/cart:
 *   patch:
 *     tags:
 *       - User
 *     summary: Update user cart
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed to update cart
 */
userRouter.patch(
  '/:userId/cart',
  validate({ body: cartSchema, params: userIdSchema }),
  updateCart,
);

export default userRouter;
