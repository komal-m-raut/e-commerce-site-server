import { createTenant, deleteTenant, getAllTenants, getTenant, updateTenant } from '@src/controller/tenant.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import { createTenantSchema, updateTenantSchema } from '@src/validation/tenant.validation';
import { Router } from 'express';

const tenantRouter: Router = Router();

//*POST ROUTE
tenantRouter.post('/', authMiddleware, validate({ body: createTenantSchema }), createTenant);

//*GET ROUTE
tenantRouter.get('/', authMiddleware, getAllTenants);
tenantRouter.get('/:id', authMiddleware, getTenant);

//*PATCH ROUTE
tenantRouter.patch('/:id', authMiddleware, validate({ body: updateTenantSchema }), updateTenant);

//*DELETE ROUTE
tenantRouter.delete('/:id', authMiddleware, deleteTenant);

export default tenantRouter;
