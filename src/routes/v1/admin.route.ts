import { Router } from 'express';
import {
  createAdminSchema,
  idSchema,
  updateAdminSchema,
} from '@src/validation/admin.validation';
import validate from '@src/middleware/validate';
import {
  createAdmin,
  deleteAdminById,
  getAdminById,
  getAllAdmins,
  updateAdmin,
} from '@src/controller/admin.controller';

export const adminRouter: Router = Router();

//*POST ROUTE
adminRouter.post('/', validate({ body: createAdminSchema }), createAdmin);

//*GET ROUTE
adminRouter.get('/', getAllAdmins);
adminRouter.get('/:id', validate({ params: idSchema }), getAdminById);

//*PATCH ROUTE
adminRouter.patch(
  '/:id',
  validate({ body: updateAdminSchema, params: idSchema }),
  updateAdmin,
);

//*DELETE ROUTE
adminRouter.delete(
  '/:id',
  validate({ params: idSchema }),
  deleteAdminById,
);
