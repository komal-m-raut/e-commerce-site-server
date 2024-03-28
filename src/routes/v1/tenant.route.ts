import {
  createMarketingPage,
  createTenant,
  deleteTenant,
  getAllTenants,
  getTenant,
  homeSection,
  loginTenant,
  updateMarketingPage,
  updateTenant,
} from '@src/controller/tenant.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import { idSchema } from '@src/validation/common.validation';
import {
  createTenantSchema,
  homeSectionSchema,
  loginTenantSchema,
  marketingPageSchema,
  marketingPageUpdateSchema,
  updateTenantSchema,
} from '@src/validation/tenant.validation';
import { Router } from 'express';

const tenantRouter: Router = Router();

//*POST ROUTE
tenantRouter.post(
  '/register',
  validate({ body: createTenantSchema }),
  createTenant,
);
tenantRouter.post('/login', validate({ body: loginTenantSchema }), loginTenant);
tenantRouter.post(
  '/home-section/:id',
  validate({ body: homeSectionSchema, params: idSchema }),
  homeSection,
);
tenantRouter.post(
  '/marketing-page/:id',
  validate({ body: marketingPageSchema, params: idSchema }),
  createMarketingPage,
);
//*GET ROUTE
tenantRouter.get('/', authMiddleware, getAllTenants);
tenantRouter.get('/:id', authMiddleware, getTenant);

//*PATCH ROUTE
tenantRouter.patch(
  '/:id',
  authMiddleware,
  validate({ body: updateTenantSchema, params: idSchema }),
  updateTenant,
);

tenantRouter.patch(
  '/home-section/:id',
  validate({ body: homeSectionSchema, params: idSchema }),
  homeSection,
);

tenantRouter.patch(
  '/marketing-page/:id',
  validate({ body: marketingPageUpdateSchema, params: idSchema }),
  updateMarketingPage,
);

//*DELETE ROUTE
tenantRouter.delete(
  '/:id',
  authMiddleware,
  validate({ params: idSchema }),
  deleteTenant,
);

// tenantRouter.delete(
//   '/marketing-page/:id',
//   validate({ body: marketingPageIdSchema, params: idSchema }),
//   deleteMarketingPage,
// );

export default tenantRouter;
