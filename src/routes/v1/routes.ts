import { Router } from 'express';
import { adminRouter } from './admin.route';
import tenantRouter from './tenant.route';
import authRouter from './auth.route';
import categoryRouter from './category.route';
const router = Router();

router.use('/admin', adminRouter);
router.use('/tenant', tenantRouter);
router.use('/auth', authRouter);
router.use('/category', categoryRouter)

export default router;
