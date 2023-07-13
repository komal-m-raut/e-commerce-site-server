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
  const { email, phoneNo, password } = req.body;

  // Check if email or phone number is already registered
  const existingUser = await UserModel.findOne({
    $or: [{ email }, { phoneNo }],
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
  const user = await UserModel.findOneAndUpdate(
    {
      email,
      phoneNo,
    },
    {
      password: hashedPassword,
      isVerified: true,
    },
    { new: true },
  )
    .lean()
    .exec();

  return new SuccessResponse('success', user).send(res);
});

// User login
export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await UserModel.findOne({ email }).lean().exec();
  if (!user) {
    throw next(new NotFoundError(`User with ${email} not found`));
  }

  // Verify password
  const validPassword = await decrypt(password, user.password);

  if (!validPassword) {
    throw next(new AuthFailureError(`Invalid password`));
  }

  // Create and send JWT token
  const token = generateToken({ id: user._id });
  return new SuccessResponse('success', { token, user }).send(res);
});
