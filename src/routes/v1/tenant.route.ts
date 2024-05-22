import { createTenantBrand } from '@src/controller/tenantBrand.controller';
import {
  createMarketingPage,
  createTenant,
  createTenantPassword,
  deleteTenant,
  getAllTenants,
  getTenant,
  homeSection,
  loginTenant,
  updateMarketingPage,
  updateTenantDomain,
} from '@src/controller/tenant.controller';
import { createTenantWarehouse } from '@src/controller/tenantWarehouse.controller';
import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import { createTenantBrandSchema } from '@src/validation/tenantBrand.validation';
import { idSchema } from '@src/validation/common.validation';
import {
  createTenantPasswordSchema,
  createTenantSchema,
  homeSectionSchema,
  loginTenantSchema,
  marketingPageSchema,
  marketingPageUpdateSchema,
  updateDomainSchema,
} from '@src/validation/tenant.validation';
import { createTenantWarehouseSchema } from '@src/validation/tenantWarehouse.validation';
import { Router } from 'express';
import {
  createTenantCompanySchema,
  organizationDetailsSchema,
  updateBankingInfoSchema,
  updateBasicInfoSchema,
  updateTenantCompanySchema,
  verifyGstSchema,
} from '@src/validation/tenantCompany.validation';
import {
  createTenantCompany,
  updateTenantCompany,
  updateTenantCompanyDetails,
} from '@src/controller/tenantCompany.controller';

const tenantRouter: Router = Router();

//*POST ROUTE

/**
 * @swagger
 * /v1/tenant/register:
 *   post:
 *     tags:
 *       - Tenant
 *     summary: Register a new tenant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - phoneNo
 *               - name
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNo:
 *                 type: number
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: Password must contain at least 1 symbol, 1 lowercase letter, 1 uppercase letter and 1 number. Minimum length is 8 characters.
 *               role:
 *                 type: string
 *                 format: objectId
 *                 description: Role ID (optional)
 *     responses:
 *       200:
 *         description: Tenant registered successfully
 *       400:
 *         description: Tenant with this email or phone number already exists
 *       404:
 *         description: No tenant found
 *       500:
 *         description: Failed to register tenant
 */

tenantRouter.post(
  '/register',
  validate({ body: createTenantSchema }),
  createTenant,
);

/**
 * @swagger
 * /v1/tenant/set-password:
 *   post:
 *     tags:
 *       - Tenant
 *     summary: Register a new tenant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *               - userId
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: Password must contain at least 1 symbol, 1 lowercase letter, 1 uppercase letter and 1 number. Minimum length is 8 characters.
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password set successfully
 *       400:
 *         description: Tenant with this userId doesn't exists
 *       404:
 *         description: No tenant found
 *       500:
 *         description: Failed to register tenant
 */

tenantRouter.post(
  '/set-password',
  validate({ body: createTenantPasswordSchema }),
  createTenantPassword,
);

/**
 * @swagger
 * /v1/tenant/login:
 *   post:
 *     tags:
 *       - Tenant
 *     summary: Login a tenant
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 *       404:
 *         description: Tenant not found
 */
tenantRouter.post('/login', validate({ body: loginTenantSchema }), loginTenant);

//*PATCH ROUTE

/**
 * @swagger
 * /v1/tenant/update-domain/{id}:
 *   patch:
 *     tags:
 *       - Tenant
 *     summary: Update tenant domain
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the tenant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               domain:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tenant domain updated successfully
 *       404:
 *         description: Tenant not found
 *       500:
 *         description: Failed to update tenant domain
 */

tenantRouter.patch(
  '/update-domain/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: updateDomainSchema, params: idSchema }),
  updateTenantDomain,
);

//? Company routes

/**
 * @swagger
 * /v1/tenant/create-company:
 *   post:
 *     tags:
 *       - Tenant
 *     summary: Create a new company
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the company. This field is required.
 *               description:
 *                 type: string
 *                 description: The description of the company.
 *               aadhaarNumber:
 *                 type: string
 *                 description: The Aadhaar number of the company. This field should have an exact length of 12 and should only contain digits.
 *               aadhaarCard:
 *                 type: string
 *                 description: The Aadhaar card of the company.
 *     responses:
 *       200:
 *         description: Company created successfully
 *       400:
 *         description: Company with this name is already registered by the owner
 *       500:
 *         description: Failed to create company
 */

tenantRouter.post(
  '/create-company',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: createTenantCompanySchema }),
  createTenantCompany,
);

//*PATCH ROUTE

