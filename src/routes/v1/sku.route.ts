import { updateProductVisibility } from '@src/controller/sku.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import { productIdSchema } from '@src/validation/common.validation';
import { visibilitySchema } from '@src/validation/sku.validation';
import { Router } from 'express';

const skuRouter = Router();

//*POST ROUTE

skuRouter.post(
  '/update-product-visibility/:productId',
  authMiddleware(2),
  validate({ body: visibilitySchema, params: productIdSchema }),
  updateProductVisibility,
);

export default skuRouter;
