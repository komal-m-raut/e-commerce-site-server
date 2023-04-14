import { createOtp, validateOtp } from '@src/controller/otp.controller';
import validate from '@src/middleware/validate';
import {
  createOtpSchema,
  createOtpTypeSchema,
  validateOtpSchema,
} from '@src/validation/otp.validation';
import { Router } from 'express';

const otpRouter = Router();

otpRouter.post(
  '/create/:type',
  validate({ body: createOtpSchema, params: createOtpTypeSchema }),
  createOtp,
);
otpRouter.post('/validate', validate({ body: validateOtpSchema }), validateOtp);

export default otpRouter;
