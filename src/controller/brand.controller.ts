import { BrandModel } from '@src/model/sub-company/brand.model';
import {
  BadRequestError,
  InternalError,
  NotFoundError,
} from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';

export const createBrand = catchAsync(async (req, res, next) => {
  const { brandName } = req.body;

  // Check if brand with same name already exists
  const existingBrand = await BrandModel.findOne({ brandName }).lean().exec();
  if (existingBrand) {
    throw next(new BadRequestError('Brand with this name already exists'));
  }

  // Create new brand document
  const brand = await BrandModel.create({
    ...req.body,
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
  const totalBrands = await BrandModel.countDocuments().exec();

  const brands = await BrandModel.find()
    .skip(skipCount)
    .limit(itemsPerPage)
    .lean()
    .exec();

  if (!brands || brands.length === 0) {
    throw next(new NotFoundError('No brand found'));
  }

  const totalPages = Math.ceil(totalBrands / itemsPerPage);

  return new SuccessResponse('success', {
    brands,
    totalPages,
    currentPage: pageCount,
    totalBrands,
  }).send(res);
});

export const deleteBrand = catchAsync(async (req, res, next) => {
  const { brandId } = req.params;

  const deleteBrand = await BrandModel.findById(brandId).lean().exec();

  if (!deleteBrand) {
    throw next(new NotFoundError(`Brand with id ${brandId} not found`));
  }

  return new SuccessResponse('Brand deleted successfully', deleteBrand).send(
    res,
  );
});
