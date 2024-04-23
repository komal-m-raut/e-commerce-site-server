import { AdminModel } from '@src/model/admin.model';
import {
  AuthFailureError,
  BadRequestError,
  InternalError,
  NotFoundError,
} from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';
import bcrypt from 'bcryptjs';
import { generateToken } from '@src/services/auth.service';

export const createAdmin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if admin with same email already exists
  const existingAdmin = await AdminModel.findOne({ email }).lean().exec();
  if (existingAdmin) {
    throw next(new BadRequestError('Admin with this email already exists'));
  }
  // Hash the password using bcrypt with 10 salt rounds
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Create new admin document
  const admin = await AdminModel.create({
    ...req.body,
    passwordHash,
  });

  // Return success response
  return new SuccessResponse('Admin created successfully', admin).send(res);
});

// Admin login
export const loginAdmin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Find admin by email
  const admin = await AdminModel.findOne({ email })
    .populate('role', 'roleId')
    .lean()
    .exec();
  if (!admin) {
    throw next(new NotFoundError(`Admin with ${email} not found`));
  }

  // Verify password
  const validPassword = await bcrypt.compare(password, admin.passwordHash);

  if (!validPassword) {
    throw next(new AuthFailureError(`Invalid password`));
  }

  // Create and send JWT token
  const { userPermissions, productPermissions } = admin.role;

  type Permission = { [key: string]: any };

  // Extract and filter permissions
  const filterPermissions = (
    permissions: Record<string, any>,
  ): Permission[] => {
    return Object.entries(permissions)
      .filter(([_, value]) => value)
      .map(([key, value]) => ({ [key]: value }));
  };

  const extractedUserPermissions = filterPermissions(userPermissions);
  const extractedProductPermissions = filterPermissions(productPermissions);

  // Create and send JWT token
  const token = generateToken({
    id: admin._id,
    userType: 'admin',
    userPermissions: extractedUserPermissions,
    productPermissions: extractedProductPermissions,
  });
  return new SuccessResponse('success', { token, admin }).send(res);
});

export const getAllAdmins = catchAsync(async (req, res, next) => {
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10; // default to 10 items per page
  const pageNo = parseInt(req.query.pageNo as string) || 1; // default to first page
  if (itemsPerPage < 1 || pageNo < 1)
    throw next(new BadRequestError('Invalid query params'));

  const admins = await AdminModel.find()
    .skip((pageNo - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .lean()
    .exec();

  if (!admins) {
    throw next(new InternalError('No admins found'));
  }
  return new SuccessResponse('success', { data: admins }).send(res);
});
export const getAdminById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const admin = await AdminModel.findById(id).populate('role').lean().exec();

  if (!admin) {
    throw next(new NotFoundError('Admin not found'));
  }

  return new SuccessResponse('success', { data: admin }).send(res);
});

export const updateAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const admin = await AdminModel.findByIdAndUpdate(id, req.body, { new: true })
    .lean()
    .exec();

  if (!admin) {
    throw next(new NotFoundError('Admin not found'));
  }

  return new SuccessResponse('Admin updated successfully', {
    data: admin,
  }).send(res);
});

export const deleteAdminById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const admin = await AdminModel.findByIdAndDelete(id).lean().exec();

  if (!admin) {
    throw next(new NotFoundError('Admin not found'));
  }

  return new SuccessResponse('success', {
    message: 'Admin deleted successfully',
  }).send(res);
});
