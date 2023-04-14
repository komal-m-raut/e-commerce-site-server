import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { SuccessResponse } from '../utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';
import { TenantModel } from '@src/model/tenant.model';
import {
  AuthFailureError,
  BadRequestError,
  NotFoundError,
} from '@src/utils/apiError';
import jwt from 'jsonwebtoken';
import config from '@src/config/config';

const saltRounds = 10;

// Get all tenants
export const getAllTenants = catchAsync(async (_req, res) => {
  const tenants = await TenantModel.find().lean().exec();
  if (!tenants || tenants.length === 0) {
    throw new NotFoundError('No tenants found');
  }
  return new SuccessResponse('success', tenants).send(res);
});

// Get a single tenant
export const getTenant = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const tenant = await TenantModel.findById(id).lean().exec();

  if (!tenant) {
    throw new NotFoundError(`Tenant with id ${id} not found`);
  }

  return new SuccessResponse('success', { data: tenant }).send(res);
});

// Tenant sign up
export const createTenant = catchAsync(async (req, res) => {
  const { email, phoneNo, password } = req.body;

  // Check if email or phone number is already registered
  const existingTenant = await TenantModel.findOne({
    $or: [{ email }, { phoneNo }],
    isVerified: true,
  })
    .lean()
    .exec();
  if (existingTenant) {
    throw new BadRequestError('Email or phone number is already registered');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const tenant = await TenantModel.findOneAndUpdate(
    {
      email,
      phoneNo,
    },
    {
      password: hashedPassword,
      isVerified: true,
    },
    { new: true },
  )
    .lean()
    .exec();

  return new SuccessResponse('success', tenant).send(res);
});

// Tenant login
export const loginTenant = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Find tenant by email
  const tenant = await TenantModel.findOne({ email }).lean().exec();
  if (!tenant) {
    throw new NotFoundError(`Tenant with ${email} not found`);
  }

  // Verify password
  const validPassword = await bcrypt.compare(password, tenant.password);

  if (!validPassword) {
    throw new AuthFailureError(`Invalid password`);
  }

  // Create and send JWT token
  const token = jwt.sign({ _id: tenant._id }, config.jwt.secret, {
    expiresIn: config.jwt.accessExpirationMinutes,
  });
  return new SuccessResponse('success', { token, tenant }).send(res);
});

// Update a tenant
export const updateTenant = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    description,
    companyId,
    associations,
    product,
    sku,
    location,
    productImports,
    apiKey,
  } = req.body;

  const tenant = await TenantModel.findByIdAndUpdate(
    id,
    {
      name,
      description,
      companyId,
      Associations: associations,
      Product: product,
      SKU: sku,
      Location: location,
      productImports,
      ApiKey: apiKey,
    },
    { new: true },
  )
    .lean()
    .exec();

  if (!tenant) {
    throw new NotFoundError(`Tenant with id ${id} not found`);
  }

  return new SuccessResponse('success', { data: tenant }).send(res);
});

// Delete a tenant
export const deleteTenant = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const tenant = await TenantModel.findByIdAndDelete(id).lean().exec();

  if (!tenant) {
    throw new NotFoundError(`Tenant with id ${id} not found`);
  }

  return new SuccessResponse('success', {
    message: 'Tenant deleted successfully',
  }).send(res);
});
