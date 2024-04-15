import { Router } from 'express';
import {
  createAdminSchema,
  loginSchema,
  updateAdminSchema,
} from '@src/validation/admin.validation';
import validate from '@src/middleware/validate';
import {
  createAdmin,
  deleteAdminById,
  getAdminById,
  getAllAdmins,
  loginAdmin,
  updateAdmin,
} from '@src/controller/admin.controller';
import authMiddleware from '@src/middleware/auth';
import { idSchema } from '@src/validation/common.validation';

export const adminRouter: Router = Router();

//*POST ROUTE

/**
 * @swagger
 * /v1/admin/create:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Register a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - firstName
 *               - lastName
 *               - phoneNo
 *               - email
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 description: The admin's username.
 *               firstName:
 *                 type: string
 *                 description: The admin's first name.
 *               lastName:
 *                 type: string
 *                 description: The admin's last name.
 *               phoneNo:
 *                 type: number
 *                 description: The admin's phone number.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The admin's email.
 *               password:
 *                 type: string
 *                 description: The admin's password.
 *               role:
 *                 type: string
 *                 description: The admin's role.
 *     responses:
 *       200:
 *         description: Admin registered successfully
 *       400:
 *         description: Admin with this Email is already registered
 *       500:
 *         description: Failed to create admin
 */

adminRouter.post('/create', validate({ body: createAdminSchema }), createAdmin);

/**
 * @swagger
 * /v1/admin/login:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Login an admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The admin's email.
 *               password:
 *                 type: string
 *                 description: The admin's password.
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Failed to login admin
 */
adminRouter.post('/login', validate({ body: loginSchema }), loginAdmin);

//*GET ROUTE

/**
 * @swagger
 * /v1/admin/:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all admins
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: itemsPerPage
 *         schema:
 *           type: number
 *         required: false
 *         description: Number of items per page
 *       - in: query
 *         name: pageNo
 *         schema:
 *           type: number
 *         required: false
 *         description: Page number
 *     responses:
 *       200:
 *         description: Admins fetched successfully
 *       400:
 *         description: Invalid query params
 *       404:
 *         description: No admins found
 *       500:
 *         description: Failed to fetch admins
 */
adminRouter.get('/', authMiddleware(2), getAllAdmins); //This is paginated route pass itemsPerPage & pageNo from query params

/**
 * @swagger
 * /v1/admin/{adminId}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get admin by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: adminId
 *         in: path
 *         required: true
 *         description: Admin ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admin fetched successfully
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Failed to fetch admin
 */

adminRouter.get(
  '/:id',
  authMiddleware(2),
  validate({ params: idSchema }),
  getAdminById,
);

//*PATCH ROUTE

/**
 * @swagger
 * /v1/admin/{adminId}:
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Update admin information
 *     parameters:
 *       - name: adminId
 *         in: path
 *         required: true
 *         description: Admin ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNo:
 *                 type: number
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Failed to update admin
 */
adminRouter.patch(
  '/:id',
  validate({ body: updateAdminSchema, params: idSchema }),
  updateAdmin,
);

//*DELETE ROUTE

/**
 * @swagger
 * /v1/admin/{adminId}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete admin by ID
 *     parameters:
 *       - name: adminId
 *         in: path
 *         required: true
 *         description: Admin ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Failed to delete admin
 */
adminRouter.delete('/:id', validate({ params: idSchema }), deleteAdminById);
