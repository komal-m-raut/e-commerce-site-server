import { Router } from 'express';
import {
  createRole,
  deleteRoleById,
  getRoleById,
  getAllRoles,
  updateRole,
} from '@src/controller/role.controller';

export const roleRouter: Router = Router();

//*POST ROUTE
roleRouter.post('/create', createRole);

//*GET ROUTE
roleRouter.get('/', getAllRoles);
roleRouter.get('/:id', getRoleById);

//*PATCH ROUTE
roleRouter.patch('/:id', updateRole);

//*DELETE ROUTE
roleRouter.delete('/:id', deleteRoleById);
