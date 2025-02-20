import catchAsync from '@src/utils/catchAsync';
import OtpModel from '@src/model/otp.model';
import { SuccessMsgResponse, SuccessResponse } from '@src/utils/apiResponse';
import { AdminModel, IAdmin } from '@src/model/admin.model';
import { ITenant, TenantModel } from '@src/model/tenant.model';
import { IUser, UserModel } from '@src/model/user.model';
import { Model } from 'mongoose';
import {
  decrypt,
  encrypt,
  generateToken,
  getHashedOtp,
} from '@src/services/auth.service';
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
export const createOtp = catchAsync(async (req, res, next) => {
  const { phoneNo, email, userType, userId } = req.body;
  const { type } = req.params as { type: 'phoneNo' | 'email' };
  const user = userTypeModel[
    userType as keyof typeof userTypeModel
  ] as Model<IModel>;
  let currUser = await user.findById(userId).lean().exec();

  if (currUser) {
    if (currUser[type]) {
      return new SuccessResponse(
        `${currUser[type]} already verified for this userId`,
        {
          userId: currUser._id,
        },
      ).send(res);
    }
  } else {
    currUser = await user.create({});
  }

  const { otp, hashedOtp } = await getHashedOtp();

  const existingOtp = await OtpModel.findOne({
    userId: currUser._id,
    userType,
    category: type,
  }).exec();

  if (existingOtp) {
    // Delete the existing OTP if the email has been corrected
    if (existingOtp.otpFor !== req.body[type]) {
      await OtpModel.deleteOne({ _id: existingOtp._id });
    } else {
      return new SuccessResponse('OTP already sent', {
        userId: currUser._id,
      }).send(res);
    }
  }

  if (type === 'phoneNo') {
    //TODO: add msg service once available
    const mailOptions = {
      recipients: [
        {
          to: [{ name: '', email: 'nothingmeyaar@gmail.com' }],
          variables: {
            company_name: 'Moreshop',
            otp,
          },
        },
      ],
      templateType: 'otp' as const,
    };

    // await sendMail(mailOptions, next);

    console.log('otp', otp);
    await OtpModel.create({
      userId: currUser._id,
      userType,
      otp: hashedOtp,
      category: type,
      otpFor: req.body[type],
    });
  } else {
    const mailOptions = {
      recipients: [
        {
          to: [{ name: '', email }],
          variables: {
            company_name: 'Moreshop',
            otp,
          },
        },
      ],
      templateType: 'otp' as const,
    };
    // await sendMail(mailOptions, next);

    console.log('otp', otp);
    await OtpModel.create({
      userId: currUser._id,
      userType,
      otp: hashedOtp,
      category: type,
      otpFor: req.body[type],
    });
  }

  return new SuccessResponse('OTP sent successfully', {
    userId: currUser._id,
    otp
  }).send(res);
});

export const validateOtp = catchAsync(async (req, res) => {
  const { userType, userId, category, otp } = req.body;

  console.log('otp', otp, userType, userId);
  // find the OTP document
  const existingOtp = await OtpModel.findOne(
    { userType, userId, category },
    {
      otp: 1,
      category: 1,
      otpFor: 1,
    },
  ).exec();

  console.log(existingOtp, 'existing');
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

export const resendOtp = catchAsync(async (req, res, next) => {
  const { phoneNo, email, userType, userId } = req.body;
  const { type } = req.params;

  await OtpModel.deleteOne({
    userId,
    userType,
    category: type,
  }).exec();

  const { otp, hashedOtp } = await getHashedOtp();

  // Save the new OTP

  if (type === 'phoneNo') {
    //TODO: add msg service once available
    const mailOptions = {
      recipients: [
        {
          to: [{ name: '', email: 'nothingmeyaar@gmail.com' }],
          variables: {
            company_name: 'Moreshop',
            otp,
          },
        },
      ],
      templateType: 'otp' as const,
    };

    await sendMail(mailOptions, next);

    console.log('otp', otp);
    await OtpModel.create({
      userId: userId,
      userType,
      otp: hashedOtp,
      category: type,
      otpFor: req.body[type],
    });
  } else {
    const mailOptions = {
      recipients: [
        {
          to: [{ name: '', email }],
          variables: {
            company_name: 'Moreshop',
            otp,
          },
        },
      ],
      templateType: 'otp' as const,
    };
    await sendMail(mailOptions, next);

    console.log('otp', otp);
    await OtpModel.create({
      userId: userId,
      userType,
      otp: hashedOtp,
      category: type,
      otpFor: req.body[type],
    });
  }

  return new SuccessResponse('OTP resent successfully', {
    userId,
  }).send(res);
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
  //TODO: Fix this
  // await sendMail(mailOptions);

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
