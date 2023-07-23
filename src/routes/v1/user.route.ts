import {
  createUser,
  loginUser,
  updateCart,
  updateUser,
  updateWishlist,
} from '@src/controller/user.controller';
import validate from '@src/middleware/validate';
import {
  cartSchema,
  loginUserSchema,
  registerUserSchema,
  updateUserSchema,
  userIdSchema,
  wishlistSchema,
} from '@src/validation/user.validation';
import { Router } from 'express';

const userRouter: Router = Router();

//*POST ROUTE

userRouter.post(
  '/register',
  validate({ body: registerUserSchema }),
  createUser,
);
userRouter.post('/login', validate({ body: loginUserSchema }), loginUser);

//*PATCH ROUTE

userRouter.patch(
  '/:userId',
  validate({ body: updateUserSchema, params: userIdSchema }),
  updateUser,
);

userRouter.patch(
  '/:userId/wishlist',
  validate({ body: wishlistSchema, params: userIdSchema }),
  updateWishlist,
);

userRouter.patch(
  '/:userId/cart',
  validate({ body: cartSchema, params: userIdSchema }),
  updateCart,
);

export default userRouter;
