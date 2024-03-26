import { CareInstructionsModel } from '@src/model/sub-settings/careInstructions.model';
import { ExchangeRefundModel } from '@src/model/sub-settings/exchangeRefund.model';
import { FaqModel } from '@src/model/sub-settings/faq.model';
import { ProductIncludesModel } from '@src/model/sub-settings/productIncludes.model';
import { BadRequestError, InternalError } from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';

//*Post controller

export const createCareInstructions = catchAsync(async (req, res, next) => {
  const { decoded } = req.body;

  const careInstructions = await CareInstructionsModel.create({
    ...req.body,
    tenant: decoded.id,
  }).catch(() => {
    throw next(
      new BadRequestError('Care instructions with this name already exists'),
    );
  });

  return new SuccessResponse('Care instructions created successfully', {
    data: careInstructions,
  }).send(res);
});

export const createExchangeRefund = catchAsync(async (req, res, next) => {
  const { decoded } = req.body;

  const exchangeRefund = await ExchangeRefundModel.create({
    ...req.body,
    tenant: decoded.id,
  }).catch(() => {
    throw next(
      new BadRequestError('Exchange refund with this name already exists'),
    );
  });

  return new SuccessResponse('Exchange refund created successfully', {
    data: exchangeRefund,
  }).send(res);
});

export const createFaq = catchAsync(async (req, res, next) => {
  const { decoded } = req.body;

  const faq = await FaqModel.create({
    ...req.body,
    tenant: decoded.id,
  }).catch(() => {
    throw next(new BadRequestError('FAQ with this question already exists'));
  });

  return new SuccessResponse('FAQ created successfully', { data: faq }).send(
    res,
  );
});

export const createProductIncludes = catchAsync(async (req, res, next) => {
  const { decoded } = req.body;

  const productIncludes = await ProductIncludesModel.create({
    ...req.body,
    tenant: decoded.id,
  }).catch(() => {
    throw next(
      new BadRequestError('Product includes with this name already exists'),
    );
  });

  return new SuccessResponse('Product includes created successfully', {
    data: productIncludes,
  }).send(res);
});

//*Get controller

