import { Request, Response } from 'express';
import { SuccessResponse } from '../utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';
import { TenantModel } from '@src/model/tenant.model';
import { NotFoundError } from '@src/utils/apiError';

// Get all tenants
export const getAllTenants = catchAsync(
  async (_req: Request, res: Response) => {
    const tenants = await TenantModel.find().lean().exec();

    if (!tenants || tenants.length === 0) {
      throw new NotFoundError('No tenants found');
    }

    return new SuccessResponse('success', { data: tenants }).send(res);
  },
);

// Get a single tenant
export const getTenant = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const tenant = await TenantModel.findById(id).lean().exec();

  if (!tenant) {
    throw new NotFoundError(`Tenant with id ${id} not found`);
  }

  return new SuccessResponse('success', { data: tenant }).send(res);
});

// Create a new tenant
export const createTenant = catchAsync(async (req: Request, res: Response) => {
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

  const tenant = new TenantModel({
    name,
    description,
    companyId,
    Associations: associations,
    Product: product,
    SKU: sku,
    Location: location,
    productImports,
    ApiKey: apiKey,
  });

  await tenant.save();

  return new SuccessResponse('success', { data: tenant }).send(res);
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
