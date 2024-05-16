import { CouponsModel } from '@src/model/coupon.model';
import { BadRequestError, NotFoundError } from '@src/utils/apiError';
import { SuccessMsgResponse, SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';

export const createCoupon = catchAsync(async (req, res, next) => {
  const { code, decoded } = req.body;

  const decodedId = decoded.id;

  // Check if the coupon code is already in use
  const existingCoupon = await CouponsModel.findOne({ code }).exec();
  if (existingCoupon) {
    throw next(new BadRequestError('Coupon code is already in use'));
  }

  // Prepare the coupon data
  const couponData = { ...req.body, code };

  // Add tenantId or supplierId based on userType
  if (decoded.userType === 'tenant') {
    couponData.tenantId = decodedId;
  } else if (decoded.userType === 'supplier') {
    couponData.supplierId = decodedId;
  }

  const coupon = await CouponsModel.create(couponData);

  if (!coupon) {
    throw next(new BadRequestError('Failed to create coupon'));
  }

  return new SuccessResponse('Coupon created successfully', {
    coupon,
  }).send(res);
});

// Update Coupon
export const updateCoupon = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateFields = req.body;

  // Check if the coupon id exists
  const updatedCoupon = await CouponsModel.findOneAndUpdate(
    { _id: id },
    { $set: updateFields },
    { new: true },
  ).exec();

  if (!updatedCoupon) {
    throw next(new BadRequestError('Coupon with provided id does not exist'));
  }

  return new SuccessMsgResponse('Coupon updated successfully').send(res);
});
// Create new coupon

//Get all active coupons based on userType
export const getAllCoupons = catchAsync(async (req, res, next) => {
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10; // default to 10 items per page
  const pageNo = parseInt(req.query.pageNo as string) || 1; // default to first page

  if (itemsPerPage < 1 || pageNo < 1)
    throw next(new BadRequestError('Invalid query params'));

  const skip = itemsPerPage * (pageNo - 1);
  const decodedId = req.body.decoded.id;

  const query = {
    $or: [{ tenantId: decodedId }, { supplierId: decodedId }],
    isActive: true,
    isDeleted: false,
  };

  const totalCoupons = await CouponsModel.countDocuments(query).exec();
  const coupons = await CouponsModel.find(query)
    .skip(skip)
    .limit(itemsPerPage)
    .lean()
    .exec();

  if (!!coupons && coupons.length === 0) {
    throw next(new NotFoundError('No coupons found'));
  }

  return new SuccessResponse('success', {
    coupons,
    currentPage: pageNo,
    totalCoupons,
  }).send(res);
});

// Get a single coupon
export const getCouponById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const coupon = await CouponsModel.findOne({ id }).lean().exec();
  if (!coupon) {
    throw next(new NotFoundError(`Coupon with id ${id} not found`));
  }

  return new SuccessResponse('success', coupon).send(res);
});

// Delete coupon
export const deleteCoupon = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedCoupon = await CouponsModel.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true },
  ).exec();
  if (!deletedCoupon) {
    throw next(new NotFoundError(`Coupon with id ${id} not found`));
  }

  return new SuccessMsgResponse('Coupon deleted successfully').send(res);
});
