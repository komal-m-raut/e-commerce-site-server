import { TenantModel } from '@src/model/tenant.model';
import { ForbiddenError, NoDataError, NotFoundError } from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';
import {
  createRazorPayOrder,
  verifyRazorPaySignature,
} from '@src/utils/paymentGateway';

export const createOrder = catchAsync(async (req, res, next) => {
  const { amount, currency, receipt } = req.body;

  const order = await createRazorPayOrder(amount, currency, receipt);

  if (!order) {
    throw next(new NoDataError(`Order not created`));
  }

  return new SuccessResponse('success', order).send(res);
});

export const verifyOrder = catchAsync(async (req, res, next) => {
  const { orderId, paymentId, decoded, roleId } = req.body;
  const signature = req.headers['x-razorpay-signature'];

  if (typeof signature !== 'string') {
    throw next(new ForbiddenError(`Invalid signature`));
  }

  const isValid = verifyRazorPaySignature(orderId, paymentId, signature);

  if (!isValid) {
    throw next(new NotFoundError(`Order not found or invalid`));
  }

  // Assuming `decoded` contains the tenant's id
  const tenantId = decoded.id;
  // Update the tenant's role in the database
  const tenant = await TenantModel.findByIdAndUpdate(
    tenantId,
    {
      role: roleId,
    },
    { new: true },
  );

  if (!tenant) {
    throw next(new NotFoundError(`Tenant not found`));
  }
  return new SuccessResponse('success', { tenant }).send(res);
});
