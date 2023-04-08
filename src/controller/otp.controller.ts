import bcrypt from 'bcrypt';
import catchAsync from '@src/utils/catchAsync';
import OtpModel from '@src/model/otp.model';
import { SuccessMsgResponse, SuccessResponse } from '@src/utils/apiResponse';
import { AdminModel } from '@src/model/admin.model';
import { TenantModel } from '@src/model/tenant.model';
import { UserModel } from '@src/model/user.model';
import { BadRequestError } from '@src/utils/apiError';

const saltRounds = 10;

export const createOtp = catchAsync(async (req, res, next) => {
  const { phoneNo, email, userType } = req.body;

  let user;
  switch (userType) {
    case 'admin':
      user = await AdminModel.findOne({
        $or: [{ phoneNo }, { email }],
      })
        .lean()
        .exec();
      if (!user) {
        user = await AdminModel.create({ phoneNo, email });
      }
      break;
    case 'tenant':
      user = await TenantModel.findOne({
        $or: [{ phoneNo }, { email }],
      })
        .lean()
        .exec();
      if (!user) {
        user = await TenantModel.create({ phoneNo, email });
      }
      break;
    case 'user':
      user = await UserModel.findOne({
        $or: [{ phoneNo }, { email }],
      })
        .lean()
        .exec();
      if (!user) {
        user = await UserModel.create({ phoneNo, email });
      }
      break;
    default:
      throw next(new BadRequestError('Invalid userType'));
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // Encrypt OTP using bcrypt
  console.log('otp', otp);
  const hashedOtp = await bcrypt.hash(otp, saltRounds);

  const newOtp = await OtpModel.create({
    userId: user._id,
    userType,
    otp: hashedOtp,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  });

  // const message = `Your OTP for authentication is ${otp}. It is valid for 15 minutes.`;
  // await sendSms(phoneNo, message);

  return new SuccessResponse('OTP sent successfully', newOtp).send(res);
});

export const validateOtp = catchAsync(async (req, res) => {
  const { userType, userId, otp } = req.body;

  // find the OTP document
  const existingOtp = await OtpModel.findOne({ userType, userId })
    .select('+otp')
    .exec();

  if (!existingOtp) {
    return res.status(400).json({ message: 'OTP not found' });
  }

  // compare the provided OTP with the hashed OTP in the database
  const isMatch = await bcrypt.compare(otp, existingOtp.otp);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  // delete the OTP document
  await existingOtp.delete();

  return new SuccessMsgResponse('OTP validated successfully').send(res);
});
