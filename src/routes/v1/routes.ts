import { Router } from 'express';
import { adminRouter } from './admin.route';
import tenantRouter from './tenant.route';
import authRouter from './auth.route';
import categoryRouter from './category.route';
import productRouter from './product.route';
import userRouter from './user.route';
import invoiceRouter from './invoice.route';
import homePageRouter from './homePage.route';

const router = Router();

router.use('/admin', adminRouter);
router.use('/tenant', tenantRouter);
router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/home-page', homePageRouter);

router.use('/invoice', invoiceRouter);

export default router;
