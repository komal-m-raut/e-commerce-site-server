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

  validate(addRootCategoryValidation),
  addRootCategory,
);
categoryRouter.post(
  '/main-category',

  validate(addMainCategoryValidation),
  addMainCategory,
);
categoryRouter.post(
  '/child-category',

  validate(addChildCategoryValidation),
  addChildCategory,
);
categoryRouter.post(
  '/variant',

  validate(addVariantValidation),
  addVariant,
);
categoryRouter.post(
  '/attribute',

  validate(addAttributeValidation),
  addAttribute,
);

//*GET ROUTE
categoryRouter.get('/root',  getRootCategories);
categoryRouter.get('/main',  getMainCategories);
categoryRouter.get('/main/:rootId',  getMainCategories);
categoryRouter.get('/child',  getChildCategories);
categoryRouter.get('/child/:mainId',  getChildCategories);
categoryRouter.get('/variant',  getVariants);
categoryRouter.get('/variant/:childId',  getVariants);
categoryRouter.get('/attribute',  getAttributes);
categoryRouter.get('/attribute/:childId',  getAttributes);

export default categoryRouter;
