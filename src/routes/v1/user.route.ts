import { createUser, loginUser } from '@src/controller/user.controller';
import validate from '@src/middleware/validate';
import {
  loginUserSchema,
  registerUserSchema,
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

export default userRouter;
