import Joi from 'joi';

export const loginTenantSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const createTenantSchema = Joi.object({
  email: Joi.string().email().required(),
  phoneNo: Joi.number().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    )
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required',
      'string.min': 'Password must have at least {{#limit}} characters',
      'any.required': 'Password is required',
      'string.pattern.base':
        'Password must contain at least 1 symbol, 1 lowercase letter, 1 uppercase letter and 1 number',
    }),
});

// Joi validation schema for Tenant update
export const updateTenantSchema = Joi.object({
  phoneNo: Joi.number().optional(),
  countryCode: Joi.number().optional(),
  email: Joi.string().email().optional(),
  isVerified: Joi.boolean().optional(),
  password: Joi.string().optional(),
  gstin: Joi.string().optional(),
  gstinVerified: Joi.boolean().optional(),
  primaryName: Joi.string().optional(),
  ownersName: Joi.string().optional(),
  primaryEmail: Joi.string().email().optional(),
  ownersEmail: Joi.string().email().optional(),
  ownersPhone: Joi.string().optional(),
  primaryPhone: Joi.string().optional(),
  businessModel: Joi.string().optional(),
  osmType: Joi.string().optional(),
  accountHolder: Joi.string().optional(),
  accountNumber: Joi.string().optional(),
  accountType: Joi.string().optional(),
  ifsc: Joi.string().optional(),
  bank: Joi.string().optional(),
  cheque: Joi.string().optional(),
  totalWarehouse: Joi.number().optional(),
  warehouse: Joi.array()
    .items(
      Joi.object({
        warehousePincode: Joi.string().optional(),
        WarehouseGstin: Joi.string().optional(),
        WarehouseGstinVerified: Joi.boolean().optional(),
        warehouseAddress: Joi.string().optional(),
        warehouseCity: Joi.string().optional(),
        warehouseState: Joi.string().optional(),
        warehouseCountry: Joi.string().optional(),
        warehouseEmail: Joi.string().optional(),
        warehousePhone: Joi.string().optional(),
        startTimings: Joi.string().optional(),
        endTimings: Joi.string().optional(),
        processingCapacity: Joi.string().optional(),
      }),
    )
    .optional(),
  totalBrands: Joi.number().optional(),
  brand: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().optional(),
        logo: Joi.string().optional(),
        catalogue: Joi.string().optional(),
        natureOfBusiness: Joi.string().optional(),
        document: Joi.string().optional(),
        averageMrp: Joi.string().optional(),
        averageSp: Joi.string().optional(),
        averageTurnover: Joi.string().optional(),
        onlinePercentage: Joi.string().optional(),
        yearsOfOperation: Joi.string().optional(),
        tryyonForEarth: Joi.string().optional(),
        primaryCategory: Joi.string().optional(),
        secondaryCategory: Joi.string().optional(),
      }),
    )
    .optional(),
  declared: Joi.boolean().optional(),
});
