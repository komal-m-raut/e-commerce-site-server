import Joi from 'joi';
import { validateObjectId } from './common.validation';

export const createTenantWarehouseSchema = Joi.object({
  companyId: validateObjectId().required(),
  warehousePinCode: Joi.string(),
  gstinDetails: Joi.string().required(),
  warehouseAddress: Joi.string().required(),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  warehouseEmail: Joi.string().email().required(),
  warehouseContact: Joi.string().required(),
  operationStartTime: Joi.string(),
  operationEndTime: Joi.string(),
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
