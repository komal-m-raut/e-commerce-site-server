import { createBrand } from '@src/controller/brand.controller';
import {
  createMarketingPage,
  createTenant,
  deleteTenant,
  getAllTenants,
  getTenant,
  homeSection,
  loginTenant,
  updateMarketingPage,
  updateTenant,
} from '@src/controller/tenant.controller';
import { createWarehouse } from '@src/controller/warehouse.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import { createBrandSchema } from '@src/validation/brand.validation';
import { idSchema } from '@src/validation/common.validation';
import {
  createTenantSchema,
  homeSectionSchema,
  loginTenantSchema,
  marketingPageSchema,
  marketingPageUpdateSchema,
  updateTenantSchema,
} from '@src/validation/tenant.validation';
import { createWarehouseSchema } from '@src/validation/warehouse.validation';
import { Router } from 'express';

const tenantRouter: Router = Router();

//*POST ROUTE
tenantRouter.post(
  '/register',
  validate({ body: createTenantSchema }),
  createTenant,
);
tenantRouter.post('/login', validate({ body: loginTenantSchema }), loginTenant);
tenantRouter.post(
  '/home-section/:id',
  validate({ body: homeSectionSchema, params: idSchema }),
  homeSection,
);
tenantRouter.post(
  '/marketing-page/:id',
  validate({ body: marketingPageSchema, params: idSchema }),
  createMarketingPage,
);

//*GET ROUTE
tenantRouter.get(
  '/',
  authMiddleware(
    {
      userPermissions: [
        { createProduct: true },
        { editProduct: true },
        { deleteProduct: true },
        { productDetailReport: true },
      ],
      productPermissions: [{ salesReports: true }],
    },
    0,
  ),
  getAllTenants,
);

tenantRouter.get(
  '/:id',
  authMiddleware(
    {
      userPermissions: [],
      productPermissions: [],
    },
    0,
  ),
  getTenant,
);

//*PATCH ROUTE
tenantRouter.patch(
  '/:id',
  authMiddleware({ userPermissions: [], productPermissions: [] }, 0),
  validate({ body: updateTenantSchema, params: idSchema }),
  updateTenant,
);

tenantRouter.patch(
  '/home-section/:id',
  validate({ body: homeSectionSchema, params: idSchema }),
  homeSection,
);

tenantRouter.patch(
  '/marketing-page/:id',
  validate({ body: marketingPageUpdateSchema, params: idSchema }),
  updateMarketingPage,
);

//*DELETE ROUTE
tenantRouter.delete(
  '/:id',
  authMiddleware({ userPermissions: [], productPermissions: [] }, 0),
  validate({ params: idSchema }),
  deleteTenant,
);

// tenantRouter.delete(
//   '/marketing-page/:id',
//   validate({ body: marketingPageIdSchema, params: idSchema }),
//   deleteMarketingPage,
// );

//? Warehouse routes

//*POST ROUTE

/**
 * @swagger
 * /v1/tenant/warehouse/create:
 *   post:
 *     tags:
 *       - Warehouse
 *     summary: Create a new warehouse
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - warehousePinCode
 *               - gstinDetails
 *               - warehouseAddress
 *               - city
 *               - state
 *               - country
 *               - warehouseEmail
 *               - warehouseContact
 *               - operationStartTime
 *               - operationEndTime
 *               - perDayOrderCapacity
 *             properties:
 *               warehousePinCode:
 *                 type: string
 *               gstinDetails:
 *                 type: string
 *               warehouseAddress:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               warehouseEmail:
 *                 type: string
 *                 format: email
 *               warehouseContact:
 *                 type: string
 *               operationStartTime:
 *                 type: string
 *               operationEndTime:
 *                 type: string
 *               perDayOrderCapacity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Warehouse created successfully
 *       500:
 *         description: Failed to create warehouse
 */
tenantRouter.post(
  '/warehouse/create',
  validate({ body: createWarehouseSchema }),
  createWarehouse,
);

//? Brand routes

//*POST ROUTE

/**
 * @swagger
 * /v1/tenant/brand/create:
 *   post:
 *     tags:
 *       - Brand
 *     summary: Create a new brand
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brandName
 *               - yearsOfOperation
 *               - catalogueDetails
 *               - brandLogo
 *               - tradeMark
 *               - manufactureName
 *               - manufactureAddress
 *               - manufactureContact
 *               - packerAddress
 *               - packerContact
 *               - earthFriendly
 *               - rootCategoryClassification
 *               - mainCategoryClassification
 *             properties:
 *               brandName:
 *                 type: string
 *               yearsOfOperation:
 *                 type: number
 *               catalogueDetails:
 *                 type: string
 *               brandLogo:
 *                 type: string
 *               tradeMark:
 *                 type: string
 *               manufactureName:
 *                 type: string
 *               manufactureAddress:
 *                 type: string
 *               manufactureContact:
 *                 type: string
 *               packerAddress:
 *                 type: string
 *               packerContact:
 *                 type: string
 *               earthFriendly:
 *                 type: string
 *               rootCategoryClassification:
 *                 type: string
 *               mainCategoryClassification:
 *                 type: string
 *     responses:
 *       200:
 *         description: Brand created successfully
 *       400:
 *         description: Brand with this name already exists
 *       500:
 *         description: Failed to create brand
 */
tenantRouter.post(
  '/brand/create',
  validate({ body: createBrandSchema }),
  createBrand,
);

export default tenantRouter;
