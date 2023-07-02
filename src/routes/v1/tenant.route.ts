import {
  createMarketingPage,
  createTenant,
  deleteMarketingPage,
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
import {
  createTenantSchema,
  homeSectionSchema,
  loginTenantSchema,
  marketingPageIdSchema,
  marketingPageSchema,
  marketingPageUpdateSchema,
  tenantIdSchema,
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
  validate({ body: homeSectionSchema, params: tenantIdSchema }),
  homeSection,
);
tenantRouter.post(
  '/marketing-page/:id',
  validate({ body: marketingPageSchema, params: tenantIdSchema }),
  createMarketingPage,
);
//*GET ROUTE
tenantRouter.get('/', authMiddleware, getAllTenants);
tenantRouter.get('/:id', authMiddleware, getTenant);

//*PATCH ROUTE
tenantRouter.patch(
  '/:id',
  authMiddleware,
  validate({ body: updateTenantSchema, params: tenantIdSchema }),
  updateTenant,
);

tenantRouter.patch(
  '/home-section/:id',
  validate({ body: homeSectionSchema, params: tenantIdSchema }),
  homeSection,
);

tenantRouter.patch(
  '/marketing-page/:id',
  validate({ body: marketingPageUpdateSchema, params: tenantIdSchema }),
  updateMarketingPage,
);

//*DELETE ROUTE
tenantRouter.delete(
  '/:id',
  authMiddleware,
  validate({ params: tenantIdSchema }),
  deleteTenant,
);

tenantRouter.delete(
  '/marketing-page/:id',
  validate({ body: marketingPageIdSchema, params: tenantIdSchema }),
  deleteMarketingPage,
);

export default tenantRouter;
