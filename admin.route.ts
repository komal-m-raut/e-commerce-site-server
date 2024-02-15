import { Router } from 'express';
import {
  createAdminSchema,
  idSchema,
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

export const adminRouter: Router = Router();

//*POST ROUTE
adminRouter.post('/create', validate({ body: createAdminSchema }), createAdmin);
adminRouter.post('/login', validate({ body: loginSchema }), loginAdmin);

//*GET ROUTE
// adminRouter.get('/', getAllAdmins);    //vedavrat
adminRouter.get('/',authMiddleware, getAllAdmins);   // added by prashant
adminRouter.get('/:id', validate({ params: idSchema }), getAdminById);

//*PATCH ROUTE
adminRouter.patch(
  '/:id',
  validate({ body: updateAdminSchema, params: idSchema }),
  updateAdmin,
);

//*DELETE ROUTE
adminRouter.delete('/:id', validate({ params: idSchema }), deleteAdminById);
