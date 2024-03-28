import { Router } from 'express';
import validate from '@src/middleware/validate';
import {
  createHomePageSchema,
  updateHomePageSchema,
} from '@src/validation/homePage.validation';
import {
  createHomePage,
  deleteHomePageById,
  getHomePageById,
  updateHomePage,
} from '@src/controller/homePage.controller';
import authMiddleware from '@src/middleware/auth';

const homePageRouter: Router = Router();

//*POST ROUTE
homePageRouter.post(
  '/create',
  authMiddleware(2),
  validate({ body: createHomePageSchema }),
  createHomePage,
);

//*GET ROUTE
homePageRouter.get('/', authMiddleware(2), getHomePageById);

//*PATCH ROUTE
homePageRouter.patch(
  '/',
  authMiddleware(2),
  validate({ body: updateHomePageSchema }),
  updateHomePage,
);

//*DELETE ROUTE
homePageRouter.delete('/', authMiddleware(2), deleteHomePageById);

export default homePageRouter;
