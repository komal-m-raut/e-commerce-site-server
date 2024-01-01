import { Router } from 'express';
import validate from '@src/middleware/validate';
import {
  createHomePageSchema,
  idSchema,
  updateHomePageSchema,
} from '@src/validation/homePage.validation';
import {
  createHomePage,
  deleteHomePageById,
  getHomePageById,
  updateHomePage,
} from '@src/controller/homePage.controller';
import authMiddleware from '@src/middleware/auth';

export const homePageRouter: Router = Router();

//*POST ROUTE
homePageRouter.post(
  '/create',
  authMiddleware,
  validate({ body: createHomePageSchema }),
  createHomePage,
);

//*GET ROUTE
homePageRouter.get(
  '/:tenantId',
  validate({ params: idSchema }),
  getHomePageById,
);

//*PATCH ROUTE
homePageRouter.patch(
  '/',
  authMiddleware,
  validate({ body: updateHomePageSchema, params: idSchema }),
  updateHomePage,
);

//*DELETE ROUTE
homePageRouter.delete(
  '/',
  authMiddleware,
  validate({ params: idSchema }),
  deleteHomePageById,
);
