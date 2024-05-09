import { UserModel } from '@src/model/user.model';
import { decrypt, encrypt, generateToken } from '@src/services/auth.service';
import {
  AuthFailureError,
  BadRequestError,
  NotFoundError,
} from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';

// User sign up
export const createUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  // Check if email or phone number is already registered
  const existingUser = await UserModel.findOne({
    $or: [{ email }, { phoneNumber }],
    isVerified: true,
  })
    .lean()
    .exec();
  if (existingUser) {
    throw next(
      new BadRequestError(
        'User with this Email or phone number is already registered',
      ),
    );
  }

  // Hash password
  const hashedPassword = await encrypt(password);
  const user = await UserModel.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password: hashedPassword,
  });
  if (!user) {
    throw next(new NotFoundError('Failed to create user'));
  }
  return new SuccessResponse('success', user).send(res);
});

// User login
export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await UserModel.findOne({ email })
    .populate('role', 'userPermissions productPermissions')
    .lean()
    .exec();

  if (!user) {
    throw next(new NotFoundError(`User with ${email} not found`));
  }

  // Verify password
  const validPassword = await decrypt(password, user.password);

  if (!validPassword) {
    throw next(new AuthFailureError(`Invalid password`));
  }

  const { userPermissions, productPermissions } = user.role;
  // Create and send JWT token
  const filterPermissions = (
    permissions: Record<string, any>,
  ): Record<string, any> => {
    return Object.entries(permissions)
      .filter(([_, value]) => value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  };

  const extractedUserPermissions = filterPermissions(userPermissions);
  const extractedProductPermissions = filterPermissions(productPermissions);

  // Create and send JWT token
  const token = generateToken({
    id: user._id,
    userType: 'user',
    userPermissions: extractedUserPermissions,
    productPermissions: extractedProductPermissions,
  });  return new SuccessResponse('success', { token, user }).send(res);
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
    new: true,
    lean: true,
  }).exec();
  if (!updatedUser) {
    throw next(new NotFoundError(`User with Id: ${userId} not found`));
  }
  return new SuccessResponse('User updated successfully', { updatedUser }).send(
    res,
  );
});

export const updateWishlist = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { productId } = req.body;
  const user = await UserModel.findById(userId).exec();
  if (!user) {
    throw next(new NotFoundError(`User with Id: ${userId} not found`));
  }
  const productIndex = user.wishlistProducts.indexOf(productId);
  if (productIndex !== -1) {
    // Product found in wishlist, remove it
    user.wishlistProducts.splice(productIndex, 1);
  } else {
    // Product not found in wishlist, add it
    user.wishlistProducts.push(productId);
  }

  // Save the updated user document
  await user.save();
  return new SuccessResponse('Wishlist updated successfully', user).send(res);
});

export const updateCart = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { productId, quantity = 1 } = req.body;
  const user = await UserModel.findById(userId).exec();
  if (!user) {
    throw next(new NotFoundError(`User with Id: ${userId} not found`));
  }
  // Find the product in the cart
  const cartItem = user.cart.find(
    (item) => item.productId.toString() === productId,
  );
  if (cartItem) {
    // Product found in cart, update the quantity
    cartItem.quantity = quantity;
  } else {
    // Product not found in cart, add it
    user.cart.push({ productId, quantity });
  }
  // Save the updated user document
  await user.save();
  return new SuccessResponse('Cart  updated successfully', user).send(res);
});
