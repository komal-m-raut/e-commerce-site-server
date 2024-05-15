import { CouponsModel } from '@src/model/coupon.model';
import { BadRequestError, NotFoundError } from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';

export const createCoupon = catchAsync(async (req, res, next) => {
  const { code, decoded } = req.body;

  const decodedId = decoded.id;

  // Check if the coupon code is already in use
  const existingCoupon = await CouponsModel.findOne({ code }).exec();
  if (existingCoupon) {
    throw next(new BadRequestError('Coupon code is already in use'));
  }

  // Create new coupon
  let coupon = new CouponsModel({
    code,
    tenantId: decoded.userType === 'tenant' ? decodedId : undefined,
    supplierId: decoded.userType === 'supplier' ? decodedId : undefined,
  });

  coupon = await coupon.save();

  if (!coupon) {
    throw next(new BadRequestError('Failed to create coupon'));
  }

  return new SuccessResponse('Coupon created successfully', {
    coupon,
  }).send(res);
});

// Update Coupon
export const updateCoupon = catchAsync(async (req, res, next) => {
  const { code, ...updateFields } = req.body;

  // Check if the coupon code is already in use
  const updatedCoupon = await CouponsModel.findOneAndUpdate(
    { code },
    { $set: updateFields },
    { new: true },
  ).exec();

  if (!updatedCoupon) {
    throw next(new BadRequestError('Coupon code does not exist'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      coupon: updatedCoupon,
    },
  });
});
// Create new coupon

//Get all coupons
export const getAllCoupons = catchAsync(async (req, res, next) => {
  const itemsPerPage = Number(req.params.itemsPerPage) || 10;
  const pageCount = Number(req.params.pageCount) || 1;
  const skip = itemsPerPage * (pageCount - 1);
  const totalCoupons = await CouponsModel.countDocuments().exec();
  const coupons = await CouponsModel.find()
    .skip(skip)
    .limit(itemsPerPage)
    .lean()
    .exec();

  if (!!coupons && coupons.length === 0) {
    throw next(new NotFoundError('No coupons found'));
  }

  return new SuccessResponse('success', {
    coupons,
    currentPage: pageCount,
    totalCoupons,
  }).send(res);
});

// Get a single coupon
export const getCoupon = catchAsync(async (req, res, next) => {
  const { code } = req.params;

  const coupon = await CouponsModel.findOne({ code }).lean().exec();
  if (!coupon) {
    throw next(new NotFoundError(`Coupon with code ${code} not found`));
  }

  return new SuccessResponse('success', coupon).send(res);
});

// Delete coupon
export const deleteCoupon = catchAsync(async (req, res, next) => {
  const { code } = req.params;

  const deletedCoupon = await CouponsModel.findOneAndUpdate(
    { code },
    { isDeleted: true },
    { new: true },
  ).exec();
  if (!deletedCoupon) {
    throw next(new NotFoundError(`Coupon with code ${code} not found`));
  }

  return new SuccessResponse('Coupon deleted successfully', {
    coupon: deletedCoupon,
  }).send(res);
});
