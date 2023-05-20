import { addAttribute, addChildCategory, addMainCategory, addRootCategory, addVariant } from '@src/controller/category.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import { addAttributeValidation, addChildCategoryValidation, addMainCategoryValidation, addRootCategoryValidation, addVariantValidation } from '@src/validation/category.validation';
import express from 'express';


const categoryRouter = express.Router();

categoryRouter.post('/root-category',authMiddleware, validate(addRootCategoryValidation), addRootCategory);
categoryRouter.post('/main-category',authMiddleware, validate(addMainCategoryValidation), addMainCategory);
categoryRouter.post('/child-category',authMiddleware, validate(addChildCategoryValidation), addChildCategory);
categoryRouter.post('/variant',authMiddleware, validate(addVariantValidation), addVariant);
categoryRouter.post('/attribute',authMiddleware, validate(addAttributeValidation), addAttribute);

export default categoryRouter;
