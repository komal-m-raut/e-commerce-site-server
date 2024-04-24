import Joi from 'joi';

export const createTenantWarehouseSchema = Joi.object({
  warehousePinCode: Joi.string().required(),
  gstinDetails: Joi.string().required(),
  warehouseAddress: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  warehouseEmail: Joi.string().email().required(),
  warehouseContact: Joi.string().required(),
  operationStartTime: Joi.string().required(),
  operationEndTime: Joi.string().required(),
  perDayOrderCapacity: Joi.number().required(),
});

export const updateTenantWarehouseSchema = Joi.object({
  warehousePinCode: Joi.string(),
  gstinDetails: Joi.string(),
  warehouseAddress: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  warehouseEmail: Joi.string().email(),
  warehouseContact: Joi.string(),
  operationStartTime: Joi.string(),
  operationEndTime: Joi.string(),
  perDayOrderCapacity: Joi.number(),
});
