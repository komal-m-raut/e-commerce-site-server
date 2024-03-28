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

export const updateTenantSchema = Joi.object({
  businessInfo: Joi.object({
    gstin: Joi.string(),
    pan: Joi.string(),
    businessName: Joi.string(),
    businessOwnerName: Joi.string(),
    businessModel: Joi.string(),
    natureOfBusiness: Joi.string(),
    tryyonForPlannet: Joi.string(),
    yearsOfOperation: Joi.number(),
    avgMrp: Joi.number(),
    avgSellingPrice: Joi.number(),
    avgMonthlyTurnover: Joi.number(),
    percentageOfOnlineBusiness: Joi.number(),
  }),
  contactInfo: Joi.object({
    businessOwnerEmail: Joi.string().email(),
    businessOwnerContact: Joi.string(),
    organizationEmail: Joi.string().email(),
    organizationContact: Joi.string(),
    primaryEmailId: Joi.string().email(),
    primaryContactName: Joi.string(),
    primaryContactNumber: Joi.string(),
  }),
  warehouseInfo: Joi.object({
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
  }),
  bankingInfo: Joi.object({
    accountHolderName: Joi.string(),
    accountNumber: Joi.string(),
    ifscCode: Joi.string(),
    accountType: Joi.string(),
    bankName: Joi.string(),
    bankLocation: Joi.string(),
    cheque: Joi.string(),
  }),
  brandInfo: Joi.object({
    brandName: Joi.string(),
    catalogueDetails: Joi.string(),
    brandLogo: Joi.string(),
    documentOfProof: Joi.string(),
    rootCategory: Joi.string(),
    mainCategory: Joi.string(),
  }),
});

export const homeSectionSchema = Joi.object({
  preset: Joi.string().required(),
  headerTemplate: Joi.string().required(),
  navTemplate: Joi.string().required(),
  sections: Joi.array()
    .items(
      Joi.object({
        cardTemplate: Joi.string().required(),
        heading: Joi.string().required(),
        cards: Joi.array()
          .items(
            Joi.object({
              cssProperties: Joi.object().required(),
            }),
          )
          .required(),
      }),
    )
    .required(),
});

export const marketingPageSchema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().required(),
  html: Joi.string().required(),
  status: Joi.string().valid('active', 'inactive').required(),
  seo: Joi.object({
    title: Joi.string().required(),
    keywords: Joi.array().items(Joi.string()).required(),
    description: Joi.string().required(),
  }).required(),
});

export const marketingPageUpdateSchema = Joi.object({
  marketingPageId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .label('Valid MongoDB ObjectID'),
  updatedData: Joi.object({
    title: Joi.string(),
    slug: Joi.string(),
    html: Joi.string(),
    status: Joi.string().valid('active', 'inactive'),
    seo: Joi.object({
      title: Joi.string(),
      keywords: Joi.array().items(Joi.string()),
      description: Joi.string(),
    }),
  }),
});
