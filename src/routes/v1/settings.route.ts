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
  authMiddleware(2),
  validate({ body: createCareInstructionsSchema }),
  createCareInstructions,
);

settingsRouter.post(
  '/exchange-refund',
  authMiddleware(2),
  validate({ body: createExchangeRefundSchema }),
  createExchangeRefund,
);

settingsRouter.post(
  '/faq',
  authMiddleware(2),
  validate({ body: createFaqSchema }),
  createFaq,
);

settingsRouter.post(
  '/product-includes',
  authMiddleware(2),
  validate({ body: createProductIncludesSchema }),
  createProductIncludes,
);

//*GET ROUTE

settingsRouter.get(
  '/care-instructions',
  authMiddleware(2),
  getAllCareInstruction,
); //This is paginated route pass itemsPerPage & pageNo from query params

settingsRouter.get('/exchange-refund', authMiddleware(2), getAllExchangeRefund); //This is paginated route pass itemsPerPage & pageNo from query params

settingsRouter.get('/faq', authMiddleware(2), getAllFaq); //This is paginated route pass itemsPerPage & pageNo from query params

settingsRouter.get(
  '/product-includes',
  authMiddleware(2),
  getAllProductIncludes,
); //This is paginated route pass itemsPerPage & pageNo from query params

//*PATCH ROUTE

settingsRouter.patch(
  '/care-instructions/:id',
  authMiddleware(2),
  validate({ body: updateCareInstructionsSchema, params: idSchema }),
  updateCareInstructions,
);

settingsRouter.patch(
  '/exchange-refund/:id',
  authMiddleware(2),
  validate({ body: updateExchangeRefundSchema, params: idSchema }),
  updateExchangeRefund,
);

settingsRouter.patch(
  '/faq/:id',
  authMiddleware(2),
  validate({ body: updateFaqSchema, params: idSchema }),
  updateFaq,
);

settingsRouter.patch(
  '/product-includes/:id',
  authMiddleware(2),
  validate({ body: updateProductIncludesSchema, params: idSchema }),
  updateProductIncludes,
);

//*DELETE ROUTE

settingsRouter.delete(
  '/care-instructions/:id',
  authMiddleware(2),
  validate({ params: idSchema }),
  deleteCareInstructionById,
);

settingsRouter.delete(
  '/exchange-refund/:id',
  authMiddleware(2),
  validate({ params: idSchema }),
  deleteExchangeRefundById,
);

settingsRouter.delete(
  '/faq/:id',
  authMiddleware(2),
  validate({ params: idSchema }),
  deleteFaqById,
);

settingsRouter.delete(
  '/product-includes/:id',
  authMiddleware(2),
  validate({ params: idSchema }),
  deleteProductIncludesById,
);
