import {
  createOtp,
  createPasswordResetLink,
  validateOtp,
  verifyPasswordResetLink,
} from '@src/controller/auth.controller';
import validate from '@src/middleware/validate';
import {
  createOtpSchema,
  createOtpTypeSchema,
  createPasswordResetLinkSchema,
  validateOtpSchema,
  verifyPasswordResetLinkSchema,
} from '@src/validation/auth.validation';
import { Router } from 'express';

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

//TODO: Add resend otp api

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
 *             properties:
 *               otp:
 *                 type: string
 *               userType:
 *                 type: string
 *                 enum: [admin, tenant, user]
 *               userId:
 *                 type: string
 *                 format: objectId
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
