import Joi from 'joi';

export const createTenantCompanySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  aadhaarNumber: Joi.string()
    .length(12)
    .pattern(/^[0-9]+$/)
    .messages({
      'string.length': `Aadhaar Number should have an exact length of 12`,
      'string.pattern.base': `Aadhaar Number should only contain digits`,
    }),
  aadhaarCard: Joi.string(),
});

export const updateTenantCompanySchema = Joi.object({
  description: Joi.string(),
  aadhaarNumber: Joi.string()
    .length(12)
    .pattern(/^[0-9]+$/)
    .messages({
      'string.length': `Aadhaar Number should have an exact length of 12`,
      'string.pattern.base': `Aadhaar Number should only contain digits`,
    }),
  aadhaarCard: Joi.string(),
});

export const verifyGstSchema = Joi.object({
  gstin: Joi.string().required(),
});

export const updateBasicInfoSchema = Joi.object({
  businessOwnerName: Joi.string(),
  address: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  pincode: Joi.string(),
  businessModel: Joi.string(),
  businessOwnerEmail: Joi.string().email(),
  businessOwnerContact: Joi.string(),
  panNumber: Joi.string(),
  primaryContactName: Joi.string(),
  primaryEmailId: Joi.string().email(),
  primaryContactNumber: Joi.string(),
});

export const organizationDetailsSchema = Joi.object({
  registeredCompanyName: Joi.string(),
  gstin: Joi.string(),
  panNumber: Joi.string(),
  registeredCompanyAddress: Joi.string(),
  city: Joi.string(),
  pincode: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  gstCertificate: Joi.string(),
  organizationEmail: Joi.string().email(),
  organizationContact: Joi.string(),
  businessOwnerName: Joi.string(),
  businessOwnerEmail: Joi.string().email(),
  businessOwnerContact: Joi.string(),
  panNumber: Joi.string(),
  businessModel: Joi.string(),
});

export const updateBankingInfoSchema = Joi.object({
  accountHolderName: Joi.string(),
  accountNumber: Joi.string(),
  ifscCode: Joi.string(),
  bankName: Joi.string(),
  accountType: Joi.string(),
  cheque: Joi.string(),
});
