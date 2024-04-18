import { Router } from 'express';
import validate from '@src/middleware/validate';
import authMiddleware from '@src/middleware/auth';
import {
  createCareInstructions,
  createExchangeRefund,
  createFaq,
  createProductIncludes,
  deleteCareInstructionById,
  deleteExchangeRefundById,
  deleteFaqById,
  deleteProductIncludesById,
  getAllCareInstruction,
  getAllExchangeRefund,
  getAllFaq,
  getAllProductIncludes,
  updateCareInstructions,
  updateExchangeRefund,
  updateFaq,
  updateProductIncludes,
} from '@src/controller/settings.controller';
import {
  createCareInstructionsSchema,
  createExchangeRefundSchema,
  createFaqSchema,
  createProductIncludesSchema,
  updateCareInstructionsSchema,
  updateExchangeRefundSchema,
  updateFaqSchema,
  updateProductIncludesSchema,
} from '@src/validation/settings.validation';
import { idSchema } from '@src/validation/common.validation';

export const settingsRouter: Router = Router();

//*POST ROUTE

settingsRouter.post(
  '/care-instructions',
  validate({ body: createCareInstructionsSchema }),
  createCareInstructions,
);

settingsRouter.post(
  '/exchange-refund',
  validate({ body: createExchangeRefundSchema }),
  createExchangeRefund,
);

settingsRouter.post(
  '/faq',
  validate({ body: createFaqSchema }),
  createFaq,
);

settingsRouter.post(
  '/product-includes',
  validate({ body: createProductIncludesSchema }),
  createProductIncludes,
);

//*GET ROUTE

settingsRouter.get(
  '/care-instructions',
  getAllCareInstruction,
); //This is paginated route pass itemsPerPage & pageNo from query params

settingsRouter.get('/exchange-refund', getAllExchangeRefund); //This is paginated route pass itemsPerPage & pageNo from query params

settingsRouter.get('/faq', getAllFaq); //This is paginated route pass itemsPerPage & pageNo from query params

settingsRouter.get(
  '/product-includes',
  getAllProductIncludes,
); //This is paginated route pass itemsPerPage & pageNo from query params

//*PATCH ROUTE

settingsRouter.patch(
  '/care-instructions/:id',
  validate({ body: updateCareInstructionsSchema, params: idSchema }),
  updateCareInstructions,
);

settingsRouter.patch(
  '/exchange-refund/:id',
  validate({ body: updateExchangeRefundSchema, params: idSchema }),
  updateExchangeRefund,
);

settingsRouter.patch(
  '/faq/:id',
  validate({ body: updateFaqSchema, params: idSchema }),
  updateFaq,
);

settingsRouter.patch(
  '/product-includes/:id',
  validate({ body: updateProductIncludesSchema, params: idSchema }),
  updateProductIncludes,
);

//*DELETE ROUTE

settingsRouter.delete(
  '/care-instructions/:id',
  validate({ params: idSchema }),
  deleteCareInstructionById,
);

settingsRouter.delete(
  '/exchange-refund/:id',
  validate({ params: idSchema }),
  deleteExchangeRefundById,
);

settingsRouter.delete(
  '/faq/:id',
  validate({ params: idSchema }),
  deleteFaqById,
);

settingsRouter.delete(
  '/product-includes/:id',
  validate({ params: idSchema }),
  deleteProductIncludesById,
);
