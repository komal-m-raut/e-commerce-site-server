import { SuccessResponse } from '../utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';
import { TenantModel } from '@src/model/tenant.model';
import {
  AuthFailureError,
  BadRequestError,
  NotFoundError,
} from '@src/utils/apiError';
import { decrypt, encrypt, generateToken } from '@src/services/auth.service';

// Get all tenants
export const getAllTenants = catchAsync(async (req, res, next) => {
  const itemsPerPage = Number(req.params.itemsPerPage) || 10;
  const pageCount = Number(req.params.pageCount) || 1;
  const skip = itemsPerPage * (pageCount - 1);
  const totalTenants = await TenantModel.countDocuments().exec();
  const tenants = await TenantModel.find()
    .skip(skip)
    .limit(itemsPerPage)
    .lean()
    .exec();

  if (!!tenants && tenants.length === 0) {
    throw next(new NotFoundError('No tenants found'));
  }

  const totalPages = Math.ceil(totalTenants / itemsPerPage);

  return new SuccessResponse('success', {
    tenants,
    totalPages,
    currentPage: pageCount,
    totalTenants,
  }).send(res);
});

// Get a single tenant
export const getTenant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const tenant = await TenantModel.findById(id).lean().exec();

  if (!tenant) {
    throw next(new NotFoundError(`Tenant with id ${id} not found`));
  }

  return new SuccessResponse('success', tenant).send(res);
});

// Tenant sign up
export const createTenant = catchAsync(async (req, res, next) => {
  const { email, phoneNo, password } = req.body;

  // Check if email or phone number is already registered
  const existingTenant = await TenantModel.findOne({
    $or: [{ email }, { phoneNo }],
    isVerified: true,
  })
    .lean()
    .exec();
  if (existingTenant) {
    throw next(
      new BadRequestError('Email or phone number is already registered'),
    );
  }

  // Hash password
  const hashedPassword = await encrypt(password);
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
export const loginTenant = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Find tenant by email
  const tenant = await TenantModel.findOne({ email }).lean().exec();
  if (!tenant) {
    throw next(new NotFoundError(`Tenant with ${email} not found`));
  }

  // Verify password
  const validPassword = await decrypt(password, tenant.password);

  if (!validPassword) {
    throw next(new AuthFailureError(`Invalid password`));
  }

  // Create and send JWT token
  const token = generateToken({ id: tenant._id });
  return new SuccessResponse('success', { token, tenant }).send(res);
});

// Update a tenant
export const updateTenant = catchAsync(async (req, res, next) => {
  const { decoded } = req.body;

  const tenant = await TenantModel.findByIdAndUpdate(decoded.id, req.body, {
    new: true,
  })
    .lean()
    .exec();

  if (!tenant) {
    throw next(new NotFoundError(`Tenant with id ${decoded.id} not found`));
  }

  return new SuccessResponse('success', tenant).send(res);
});

// Delete a tenant
export const deleteTenant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const tenant = await TenantModel.findByIdAndDelete(id).lean().exec();
  //TODO: Confirm, should we delete all products and associated details with this tenant
  if (!tenant) {
    throw next(new NotFoundError(`Tenant with id ${id} not found`));
  }

  return new SuccessResponse('success', {
    message: 'Tenant deleted successfully',
  }).send(res);
});
