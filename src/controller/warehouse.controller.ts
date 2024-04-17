import { WarehouseModel } from '@src/model/sub-company/warehouse.model';
import { InternalError, NotFoundError } from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';

export const createWarehouse = catchAsync(async (req, res, next) => {
  // Create product
  const newProduct = await WarehouseModel.create({
    ...req.body,
  });

  if (!newProduct) {
    throw next(new InternalError('Failed to create warehouse'));
  }
  // Send response
  return new SuccessResponse('Warehouse created', newProduct).send(res);
});

export const updateWarehouse = catchAsync(async (req, res, next) => {
  const { warehouseId } = req.params;
  const updateWarehouse = await WarehouseModel.findByIdAndUpdate(
    warehouseId,
    req.body,
    {
      new: true,
    },
  )
    .lean()
    .exec();

  if (!updateWarehouse) {
    throw next(new NotFoundError(`Warehouse with id ${warehouseId} not found`));
  }

  return new SuccessResponse('success', updateWarehouse).send(res);
});

export const getWarehouse = catchAsync(async (req, res, next) => {
  const { warehouseId } = req.params;

  const warehouse = await WarehouseModel.findById(warehouseId).lean().exec();

  if (!warehouse) {
    throw next(new NotFoundError(`Warehouse with id ${warehouseId} not found`));
  }

  return new SuccessResponse('success', warehouse).send(res);
});

export const getAllWarehouses = catchAsync(async (req, res, next) => {
  const itemsPerPage = Number(req.params.itemsPerPage) || 10;
  const pageCount = Number(req.params.pageCount) || 1;
  const skipCount = itemsPerPage * (pageCount - 1);
  const totalProducts = await WarehouseModel.countDocuments().exec();

  const warehouses = await WarehouseModel.find()
    .skip(skipCount)
    .limit(itemsPerPage)
    .lean()
    .exec();

  if (!warehouses || warehouses.length === 0) {
    throw next(new NotFoundError('No warehouse found'));
  }

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return new SuccessResponse('success', {
    warehouses,
    totalPages,
    currentPage: pageCount,
    totalProducts,
  }).send(res);
});

export const deleteWarehouse = catchAsync(async (req, res, next) => {
  const { warehouseId } = req.params;

  const warehouse = await WarehouseModel.findByIdAndDelete(warehouseId)
    .lean()
    .exec();

  if (!warehouse) {
    throw next(new NotFoundError(`Warehouse with id ${warehouseId} not found`));
  }

  return new SuccessResponse('success', {
    message: 'Warehouse deleted successfully',
  }).send(res);
});
