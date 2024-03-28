import { Router } from 'express';
import {
  createAdminSchema,
  loginSchema,
  updateAdminSchema,
} from '@src/validation/admin.validation';
import validate from '@src/middleware/validate';
import {
  createAdmin,
  deleteAdminById,
  getAdminById,
  getAllAdmins,
  loginAdmin,
  updateAdmin,
} from '@src/controller/admin.controller';
import authMiddleware from '@src/middleware/auth';
import { idSchema } from '@src/validation/common.validation';

export const adminRouter: Router = Router();

//*POST ROUTE
adminRouter.post('/create', validate({ body: createAdminSchema }), createAdmin);
adminRouter.post('/login', validate({ body: loginSchema }), loginAdmin);

//*GET ROUTE
adminRouter.get('/', authMiddleware(2), getAllAdmins); //This is paginated route pass itemsPerPage & pageNo from query params
adminRouter.get('/:id', validate({ params: idSchema }), getAdminById);

//*PATCH ROUTE
adminRouter.patch(
  '/:id',
  validate({ body: updateAdminSchema, params: idSchema }),
  updateAdmin,
);

//*DELETE ROUTE
adminRouter.delete('/:id', validate({ params: idSchema }), deleteAdminById);
