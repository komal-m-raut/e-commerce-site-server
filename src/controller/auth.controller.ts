import catchAsync from '@src/utils/catchAsync';
import OtpModel from '@src/model/otp.model';
import { SuccessMsgResponse, SuccessResponse } from '@src/utils/apiResponse';
import { AdminModel, IAdmin } from '@src/model/admin.model';
import { ITenant, TenantModel } from '@src/model/tenant.model';
import { IUser, UserModel } from '@src/model/user.model';
import { Model } from 'mongoose';
import { decrypt, encrypt, generateToken } from '@src/services/auth.service';
import { sendMail } from '@src/utils/sendMail';
import { NotFoundError } from '@src/utils/apiError';

const userTypeModel: {
  admin: Model<IAdmin>;
  tenant: Model<ITenant>;
  user: Model<IUser>;
} = {
  admin: AdminModel,
  tenant: TenantModel,
  user: UserModel,
};

type IModel = IAdmin | ITenant | IUser;
export const createOtp = catchAsync(async (req, res) => {
  const { phoneNo, email, userType, userId } = req.body;
  const { type } = req.params;
  const user = userTypeModel[
    userType as keyof typeof userTypeModel
  ] as Model<IModel>;
  let currUser = await user
    .findOne({
      $or: [{ _id: userId }, { phoneNo }, { email }],
    })
    .lean()
    .exec();
  if (!currUser) {
    currUser = await user.create({});
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // Encrypt OTP using bcrypt
  console.log('otp', otp);
  const hashedOtp = await encrypt(otp);

  const newOtp = await OtpModel.create({
    userId: currUser._id,
    userType,
    otp: hashedOtp,
    category: type,
    otpFor: req.body[type],
    expiresAt: new Date(Date.now() + 30 * 60 * 1000),
  });

  if (type === 'phone') {
    // const message = `Your OTP for authentication is ${otp}. It is valid for 15 minutes.`;
    // await sendSms(phoneNo, message);
  } else {
    // mail otp
  }

  return new SuccessResponse('OTP sent successfully', newOtp).send(res);
});

export const validateOtp = catchAsync(async (req, res) => {
  const { userType, userId, otp } = req.body;

  // find the OTP document
  const existingOtp = await OtpModel.findOne({ userType, userId }, {})
    .select('+otp category otpFor')
    .exec();

  if (!existingOtp) {
    return res.status(400).json({ message: 'OTP not found' });
  }

  // compare the provided OTP with the hashed OTP in the database
  const isMatch = await decrypt(otp, existingOtp.otp);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }
  const user = userTypeModel[
    userType as keyof typeof userTypeModel
  ] as Model<IModel>;
  await user
    .findByIdAndUpdate(userId, { [existingOtp.category]: existingOtp.otpFor })
    .lean()
    .exec();
  // delete the OTP document
  await existingOtp.delete();

  return new SuccessMsgResponse('OTP validated successfully').send(res);
});

export const createPasswordResetLink = catchAsync(async (req, res, next) => {
  const { email, userType } = req.body;
  const user = userTypeModel[
    userType as keyof typeof userTypeModel
  ] as Model<IModel>;
  // find user with the given email
  const currUser = await user
    .findOne({ email }, { _id: 1, role: 1 })
    .populate('role', 'roleId')
    .exec();

  if (!currUser) {
    throw next(new NotFoundError(`${userType} with email ${email} not found`));
  }

  // generate a new reset token
  const resetToken = generateToken({
    userId: currUser._id,
    userType,
    roleId: currUser?.role.roleId,
  });

  // send the reset link to the user's email address
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?resetToken=${resetToken}`;

  const mailOptions = {
    to: email,
    subject: 'Password reset link',
    html: `<h1>Here is your password reset link: ${resetLink}</h1>`,
    text: `Here is your password reset link: ${resetLink}`,
  };

  await sendMail(mailOptions);

  return new SuccessMsgResponse('Password reset link sent successfully').send(
    res,
  );
});

export const verifyPasswordResetLink = catchAsync(async (req, res, next) => {
  const { decoded, newPassword } = req.body;
  const user = userTypeModel[
    decoded.userType as keyof typeof userTypeModel
  ] as Model<IModel>;
  const hashedPassword = await encrypt(newPassword);
  const updatedUser = await user
    .findByIdAndUpdate(
      decoded.userId,
      { password: hashedPassword },
      { new: true },
    )
    .lean()
    .exec();
  return new SuccessResponse('success', updatedUser).send(res);
});
