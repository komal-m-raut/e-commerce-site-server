import {
  createOtp,
  createPasswordResetLink,
  validateOtp,
  verifyPasswordResetLink,
} from '@src/controller/auth.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import {
  createOtpSchema,
  createOtpTypeSchema,
  createPasswordResetLinkSchema,
  validateOtpSchema,
  verifyPasswordResetLinkSchema,
} from '@src/validation/auth.validation';
import { Router } from 'express';

const authRouter = Router();

authRouter.post(
  '/create-otp/:type',
  validate({ body: createOtpSchema, params: createOtpTypeSchema }),
  createOtp,
);
authRouter.post(
  '/validate-otp',
  validate({ body: validateOtpSchema }),
  validateOtp,
);

authRouter.post(
  '/create-password-reset-link',
  validate({ body: createPasswordResetLinkSchema }),
  createPasswordResetLink,
);

authRouter.post(
  '/verify-password-reset-link',
  authMiddleware,
  validate({ body: verifyPasswordResetLinkSchema }),
  verifyPasswordResetLink,
);

export default authRouter;
