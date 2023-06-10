import { createProduct, getAllProducts, getProduct } from '@src/controller/product.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import { createProductSchema } from '@src/validation/product.validation';
import { Router } from 'express';

const productRouter: Router = Router();

//*POST ROUTE
productRouter.post(
  '/create',
  validate({ body: createProductSchema }),
  createProduct,
);

//*GET ROUTE
productRouter.get('/', authMiddleware, getAllProducts);
productRouter.get('/:id', authMiddleware, getProduct);

// //*PATCH ROUTE
// productRouter.patch(
//   '/',
//   authMiddleware,
//   validate({ body: updateProductSchema }),
//   updateProduct,
// );

// //*DELETE ROUTE
// productRouter.delete('/:id', authMiddleware, deleteProduct);

export default productRouter;
