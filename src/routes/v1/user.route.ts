import {
  createUser,
  loginUser,
  updateCart,
  updateUser,
  updateWishlist,
} from '@src/controller/user.controller';
import authMiddleware from '@src/middleware/auth';
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
 *               - firstName
 *               - lastName
 *               - email
 *               - phoneNumber
 *               - password
 *               - domain
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name.
 *               lastName:
 *                 type: string
 *                 description: The user's last name.
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               phoneNumber:
 *                 type: number
 *                 description: The user's phone number.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *               domain:
 *                 type: string
 *                 description: The user's domain.
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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to add to the wishlist
 *     responses:
 *       200:
 *         description: Wishlist updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to update wishlist
 */

userRouter.patch(
  '/:userId/wishlist',
  authMiddleware({
    productPermissions: {
      accessToPremiumSupplierProducts: true,
    },
    userPermissions: {},
  }),
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
 *     security:
 *       - bearerAuth: []
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
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to add to the cart
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product to add to the cart
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to update cart
 */
userRouter.patch(
  '/:userId/cart',
  authMiddleware({
    productPermissions: {
      accessToPremiumSupplierProducts: true,
    },
    userPermissions: {},
  }),
  validate({ body: cartSchema, params: userIdSchema }),
  updateCart,
);

export default userRouter;
