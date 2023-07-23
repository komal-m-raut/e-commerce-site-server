// Import necessary modules and dependencies
import Joi from 'joi';

// Validation schema for user registration
export const registerUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNo: Joi.number().required(),
  password: Joi.string().min(6).required(),
});

// Validation schema for user login
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  shippingAddresses: Joi.array().items(
    Joi.object({
      streetAddress: Joi.string(),
      landMark: Joi.string(),
      pinCode: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      addressType: Joi.string().valid('Home', 'Work'),
    }),
  ),
  phoneNumber: Joi.string(),
  billingAddress: Joi.string(),
  paymentMethods: Joi.array().items(
    Joi.object({
      cardholderName: Joi.string(),
      cardNumber: Joi.string(),
      cardExpiryDate: Joi.string(),
      cardCVV: Joi.string(),
    }),
  ),
  wishlistProducts: Joi.array().items(Joi.string()),
  cart: Joi.array().items(
    Joi.object({
      productId: Joi.string(),
      quantity: Joi.number(),
    }),
  ),
});

export const userIdSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .label('Valid MongoDB ObjectID'),
});

export const wishlistSchema = Joi.object({
  productId: Joi.string().required(),
});

export const cartSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
});