export const getAllCareInstruction = catchAsync(async (req, res, next) => {
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10; // default to 10 items per page
  const pageNo = parseInt(req.query.pageNo as string) || 1; // default to first page
  const { decoded } = req.body;

  if (itemsPerPage < 1 || pageNo < 1)
    throw next(new BadRequestError('Invalid query params'));

  const careInstructions = await CareInstructionsModel.find({
    tenant: decoded.id,
  })
    .skip((pageNo - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .lean()
    .exec();

  if (!careInstructions) {
    throw next(new InternalError('No care instructions found'));
  }

  return new SuccessResponse(
    'Care instructions fetched successfully',
    careInstructions,
  ).send(res);
});

export const getAllExchangeRefund = catchAsync(async (req, res, next) => {
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10; // default to 10 items per page
  const pageNo = parseInt(req.query.pageNo as string) || 1; // default to first page
  const { decoded } = req.body;

  if (itemsPerPage < 1 || pageNo < 1)
    throw next(new BadRequestError('Invalid query params'));

  const exchangeRefunds = await ExchangeRefundModel.find({
    tenant: decoded.id,
  })
    .skip((pageNo - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .lean()
    .exec();

  if (!exchangeRefunds) {
    throw next(new InternalError('No exchange refunds found'));
  }

  return new SuccessResponse(
    'Exchange refunds fetched successfully',
    exchangeRefunds,
  ).send(res);
});

export const getAllFaq = catchAsync(async (req, res, next) => {
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10; // default to 10 items per page
  const pageNo = parseInt(req.query.pageNo as string) || 1; // default to first page
  const { decoded } = req.body;

  if (itemsPerPage < 1 || pageNo < 1)
    throw next(new BadRequestError('Invalid query params'));

  const faqs = await FaqModel.find({ tenant: decoded.id })
    .skip((pageNo - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .lean()
    .exec();

  if (!faqs) {
    throw next(new InternalError('No faqs found'));
  }

  return new SuccessResponse('FAQs fetched successfully', faqs).send(res);
});

export const getAllProductIncludes = catchAsync(async (req, res, next) => {
  const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10; // default to 10 items per page
  const pageNo = parseInt(req.query.pageNo as string) || 1; // default to first page
  const { decoded } = req.body;

  if (itemsPerPage < 1 || pageNo < 1)
    throw next(new BadRequestError('Invalid query params'));

  const productIncludes = await ProductIncludesModel.find({
    tenant: decoded.id,
  })
    .skip((pageNo - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .lean()
    .exec();

  if (!productIncludes) {
    throw next(new InternalError('No product includes found'));
  }

  return new SuccessResponse(
    'Product includes fetched successfully',
    productIncludes,
  ).send(res);
});

//*Patch controller

export const updateCareInstructions = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { decoded } = req.body;

  const careInstructions = await CareInstructionsModel.findByIdAndUpdate(
    { _id: id, tenant: decoded.id },
    req.body,
    { new: true },
  )
    .lean()
    .exec();

  if (!careInstructions) {
    throw next(new InternalError('Care instructions not found'));
  }

  return new SuccessResponse(
    'Care instructions updated successfully',
    careInstructions,
  ).send(res);
});

export const updateExchangeRefund = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { decoded } = req.body;

  const exchangeRefund = await ExchangeRefundModel.findByIdAndUpdate(
    { _id: id, tenant: decoded.id },
    req.body,
    { new: true },
  )
    .lean()
    .exec();

  if (!exchangeRefund) {
    throw next(new InternalError('Exchange refund not found'));
  }

  return new SuccessResponse(
    'Exchange refund updated successfully',
    exchangeRefund,
  ).send(res);
});

export const updateFaq = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { decoded } = req.body;

  const faq = await FaqModel.findByIdAndUpdate(
    { _id: id, tenant: decoded.id },
    req.body,
    { new: true },
  )
    .lean()
    .exec();

  if (!faq) {
    throw next(new InternalError('FAQ not found'));
  }

  return new SuccessResponse('FAQ updated successfully', faq).send(res);
});

export const updateProductIncludes = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { decoded } = req.body;

  const productIncludes = await ProductIncludesModel.findByIdAndUpdate(
    { _id: id, tenant: decoded.id },
    req.body,
    { new: true },
  )
    .lean()
    .exec();

  if (!productIncludes) {
    throw next(new InternalError('Product includes not found'));
  }

  return new SuccessResponse(
    'Product includes updated successfully',
    productIncludes,
  ).send(res);
});

//*Delete controller

export const deleteCareInstructionById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { decoded } = req.body;

  const careInstructions = await CareInstructionsModel.findOneAndDelete({
    _id: id,
    tenant: decoded.id,
  }).lean();

  if (!careInstructions) {
    throw next(new InternalError('Care instructions not found'));
  }

  return new SuccessResponse(
    'Care instructions deleted successfully',
    careInstructions,
  ).send(res);
});

export const deleteExchangeRefundById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { decoded } = req.body;

  const exchangeRefund = await ExchangeRefundModel.findOneAndDelete({
    _id: id,
    tenant: decoded.id,
  }).lean();

  if (!exchangeRefund) {
    throw next(new InternalError('Exchange refund not found'));
  }

  return new SuccessResponse(
    'Exchange refund deleted successfully',
    exchangeRefund,
  ).send(res);
});

export const deleteFaqById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { decoded } = req.body;

  const faq = await FaqModel.findOneAndDelete({
    _id: id,
    tenant: decoded.id,
  }).lean();

  if (!faq) {
    throw next(new InternalError('FAQ not found'));
  }

  return new SuccessResponse('FAQ deleted successfully', faq).send(res);
});

export const deleteProductIncludesById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { decoded } = req.body;

  const productIncludes = await ProductIncludesModel.findOneAndDelete({
    _id: id,
    tenant: decoded.id,
  }).lean();

  if (!productIncludes) {
    throw next(new InternalError('Product includes not found'));
  }

  return new SuccessResponse(
    'Product includes deleted successfully',
    productIncludes,
  ).send(res);
});
