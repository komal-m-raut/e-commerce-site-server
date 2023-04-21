import {
  createTenant,
  deleteTenant,
  getAllTenants,
  getTenant,
  loginTenant,
  updateTenant,
} from '@src/controller/tenant.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import {
  createTenantSchema,
  loginTenantSchema,
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

//*GET ROUTE
tenantRouter.get('/', authMiddleware, getAllTenants);
tenantRouter.get('/:id', authMiddleware, getTenant);

//*PATCH ROUTE
tenantRouter.patch(
  '/',
  authMiddleware,
  validate({ body: updateTenantSchema }),
  updateTenant,
);

//*DELETE ROUTE
tenantRouter.delete('/:id', authMiddleware, deleteTenant);

export default tenantRouter;
