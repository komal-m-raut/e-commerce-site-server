import Joi from 'joi';

export const createTenantCompanySchema = Joi.object({
  name: Joi.string().required(),
});

export const updateBasicInfoSchema = Joi.object({
  primaryContactName: Joi.string(),
  primaryEmailId: Joi.string().email(),
  primaryContactNumber: Joi.string(),
  organizationEmail: Joi.string().email(),
  organizationContact: Joi.string(),
  businessOwnerName: Joi.string(),
  businessOwnerEmail: Joi.string().email(),
  businessOwnerContact: Joi.string(),
  panNumber: Joi.string(),
  businessModel: Joi.string(),
});

export const updateBusinessInfoSchema = Joi.object({
  gstin: Joi.string().required(),
  pan: Joi.string().required(),
  businessName: Joi.string().required(),
  businessOwnerName: Joi.string().required(),
  businessModel: Joi.string().required(),
  natureOfBusiness: Joi.string().required(),
  tryyonForPlanet: Joi.string().required(),
  yearsOfOperation: Joi.number().required(),
  avgMrp: Joi.number().required(),
  avgSellingPrice: Joi.number().required(),
  avgMonthlyTurnover: Joi.number().required(),
  percentageOfOnlineBusiness: Joi.number().required(),
});

export const updateBankingInfoSchema = Joi.object({
  accountHolderName: Joi.string(),
  accountNumber: Joi.string(),
  ifscCode: Joi.string(),
  bankName: Joi.string(),
  accountType: Joi.string(),
  cheque: Joi.string(),
});
