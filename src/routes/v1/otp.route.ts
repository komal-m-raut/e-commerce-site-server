import { createOtp, validateOtp } from '@src/controller/otp.controller';
import validate from '@src/middleware/validate';
import { createOtpSchema, validateOtpSchema } from '@src/validation/otp.validation';
import { Router } from 'express';

const router = Router();

router.post('/create', validate({body: createOtpSchema}), createOtp);
router.post('/validate', validate({body: validateOtpSchema}), validateOtp);

export default router;
