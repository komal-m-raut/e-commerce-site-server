import { SuccessMsgResponse, SuccessResponse } from '../utils/apiResponse';
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
  const itemsPerPage = Number(req.query.itemsPerPage) || 10;
  const pageCount = Number(req.query.pageCount) || 1;
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

  // Check if email and phoneNo is already verified
  const existingTenant = await TenantModel.findOne({
    email,
    phoneNo,
  }).populate('role').exec();
  if (!existingTenant) {
    throw next(new BadRequestError('Email or Phone is not verified yet'));
  }

  // Hash password
  const hashedPassword = await encrypt(password);

  const updatedTenant = await TenantModel.findOneAndUpdate(
    { _id: existingTenant._id },
    { password: hashedPassword, name, role },
    { new: true },
  )
    .lean()
    .exec();

  if (!updatedTenant) {
    throw next(new BadRequestError('No tenant found with this id'));
  }

  // Populate role after successful update
  const { userPermissions, productPermissions } = updatedTenant.role;

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
    id: updatedTenant._id,
    userType: 'tenant',
    userPermissions: extractedUserPermissions,
    productPermissions: extractedProductPermissions,
  });

  return new SuccessResponse('Tenant updated successfully', {
    token,
    tenant: updatedTenant,
  }).send(res);
});

export const createTenantPassword = catchAsync(async (req, res, next) => {
  const { userId, name, password } = req.body;

  // Check if email and phoneNo is already verified
  const tenant = await TenantModel.findById(userId).populate('role').exec();
  if (!tenant?.email || !tenant?.phoneNo) {
    throw next(new BadRequestError('Email or Phone is not verified yet'));
  }

  if (tenant.password) {
    throw next(new BadRequestError('Password already exists'));
  }

  // Hash password
  const hashedPassword = await encrypt(password);

  const updatedTenant = await TenantModel.findOneAndUpdate(
    { _id: tenant._id },
    { password: hashedPassword, name },
    { new: true },
  )
    .lean()
    .exec();

  // Populate role after successful update
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

  return new SuccessResponse('Tenant updated successfully', {
    token,
    tenant: updatedTenant,
  }).send(res);
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
  const { id } = req.params;
  const updateData = req.body;

  const tenant = await TenantModel.findByIdAndUpdate(id, updateData, {
    new: true,
  })
    .lean()
    .exec();

  if (!tenant) {
    throw next(new NotFoundError(`Tenant with id ${id} not found`));
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

//*Domain

export const updateTenantDomain = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { domain } = req.body;

  const tenant = await TenantModel.findByIdAndUpdate(
    id,
    { domain },
    { new: true },
  )
    .lean()
    .exec();

  if (!tenant) {
    throw next(new NotFoundError(`Tenant with id ${id} not found`));
  }

  return new SuccessMsgResponse('Domain added successfully').send(res);
});

//*Miscellaneous

export const homeSection = catchAsync(async (req, res, next) => {
  const { id } = req.params; // Change this line
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
  console.log(marketingPageId,"id");
  const tenant = await TenantModel.findById(id).exec();
  if (!tenant) {
    throw next(new NotFoundError(`Tenant with id ${id} not found`));
  }
  const marketingPageIndex = tenant.marketingPages.findIndex(
    (page) => page._id.toString() === marketingPageId,
  );
  console.log(marketingPageIndex,"index");
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
