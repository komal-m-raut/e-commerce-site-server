import { AdminModel } from '@src/model/admin.model';
import {
  AuthFailureError,
  BadRequestError,
  InternalError,
  NotFoundError,
} from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '@src/config/config';
import { decrypt } from '@src/services/auth.service';

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

  console.log("req.body :", req.body);
  console.log("email:", email);
  console.log("password:", password);

  // Find admin by email
  const admin = await AdminModel.findOne({ email }).lean().exec();
  console.log("admin :", admin)
  if (!admin) {
    throw next(new NotFoundError(`Admin with ${email} not found`));
  }

  console.log("admin.passwordHash: ", admin.passwordHash);

  console.log("password :", password);

  // Verify password
  const validPassword = await decrypt(password, admin.passwordHash);

  if (!validPassword) {
    throw next(new AuthFailureError(`Invalid password`));
  }

  // Create and send JWT token
  const token = jwt.sign({ _id: admin._id }, config.jwt.secret, {
    expiresIn: config.jwt.accessExpirationMinutes,
  });
  return new SuccessResponse('success', { token, admin }).send(res);
});

export const getAllAdmins = catchAsync(async (_req, res, next) => {
  const admins = await AdminModel.find().lean().exec();
  console.log("admin :", _req)

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