/**
 * @swagger
 * /v1/tenant/{id}:
 *   patch:
 *     tags:
 *       - Tenant
 *     summary: Update a company
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the company to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: The description of the company.
 *               aadhaarNumber:
 *                 type: string
 *                 description: The Aadhaar number of the company. This field should have an exact length of 12 and should only contain digits.
 *               aadhaarCard:
 *                 type: string
 *                 description: The Aadhaar card of the company.
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       400:
 *         description: Company with this name is already registered by the owner
 *       500:
 *         description: Failed to update company
 */

tenantRouter.patch(
  '/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: updateTenantCompanySchema, params: idSchema }),
  updateTenantCompanyDetails,
);
/**
 * @swagger
 * /v1/tenant/verify-gstin/{id}:
 *   patch:
 *     tags:
 *       - Tenant
 *     summary: Verify and add gstin details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gstin:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gst verified and added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Failed to update company details
 */

tenantRouter.patch(
  '/verify-gstin/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: verifyGstSchema, params: idSchema }),
  updateTenantCompany,
);

/**
 * @swagger
 * /v1/tenant/company-basic-details/{id}:
 *   patch:
 *     tags:
 *       - Tenant
 *     summary: Update basic company details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               primaryContactName:
 *                 type: string
 *               primaryEmailId:
 *                 type: string
 *                 format: email
 *               primaryContactNumber:
 *                 type: string
 *               businessOwnerName:
 *                 type: string
 *               businessOwnerEmail:
 *                 type: string
 *                 format: email
 *               businessOwnerContact:
 *                 type: string
 *               panNumber:
 *                 type: string
 *               businessModel:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               pincode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company details updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Failed to update company details
 */

tenantRouter.patch(
  '/company-basic-details/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: updateBasicInfoSchema, params: idSchema }),
  updateTenantCompany,
);

/**
 * @swagger
 * /v1/tenant/company-organization-details/{id}:
 *   patch:
 *     tags:
 *       - Tenant
 *     summary: Update organization details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               registeredCompanyName:
 *                 type: string
 *               gstin:
 *                 type: string
 *               panNumber:
 *                 type: string
 *               registeredCompanyAddress:
 *                 type: string
 *               city:
 *                 type: string
 *               pincode:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               gstCertificate:
 *                 type: string
 *               organizationEmail:
 *                 type: string
 *                 format: email
 *               organizationContact:
 *                 type: string
 *     responses:
 *       200:
 *         description: Organization details updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Failed to update organization details
 */

tenantRouter.patch(
  '/company-organization-details/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: organizationDetailsSchema, params: idSchema }),
  updateTenantCompany,
);
/**
 * @swagger
 * /v1/tenant/company-banking-details/{id}:
 *   patch:
 *     tags:
 *       - Tenant
 *     summary: Update banking details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountHolderName:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               ifscCode:
 *                 type: string
 *               bankName:
 *                 type: string
 *               accountType:
 *                 type: string
 *               cheque:
 *                 type: string
 *     responses:
 *       200:
 *         description: Banking details updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Failed to update banking details
 */

tenantRouter.patch(
  '/company-banking-details/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: updateBankingInfoSchema, params: idSchema }),
  updateTenantCompany,
);

//*POST ROUTE

/**
 * @swagger
 * /v1/tenant/warehouse/create:
 *   post:
 *     tags:
 *       - Tenant
 *     summary: Create a new warehouse
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyId
 *               - gstinDetails
 *               - warehouseAddress
 *               - warehouseEmail
 *               - warehouseContact
 *               - perDayOrderCapacity
 *             properties:
 *               companyId:
 *                 type: string
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
 *       400:
 *         description: Warehouse with this name already exists for this tenant
 *       500:
 *         description: Failed to create warehouse
 */

tenantRouter.post(
  '/warehouse/create',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: createTenantWarehouseSchema }),
  createTenantWarehouse,
);

//? Brand routes

/**
 * @swagger
 * /v1/tenant/brand/create:
 *   post:
 *     tags:
 *       - Tenant
 *     summary: Create a new brand
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brandName
 *               - manufactureName
 *               - manufactureAddress
 *               - manufactureContact
 *               - rootCategoryClassification
 *               - mainCategoryClassification
 *               - companyId
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
 *               packerAddressAndContact:
 *                 type: string
 *               earthFriendly:
 *                 type: string
 *               rootCategoryClassification:
 *                 type: array
 *                 items:
 *                   type: string
 *               mainCategoryClassification:
 *                 type: array
 *                 items:
 *                   type: string
 *               companyId:
 *                 type: string
 *               isDisabled:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Brand created successfully
 *       400:
 *         description: Brand with this name already exists for this tenant
 *       500:
 *         description: Failed to create brand
 */

