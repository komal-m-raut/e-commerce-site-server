import {
  addAttribute,
  addChildCategory,
  addMainCategory,
  addRootCategory,
  addVariant,
  getAttributes,
  getChildCategories,
  getMainCategories,
  getRootCategories,
  getVariants,
} from '@src/controller/category.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import {
  addAttributeValidation,
  addChildCategoryValidation,
  addMainCategoryValidation,
  addRootCategoryValidation,
  addVariantValidation,
} from '@src/validation/category.validation';
import express from 'express';

const categoryRouter = express.Router();

//*POST ROUTE
categoryRouter.post(
  '/root-category',
  authMiddleware,
  validate(addRootCategoryValidation),
  addRootCategory,
);
categoryRouter.post(
  '/main-category',
  authMiddleware,
  validate(addMainCategoryValidation),
  addMainCategory,
);
categoryRouter.post(
  '/child-category',
  authMiddleware,
  validate(addChildCategoryValidation),
  addChildCategory,
);
categoryRouter.post(
  '/variant',
  authMiddleware,
  validate(addVariantValidation),
  addVariant,
);
categoryRouter.post(
  '/attribute',
  authMiddleware,
  validate(addAttributeValidation),
  addAttribute,
);

//*GET ROUTE
categoryRouter.get('/root', authMiddleware, getRootCategories);
categoryRouter.get('/main', authMiddleware, getMainCategories);
categoryRouter.get('/main/:rootId', authMiddleware, getMainCategories);
categoryRouter.get('/child', authMiddleware, getChildCategories);
categoryRouter.get('/child/:mainId', authMiddleware, getChildCategories);
categoryRouter.get('/variant', authMiddleware, getVariants);
categoryRouter.get('/variant/:childId', authMiddleware, getVariants);
categoryRouter.get('/attribute', authMiddleware, getAttributes);
categoryRouter.get('/attribute/:childId', authMiddleware, getAttributes);

export default categoryRouter;
