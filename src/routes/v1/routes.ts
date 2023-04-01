import { Router } from 'express';
import { adminRouter } from './admin.route';
import tenantRouter from './tenant.route';
import otpRouter from './otp.route';
const router = Router();

router.use('/admin', adminRouter);
router.use('/tenant', tenantRouter);
router.use('/otp', otpRouter);

export default router;
