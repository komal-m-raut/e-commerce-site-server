import { SuccessMsgResponse, SuccessResponse } from '../utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';
import { TenantModel } from '@src/model/tenant.model';
import {
  AuthFailureError,
  BadRequestError,
  InternalError,
  NoDataError,
  NotFoundError,
} from '@src/utils/apiError';
import { decrypt, encrypt, generateToken } from '@src/services/auth.service';
import { TenantBrandModel } from '@src/model/sub-company/tenantBrand.model';
import { TenantWarehouseModel } from '@src/model/sub-company/tenantWarehouse.model';

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

  return new SuccessResponse('success', {
    tenants,
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
  const { email, phoneNo, name, password, role } = req.body;

  // Check if email or phoneNo is already registered
  const existingTenant = await TenantModel.findOne({
    $or: [{ email }, { phoneNo }],
  })
    .lean()
    .exec();
  if (existingTenant) {
    throw next(new BadRequestError('Email or Phone is already registered'));
  }

  // Hash password
  const hashedPassword = await encrypt(password);

  // Create new tenant
  const newTenant = await TenantModel.create({
    email,
    phoneNo,
    name,
    password: hashedPassword,
    role,
  });

  if (!newTenant) {
    throw next(new InternalError('Tenant creation failed'));
  }

  return new SuccessMsgResponse('Tenant created successfully').send(res);
});

export const loginTenant = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Find tenant by email
  const tenant = await TenantModel.findOne({ email })
    .populate('role', 'userPermissions productPermissions')
    .lean()
    .exec();

  if (!tenant) {
    throw next(new NotFoundError(`Tenant with ${email} not found`));
  }

  // Verify password
  const validPassword = await decrypt(password, tenant.password);

  if (!validPassword) {
    throw next(new AuthFailureError(`Invalid password`));
  }

  // Extract user and product permissions
  const { userPermissions, productPermissions } = tenant.role;

  // Extract and filter permissions
  const filterPermissions = (
    permissions: Record<string, any>,
  ): Record<string, any> => {
    return Object.entries(permissions)
      .filter(([_, value]) => value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  };

  const extractedUserPermissions = filterPermissions(userPermissions);
  const extractedProductPermissions = filterPermissions(productPermissions);

  // Create and send JWT token
  const token = generateToken({
    id: tenant._id,
    userType: 'tenant',
    userPermissions: extractedUserPermissions,
    productPermissions: extractedProductPermissions,
  });

  return new SuccessResponse('success', { token, tenant }).send(res);
});

// Update a tenant
export const updateTenant = catchAsync(async (req, res, next) => {
  const { decoded } = req.body;
  const brandData = {
    brandName: req.body.brandName,
    catalogueDetails: req.body.catalogueDetails,
    brandLogo: req.body.brandLogo,
    documentOfProof: req.body.documentOfProof,
    categories: req.body.categories,
    countryOrigin: req.body.countryOrigin,
    website: req.body.website,
  };
  const newBrand = await TenantBrandModel.create(brandData);
  if (!newBrand) {
    throw next(new NoDataError(`Failed to create brand`));
  }
  const warehouseData = {
    warehouseName: req.body.warehouseName,
    warehousePinCode: req.body.warehousePinCode,
    gstinDetails: req.body.gstinDetails,
    warehouseAddress: req.body.warehouseAddress,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    warehouseEmail: req.body.warehouseEmail,
    warehouseContact: req.body.warehouseContact,
    operationStartTime: req.body.operationStartTime,
    operationEndTime: req.body.operationEndTime,
    perDayOrderCapacity: req.body.perDayOrderCapacity,
    warehouseManager: req.body.warehouseManager,
  };

  const newWarehouse = await TenantWarehouseModel.create(warehouseData);
  if (!newBrand) {
    throw next(new NoDataError(`Failed to create warehouse`));
  }

  const tenant = await TenantModel.findByIdAndUpdate(
    decoded.id,
    {
      ...req.body,
      warehouseInfo: newWarehouse,
      brandInfo: newBrand,
    },
    {
      new: true,
    },
  )
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

//*Miscellaneous

export const homeSection = catchAsync(async (req, res, next) => {
  const { id } = req.body.params;
  const homeSection = {
    preset: req.body.preset,
    headerTemplate: req.body.headerTemplate,
    navTemplate: req.body.navTemplate,
    sections: req.body.sections,
  };
  const updatedTenant = await TenantModel.findByIdAndUpdate(
    id,
    { customHomeSection: homeSection },
    { new: true },
  ).exec();
  if (!updatedTenant) {
    throw next(new NotFoundError(`Tenant with id ${id} not found`));
  }
  return new SuccessResponse('success', {
    message: 'Home section created successfully',
    updatedTenant,
  }).send(res);
});

export const createMarketingPage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const newMarketingPage = await TenantModel.findByIdAndUpdate(
    id,
    { marketingPages: [req.body] },
    { new: true },
  ).exec();
  if (!newMarketingPage) {
    throw next(new NotFoundError(`Tenant with id ${id} not found`));
  }
  return new SuccessResponse('success', {
    message: 'Marketing page created successfully',
    newMarketingPage,
  }).send(res);
});

export const updateMarketingPage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { marketingPageId, updatedData } = req.body;
  const tenant = await TenantModel.findById(id).exec();
  if (!tenant) {
    throw next(new NotFoundError(`Tenant with id ${id} not found`));
  }
  const marketingPageIndex = tenant.marketingPages.findIndex(
    (page) => page._id === marketingPageId,
  );
  if (marketingPageIndex === -1) {
    throw next(
      new NotFoundError(`Marketing page with id ${marketingPageId} not found`),
    );
  }
  tenant.marketingPages[marketingPageIndex] = {
    ...tenant.marketingPages[marketingPageIndex],
    ...updatedData,
  };
  await tenant.save();
  return new SuccessResponse('success', {
    message: 'Marketing page updated successfully',
    tenant,
  }).send(res);
});

// export const deleteMarketingPage = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const { marketingPageId } = req.body;
//   const deletedMarketingPage = await TenantModel.findByIdAndUpdate(
//     id,
//     { $pull: { marketingPages: { _id: marketingPageId } } },
//     { new: true },
//   ).exec();
//   if (!deletedMarketingPage) {
//     throw next(new NotFoundError(`Tenant with id ${id} not found`));
//   }
//   return new SuccessResponse('success', {
//     message: 'Marketing page deleted successfully',
//     deletedMarketingPage,
//   }).send(res);
// });
