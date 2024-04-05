import {
  createProduct,
  filteredProducts,
  getAllProducts,
  getProduct,
  searchAndFilterProducts,
  searchProduct,
} from '@src/controller/product.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import {
  createProductSchema,
  filterProductSchema,
  searchAndFilterSchema,
  searchProductSchema,
} from '@src/validation/product.validation';
import { Router } from 'express';

const productRouter: Router = Router();

//*POST ROUTE
productRouter.post(
  '/create',
  authMiddleware(2),
  validate({ body: createProductSchema }),
  createProduct,
);

//*GET ROUTE
productRouter.get('/:itemsPerPage/:pageCount', authMiddleware, getAllProducts);
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

//? Marketplace routes

productRouter.get(
  '/marketplace/search',
  validate({ query: searchProductSchema }),
  searchProduct,
);

productRouter.get(
  '/marketplace/filter',
  validate({ query: filterProductSchema }),
  filteredProducts,
);

productRouter.get(
  '/marketplace/search-filter',
  validate({ query: searchAndFilterSchema }),
  searchAndFilterProducts,
);

export default productRouter;