tenantRouter.post(
  '/brand/create',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  validate({ body: createTenantBrandSchema }),
  createTenantBrand,
);

//*PATCH ROUTE
/**
 * @swagger
 * /v1/tenant/home-section/{id}:
 *   patch:
 *     tags:
 *       - Tenant
 *     summary: Update home section details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the tenant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               preset:
 *                 type: string
 *               headerTemplate:
 *                 type: string
 *               navTemplate:
 *                 type: string
 *               sections:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     cardTemplate:
 *                       type: string
 *                     heading:
 *                       type: string
 *                     cards:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           cssProperties:
 *                             type: object
 *     responses:
 *       200:
 *         description: Home section updated successfully
 *       404:
 *         description: Home section not found
 *       500:
 *         description: Failed to update home section
 */

tenantRouter.patch(
  '/home-section/:id',
  authMiddleware(),
  validate({ body: homeSectionSchema, params: idSchema }),
  homeSection,
);

/**
 * @swagger
 * /v1/tenant/marketing-page/{id}:
 *   post:
 *     tags:
 *       - Tenant
 *     summary: Update marketing page details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the tenant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               html:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *               seo:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   keywords:
 *                     type: array
 *                     items:
 *                       type: string
 *                   description:
 *                     type: string
 *     responses:
 *       200:
 *         description: Marketing page updated successfully
 *       404:
 *         description: Marketing page not found
 *       500:
 *         description: Failed to update marketing page
 */

tenantRouter.post(
  '/marketing-page/:id',
  authMiddleware(),
  validate({ body: marketingPageSchema, params: idSchema }),
  createMarketingPage,
);

// tenantRouter.patch(
//   '/home-section/:id',
//   validate({ body: homeSectionSchema, params: idSchema }),
//   homeSection,
// );

/**
 * @swagger
 * /v1/tenant/marketing-page/{id}:
 *   patch:
 *     tags:
 *       - Tenant
 *     summary: Update marketing page details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the tenant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marketingPageId:
 *                 type: string
 *                 pattern: "^[0-9a-fA-F]{24}$"
 *                 description: Valid MongoDB ObjectID
 *               updatedData:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   slug:
 *                     type: string
 *                   html:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [active, inactive]
 *                   seo:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       keywords:
 *                         type: array
 *                         items:
 *                           type: string
 *                       description:
 *                         type: string
 *     responses:
 *       200:
 *         description: Marketing page updated successfully
 *       404:
 *         description: Marketing page not found
 *       500:
 *         description: Failed to update marketing page
 */

tenantRouter.patch(
  '/marketing-page/:id',
  validate({ body: marketingPageUpdateSchema, params: idSchema }),
  updateMarketingPage,
);

//*GET ROUTE

/**
 * @swagger
 * /v1/tenant:
 *   get:
 *     tags:
 *       - Tenant
 *     summary: Get all tenants with pagination
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: itemsPerPage
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of tenants to return per page
 *       - in: query
 *         name: pageCount
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to return
 *     responses:
 *       200:
 *         description: List of all tenants
 *       400:
 *         description: Invalid query parameters
 *       404:
 *         description: No tenants found
 *       500:
 *         description: Failed to get tenants
 */

tenantRouter.get(
  '/',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  getAllTenants,
);

/**
 * @swagger
 * /v1/tenant/{id}:
 *   get:
 *     tags:
 *       - Tenant
 *     summary: Get a single tenant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the tenant
 *     responses:
 *       200:
 *         description: Tenant found successfully
 *       404:
 *         description: Tenant not found
 *       500:
 *         description: Failed to get tenant
 */

tenantRouter.get(
  '/:id',
  authMiddleware({
    productPermissions: {
      createProduct: true,
      editProduct: true,
      deleteProduct: true,
      productDetailReport: true,
    },
    userPermissions: { salesReports: true },
  }),
  getTenant,
);

//*DELETE ROUTE
tenantRouter.delete(
  '/:id',
  authMiddleware(),
  validate({ params: idSchema }),
  deleteTenant,
);

// tenantRouter.delete(
//   '/marketing-page/:id',
//   validate({ body: marketingPageIdSchema, params: idSchema }),
//   deleteMarketingPage,
// );

//? Warehouse routes

export default tenantRouter;
