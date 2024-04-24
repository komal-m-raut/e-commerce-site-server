import { TenantWarehouseModel } from '@src/model/sub-company/tenantWarehouse.model';
import { BadRequestError, InternalError, NotFoundError } from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';

export const createTenantWarehouse = catchAsync(async (req, res, next) => {
  const { warehouseName, companyId } = req.body;

  // Check if warehouse with same name already exists within the same tenant
  const existingWarehouse = await TenantWarehouseModel.findOne({ warehouseName, companyId })
    .lean()
    .exec();

  if (existingWarehouse) {
    throw next(
      new BadRequestError(
        'Warehouse with this name already exists for this company',
      ),
    );
  }

  // Create new warehouse document
  const warehouse = await TenantWarehouseModel.create({
    ...req.body,
    companyId,
  });

  if (!warehouse) {
    throw next(new InternalError('Failed to create warehouse'));
  }

  // Return success response
  return new SuccessResponse('Warehouse created successfully', warehouse).send(res);
});

export const updateWarehouse = catchAsync(async (req, res, next) => {
  const { warehouseId } = req.params;
  const updateWarehouse = await TenantWarehouseModel.findByIdAndUpdate(
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

  const warehouse = await TenantWarehouseModel.findById(warehouseId).lean().exec();

  if (!warehouse) {
    throw next(new NotFoundError(`Warehouse with id ${warehouseId} not found`));
  }

  return new SuccessResponse('success', warehouse).send(res);
});

export const getAllWarehouses = catchAsync(async (req, res, next) => {
  const itemsPerPage = Number(req.params.itemsPerPage) || 10;
  const pageCount = Number(req.params.pageCount) || 1;
  const skipCount = itemsPerPage * (pageCount - 1);
  const totalProducts = await TenantWarehouseModel.countDocuments().exec();

  const warehouses = await TenantWarehouseModel.find()
    .skip(skipCount)
    .limit(itemsPerPage)
    .lean()
    .exec();

  if (!warehouses || warehouses.length === 0) {
    throw next(new NotFoundError('No warehouse found'));
  }

  return new SuccessResponse('success', {
    warehouses,
    currentPage: pageCount,
    totalProducts,
  }).send(res);
});

export const deleteWarehouse = catchAsync(async (req, res, next) => {
  const { warehouseId } = req.params;

  const warehouse = await TenantWarehouseModel.findByIdAndDelete(warehouseId)
    .lean()
    .exec();

  if (!warehouse) {
    throw next(new NotFoundError(`Warehouse with id ${warehouseId} not found`));
  }

  return new SuccessResponse('success', {
    message: 'Warehouse deleted successfully',
  }).send(res);
});
