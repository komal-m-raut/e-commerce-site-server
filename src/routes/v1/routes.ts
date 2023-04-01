import { Router } from 'express';
import { adminRouter } from './admin.route';
import tenantRouter from './tenant.route';
const router = Router();

router.use('/admin',adminRouter);
router.use('/tenant', tenantRouter);

export default router;
