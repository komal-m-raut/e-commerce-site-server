import { CompanyModel } from '@src/model/tenantCompany.model';
import { BadRequestError, NotFoundError } from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';

export const createTenantCompany = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const ownerId = req.body.decoded.id;

  // Check if company with the same name is already registered by the owner
  const existingCompany = await CompanyModel.findOne({
    name,
    owner: ownerId,
  })
    .lean()
    .exec();
  if (existingCompany) {
    throw next(
      new BadRequestError(
        'Company with this name is already registered by the owner',
      ),
    );
  }

  // Create new company
  const company = await CompanyModel.create({
    name,
    owner: ownerId,
  });

  return new SuccessResponse('success', company).send(res);
});

export const updateTenantCompany = catchAsync(async (req, res, next) => {
  const updates = req.body;
  const companyId = req.params.id;

  //TODO:Optimize this code

  // Determine the path from the URL
  let path;
  let updateObject: { [key: string]: any } = {};
  if (req.originalUrl.includes('company-basic-details')) {
    path = 'basicInfo';
    updateObject[path] = updates;
  } else if (req.originalUrl.includes('company-banking-details')) {
    path = 'bankingInfo';
    updateObject[path] = updates;
  } else if (req.originalUrl.includes('/update-company')) {
    updateObject = updates;
  } else {
    throw next(new Error('Invalid path'));
  }

  // Find the company and update it
  const company = await CompanyModel.findByIdAndUpdate(
    companyId,
    updateObject,
    {
      new: true,
      runValidators: true,
    },
  )
    .lean()
    .exec();

  if (!company) {
    throw next(new NotFoundError('Company not found'));
  }

  return new SuccessResponse('Company updated successfully', company).send(res);
});
