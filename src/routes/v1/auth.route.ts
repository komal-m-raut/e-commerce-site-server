import {
  createOtp,
  createPasswordResetLink,
  resendOtp,
  validateOtp,
  verifyPasswordResetLink,
} from '@src/controller/auth.controller';
import validate from '@src/middleware/validate';
import {
  createOtpSchema,
  createOtpTypeSchema,
  createPasswordResetLinkSchema,
  resendOtpSchema,
  validateOtpSchema,
  verifyPasswordResetLinkSchema,
} from '@src/validation/auth.validation';
import { Router } from 'express';
import { auth } from 'google-auth-library';

const authRouter = Router();

/**
 * @swagger
 * /v1/auth/create-otp/{type}:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Create a new OTP
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [email, phoneNo]
 *         description: The type of OTP to create (email or phoneNo)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userType
 *             properties:
 *               userType:
 *                 type: string
 *                 enum: [admin, tenant, user]
 *               phoneNo:
 *                 type: number
 *               email:
 *                 type: string
 *                 format: email
 *               userId:
 *                 type: string
 *                 format: objectId
 *                 description: User ID (optional)
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Failed to create OTP
 */

authRouter.post(
  '/create-otp/:type',
  validate({ body: createOtpSchema, params: createOtpTypeSchema }),
  createOtp,
);

/**
 * @swagger
 * /v1/auth/validate-otp:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Validate an OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *               - userType
 *               - userId
 *               - category
 *             properties:
 *               otp:
 *                 type: string
 *               userType:
 *                 type: string
 *                 enum: [admin, tenant, user]
 *               userId:
 *                 type: string
 *                 format: objectId
 *               category:
 *                 type: string
 *                 enum: [phoneNo, email]
 *     responses:
 *       200:
 *         description: OTP validated successfully
 *       400:
 *         description: OTP not found or Invalid OTP
 *       500:
 *         description: Failed to validate OTP
 */

authRouter.post(
  '/validate-otp',
  validate({ body: validateOtpSchema }),
  validateOtp,
);

/**
 * @swagger
 * /v1/auth/resend-otp/{type}:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Resend an OTP
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [email, phoneNo]
 *         description: The type of OTP to resend (email or phoneNo)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userType
 *               - userId
 *               - category
 *             properties:
 *               userType:
 *                 type: string
 *                 enum: [admin, tenant, user]
 *               userId:
 *                 type: string
 *                 format: objectId
 *               category:
 *                 type: string
 *                 enum: [phoneNo, email]
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNo:
 *                 type: integer
 *     responses:
 *       200:
 *         description: OTP resent successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Failed to resend OTP
 */
authRouter.post(
  '/resend-otp/:type',
  validate({ body: resendOtpSchema, params: createOtpTypeSchema }),
  resendOtp,
);

authRouter.post(
  '/create-password-reset-link',
  validate({ body: createPasswordResetLinkSchema }),
  createPasswordResetLink,
);

authRouter.post(
  '/verify-password-reset-link',
  validate({ body: verifyPasswordResetLinkSchema }),
  verifyPasswordResetLink,
);

export default authRouter;
