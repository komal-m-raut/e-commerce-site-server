import { Router } from 'express';
import { adminRouter } from './admin.route';
import tenantRouter from './tenant.route';
import authRouter from './auth.route';
import categoryRouter from './category.route';
import userRouter from './user.route';
import invoiceRouter from './invoice.route';
import homePageRouter from './homePage.route';
import { roleRouter } from './role.route';
import { settingsRouter } from './settings.route';
import skuRouter from './sku.route';
import marketplaceProductRouter from './marketplaceProduct.route';
import tenantProductRouter from './tenantProduct.route';
import tenantSkuRouter from './tenantSKU.route';

const router = Router();

router.use('/admin', adminRouter);
router.use('/tenant', tenantRouter);
router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/marketplace/product', marketplaceProductRouter);
router.use('/tenant/product', tenantProductRouter);
router.use('/user', userRouter);
router.use('/home-page', homePageRouter);
router.use('/role', roleRouter);
router.use('/settings', settingsRouter);
router.use('/sku', skuRouter);
router.use('/tenant/sku', tenantSkuRouter)

router.use('/invoice', invoiceRouter);

export default router;
