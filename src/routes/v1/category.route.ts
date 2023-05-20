import { addAttribute, addChildCategory, addMainCategory, addRootCategory, addVariant } from '@src/controller/category.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import { addAttributeValidation, addChildCategoryValidation, addMainCategoryValidation, addRootCategoryValidation, addVariantValidation } from '@src/validation/category.validation';
import express from 'express';


const router = express.Router();

router.post('/root-category',authMiddleware, validate(addRootCategoryValidation), addRootCategory);
router.post('/main-category',authMiddleware, validate(addMainCategoryValidation), addMainCategory);
router.post('/child-category',authMiddleware, validate(addChildCategoryValidation), addChildCategory);
router.post('/variant',authMiddleware, validate(addVariantValidation), addVariant);
router.post('/attribute',authMiddleware, validate(addAttributeValidation), addAttribute);

export default router;
