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

const homePageRouter: Router = Router();

//*POST ROUTE
homePageRouter.post(
  '/create',
  validate({ body: createHomePageSchema }),
  createHomePage,
);

//*GET ROUTE
homePageRouter.get('/', getHomePageById);

//*PATCH ROUTE
homePageRouter.patch(
  '/',
  validate({ body: updateHomePageSchema }),
  updateHomePage,
);

//*DELETE ROUTE
homePageRouter.delete('/', deleteHomePageById);

export default homePageRouter;
