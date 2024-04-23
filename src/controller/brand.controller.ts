import { BrandModel } from '@src/model/sub-company/brand.model';
import {
  BadRequestError,
  InternalError,
  NotFoundError,
} from '@src/utils/apiError';
import { SuccessMsgResponse, SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';

export const createBrand = catchAsync(async (req, res, next) => {
  const { brandName, decoded } = req.body;
  const tenantId = decoded.id;
  // Check if brand with same name already exists within the same tenant
  const existingBrand = await BrandModel.findOne({ brandName, tenantId })
    .lean()
    .exec();
  if (existingBrand) {
    throw next(
      new BadRequestError(
        'Brand with this name already exists for this tenant',
      ),
    );
  }

  // Create new brand document
  const brand = await BrandModel.create({
    ...req.body,
    tenantId,
    userType: 'tenant',
  });

  if (!brand) {
    throw next(new InternalError('Failed to create brand'));
  }

  // Return success response
  return new SuccessResponse('Brand created successfully', brand).send(res);
});

export const updateBrand = catchAsync(async (req, res, next) => {
  const { brandId } = req.params;
  const updateBrand = await BrandModel.findByIdAndUpdate(brandId, req.body, {
    new: true,
  })
    .lean()
    .exec();

  if (!updateBrand) {
    throw next(new NotFoundError(`Brand with id ${brandId} not found`));
  }

  return new SuccessResponse('Brand updated successfully', updateBrand).send(
    res,
  );
});

export const getBrand = catchAsync(async (req, res, next) => {
  const { brandId } = req.params;

  const brand = await BrandModel.findById(brandId).lean().exec();

  if (!brand) {
    throw next(new NotFoundError(`Brand with id ${brandId} not found`));
  }

  return new SuccessResponse('Brand retrieved successfully', brand).send(res);
});

export const getAllBrands = catchAsync(async (req, res, next) => {
  const itemsPerPage = Number(req.params.itemsPerPage) || 10;
  const pageCount = Number(req.params.pageCount) || 1;
  const skipCount = itemsPerPage * (pageCount - 1);
  const tenantId = req.params.tenantId; // or req.body.tenantId, depending on where you're getting it from

  const totalBrands = await BrandModel.countDocuments({ tenantId }).exec();

  const brands = await BrandModel.find({ tenantId })
    .skip(skipCount)
    .limit(itemsPerPage)
    .lean()
    .exec();

  if (!brands || brands.length === 0) {
    throw next(new NotFoundError('No brand found'));
  }

  return new SuccessResponse('success', {
    brands,
    currentPage: pageCount,
    totalBrands,
  }).send(res);
});

export const deleteBrand = catchAsync(async (req, res, next) => {
  const { brandId } = req.params;

  const brand = await BrandModel.findByIdAndUpdate(
    brandId,
    { isDisabled: true },
    { new: true, runValidators: true },
  )
    .lean()
    .exec();

  if (!brand) {
    throw next(new NotFoundError(`Brand with id ${brandId} not found`));
  }

  return new SuccessMsgResponse('Brand disabled successfully').send(res);
});
