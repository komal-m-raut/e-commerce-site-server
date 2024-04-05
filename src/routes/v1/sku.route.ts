import {
  createSku,
  updateProductVisibility,
} from '@src/controller/sku.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import { productIdSchema } from '@src/validation/common.validation';
import {
  createSkuSchema,
  visibilitySchema,
} from '@src/validation/sku.validation';
import { Router } from 'express';

const skuRouter = Router();

//*POST ROUTE

skuRouter.post(
  '/create/:productId',
  authMiddleware(2),
  validate({ body: createSkuSchema, params: productIdSchema }),
  createSku,
);

//*PATCH ROUTE

skuRouter.patch(
  '/update-product-visibility/:productId',
  authMiddleware(2),
  validate({ body: visibilitySchema, params: productIdSchema }),
  updateProductVisibility,
);

export default skuRouter;
