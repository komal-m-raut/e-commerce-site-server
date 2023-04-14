import bcrypt from 'bcrypt';
import catchAsync from '@src/utils/catchAsync';
import OtpModel from '@src/model/otp.model';
import { SuccessMsgResponse, SuccessResponse } from '@src/utils/apiResponse';
import { AdminModel, IAdmin } from '@src/model/admin.model';
import { ITenant, TenantModel } from '@src/model/tenant.model';
import { IUser, UserModel } from '@src/model/user.model';
import { BadRequestError } from '@src/utils/apiError';
import { Model } from 'mongoose';

const saltRounds = 10;

const userTypeModel: {
  admin: Model<IAdmin>;
  tenant: Model<ITenant>;
  user: Model<IUser>;
} = {
  admin: AdminModel,
  tenant: TenantModel,
  user: UserModel,
};

export const createOtp = catchAsync(async (req, res, _next) => {
  const { phoneNo, email, userType } = req.body;
  const { type } = req.params;
  const user = userTypeModel[userType as keyof typeof userTypeModel] as Model<
    IAdmin | ITenant | IUser
  >;
  let currUser = await user
    .findOne({
      $or: [{ phoneNo }, { email }],
    })
    .lean()
    .exec();
  if (!currUser) {
    currUser = await user.create({ phoneNo, email });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // Encrypt OTP using bcrypt
  console.log('otp', otp);
  const hashedOtp = await bcrypt.hash(otp, saltRounds);

  const newOtp = await OtpModel.create({
    userId: currUser._id,
    userType,
    otp: hashedOtp,
    category: type,
    otpFor: req.body[type],
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
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
  const isMatch = await bcrypt.compare(otp, existingOtp.otp);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }
  const user = userTypeModel[userType as keyof typeof userTypeModel] as Model<
    IAdmin | ITenant | IUser
  >;
  await user
    .findByIdAndUpdate(userId, { [existingOtp.category]: existingOtp.otpFor })
    .lean()
    .exec();
  // delete the OTP document
  await existingOtp.delete();

  return new SuccessMsgResponse('OTP validated successfully').send(res);
});
