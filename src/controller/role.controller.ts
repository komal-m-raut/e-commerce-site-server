import { RoleModel } from '@src/model/role.model';
import {
  BadRequestError,
  InternalError,
  NotFoundError,
} from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';

export const createRole = catchAsync(async (req, res, next) => {
  const { roleId, name } = req.body;

  // Check if role with same name already exists

  const existingRole = await RoleModel.findOne({
    $or: [{ roleId: roleId }, { name: name }],
  })
    .lean()
    .exec();

  if (existingRole) {
    throw next(
      new BadRequestError('Role with this roleId or name already exists'),
    );
  }

  // Create new role document
  const newRole = await RoleModel.create(req.body);

  // Return success response
  return new SuccessResponse('Role created successfully', newRole).send(res);
});

export const getAllRoles = catchAsync(async (_req, res, next) => {
  const roles = await RoleModel.find().lean().exec();

  if (!roles) {
    throw next(new InternalError('No roles found'));
  }
  return new SuccessResponse('success', { data: roles }).send(res);
});

export const getRoleById = catchAsync(async (req, res, next) => {
  const { roleId } = req.params;

  const role = await RoleModel.findOne({ roleId }).lean().exec();

  if (!role) {
    throw next(new NotFoundError('Role not found'));
  }

  return new SuccessResponse('success', { data: role }).send(res);
});

export const updateRole = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const role = await RoleModel.findByIdAndUpdate(id, req.body, { new: true })
    .lean()
    .exec();

  if (!role) {
    throw next(new NotFoundError('Role not found'));
  }

  return new SuccessResponse('Role updated successfully', {
    data: role,
  }).send(res);
});

export const deleteRoleById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const role = await RoleModel.findByIdAndDelete(id).lean().exec();

  if (!role) {
    throw next(new NotFoundError('Role not found'));
  }

  return new SuccessResponse('success', {
    message: 'Role deleted successfully',
  }).send(res);
});
