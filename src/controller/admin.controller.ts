import { AdminModel } from '@src/model/admin.model';
import {
  BadRequestError,
  InternalError,
  NotFoundError,
} from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';
import bcrypt from 'bcrypt';

export const getAllAdmins = catchAsync(async (_req, res, next) => {
  const admins = await AdminModel.find().lean().exec();

  if (!admins) {
    throw next(new InternalError('No admins found'));
  }
  return new SuccessResponse('success', { data: admins }).send(res);
});

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
  const admin = new AdminModel({
    ...req.body,
    password: passwordHash,
  });

  // Save admin document to database
  await admin.save();

  // Return success response
  return new SuccessResponse('Admin created successfully', {
    data: admin,
  }).send(res);
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
