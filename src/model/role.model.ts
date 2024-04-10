import { Document, Schema, model } from 'mongoose';
import { Visibility } from './sub-product/sku.model';
import { Groups } from './product.model';

interface ProductPermissions {
  managePromotionalProducts: boolean;
  manageCatalog: boolean;
  manageAbandonedCarts: boolean;
  createProduct: boolean;
  addDropshippingProduct: boolean;
  editProduct: boolean;
  deleteProduct: boolean;
  productDetailReport: boolean;
  salesReports: boolean;
  report: boolean;
  createCoupons: boolean;
  editCoupons: boolean;
  deleteCoupons: boolean;
  viewOrders: boolean;
  processOrders: boolean;
  createManualOrders: boolean;
  editOrders: boolean;
  cancelOrder: boolean;
  managePackingOfProducts: boolean;
  manageDispatchOfProducts: boolean;
  viewReturnRequest: boolean;
  approveReturnRequest: boolean;
  disapproveReturnRequest: boolean;
  manageReturnProducts: boolean;
  abandonedCart: boolean;
  bulkUpload: boolean;
  productLimit: number;
  unlimitedProduct: boolean;
  unlimitedUploadProductsOnMarketplace: number;
  customizationOfProducts: boolean;
  customFields: boolean;
  giftWrapping: boolean;
  linkedProducts: boolean;
  privateCatalogue: number;
  promotionalProducts: boolean;
  storePickup: boolean;
  pincodeBasedShipping: boolean;
  flatRateShipping: boolean;
  manageFreeShippingLimitAboveOrderValue: boolean;
  createBoxPacking: boolean;
  cod: boolean;
  upi: boolean;
  shippingIntegration: boolean;
  customPaymentGateway: boolean;
  sessionTracking: boolean;
  seoSettings: boolean;
  facebookPixel: boolean;
  googleAnalytics: boolean;
  customCheckoutForm: boolean;
  googleMerchantCenter: boolean;
  erpIntegration: boolean;
  callSupport: boolean;
  emailSupport: boolean;
  conciergeOnboarding: boolean;
}

interface UserPermissions {
  //Super-admin permissions
  globalSupplierCommision: number;
  separateSupplierCommision: number;
  transactionCharge: number;
  commisionOnDropshippingSale: number;
  ownDomain: number;
  superAdminCanAccessAdminPanel: boolean;
  superAdminCanAccessTenantAdminPanelIfPermitted: boolean; //if tenant has given permission
  superAdminCanSellOnMarketplace: boolean;
  superAdminCanCreateGroup: boolean;
  superAdminCanAssignCustomerToGroup: boolean;
  superAdminCanApproveSupplierProducts: boolean;
  superAdminCanDeleteSupplierProducts: boolean;
  superAdminCanEditSupplierProducts: boolean;
  superAdminCanBlockTenant: boolean;
  superAdminCanDeleteTenant: boolean;
  superAdminCanApproveSupplierOnMarketplace: boolean;
  superAdminCanDeleteSupplierOnMarketplace: boolean;
  superAdminCanBlockSupplierOnMarketplace: boolean;
  superAdminCanApproveInfluencerOnMarketplace: boolean;
  superAdminCanDeleteInfluencerOnMarketplace: boolean;
  superAdminCanBlockInfluencerOnMarketplace: boolean;
  superAdminCanApproveResellerOnMarketplace: boolean;
  superAdminCanDeleteResellerOnMarketplace: boolean;
  superAdminCanBlockResellerOnMarketplace: boolean;
  superAdminCanApproveUserOnMarketplace: boolean;
  superAdminCanDeleteUserOnMarketplace: boolean;
  superAdminCanBlockUserOnMarketplace: boolean;

  //Supplier permissions
  supplierCanApproveTenantForDropshipping: boolean;
  supplierCanApproveInfluencersForSharing: boolean;
  supplierCanApproveResellerForSharing: boolean;
  supplierCanBlockTenantFromDropshipping: boolean;
  supplierCanBlockInfluencerFromSharing: boolean;
  supplierCanBlockResellerFromSharing: boolean;

  //Tenant permissions
  tenantCanRequestApprovalForDropshippingFromSupplier: boolean;
  tenantOwnInfluencerCanRequestApprovalForSharing: boolean;
  tenantOwnResellerCanRequestApprovalForSharing: boolean;
  tenantCanApproveInfluencerOnHisOwnWebsite: boolean;
  tenantCanBlockInfluencerOnHisOwnWebsite: boolean;
  tenantCanDeleteInfluencerOnHisOwnWebsite: boolean;
  tenantCanApproveResellerOnHisOwnWebsite: boolean;
  tenantCanBlockResellerOnHisOwnWebsite: boolean;
  tenantCanDeleteResellerOnHisOwnWebsite: boolean;

  onPageSharingOptions: boolean;
  deletionPermissions: boolean;
  manageSocialMediaAccounts: boolean;
  managePayouts: boolean;
  manageSupplierPayment: boolean;
  manageInfluencerCommission: boolean;
  manageResellerPayment: boolean;
  supplierDetails: boolean;
  tenantDetails: boolean;
  influencerDetails: boolean;
  resellersDetails: boolean;
  customerDetails: boolean;
  supplierListReport: boolean;
  tenantListReport: boolean;
  customerListReport: boolean;
  influencerListReport: boolean;
  resellersListReport: boolean;

  //Influencer permissions
  influencerCanRequestApprovalForSharingFromSupplier: boolean;
  influencerCanHaveSharedCollectionsPage: boolean;
  influencerCanHaveBannerAndProfile: boolean;
  influencerCanEditProfile: boolean;
  influencerCanUploadPictures: boolean;
  influencerCanHaveFollowers: boolean;
  influencerCanAddSocialMediaLinks: boolean;
  influencerCanReplyToMessages: boolean;
  influencerCanViewProducts: boolean;
  influencerCanAddProductsToCart: boolean;
  influencerCanAddProductsToWishlist: boolean;
  influencerCanLikeProduct: boolean;
  influencerCanShareProduct: boolean;
  influencerCanCheckHisCommission: boolean;
  influencerCanCheckHisPaymentStatus: boolean;
  influencerCanCheckHisPaymentDetails: boolean;
  influencerCanAddBankAccount: boolean;
  influencerCanHaveWallet: boolean;
  influencerCanEditBankDetails: boolean;

  //Reseller Permissions
  resellerCanRequestApprovalForSharingFromSupplier: boolean;
  resellerCanHaveSharedCollectionsPage: boolean;
  resellerCanBannerAndProfile: boolean;
  resellerCanEditProfile: boolean;
  resellerCanUploadPictures: boolean;
  resellerCanAddSocialMediaLinks: boolean;
  resellerCanReplyToMessages: boolean;
  resellerCanViewProducts: boolean;
  resellerCanAddProductsToCart: boolean;
  resellerCanAddProductsToWishlist: boolean;
  resellerCanLikeProduct: boolean;
  resellerCanShareProduct: boolean;
  resellerCanCheckHisCommission: boolean;
  resellerCanCheckHisPaymentStatus: boolean;
  resellerCanCheckHisPaymentDetails: boolean;
  resellerCanAddBankAccount: boolean;
  resellerCanHaveWallet: boolean;
  resellerCanEditBankDetails: boolean;

  //Customer permissions
  customersCanViewProducts: boolean;
  customersCanAddProductsToCart: boolean;
  customersCanAddProductsToWishlist: boolean;
  customersCanLikeProduct: boolean;
  customersCanShareProduct: boolean;
  customersCanMakeReturnRequest: boolean;
  customersCanFollowSupplierInfluencer: boolean;
  customerCanRateProduct: boolean;
  customerCanRateSupplier: boolean;
  customerCanLikeInfluencer: boolean;
  customerCanRateReseller: boolean;
  customerCanUploadProfilePicture: boolean;
}

interface IRoleCapacities {
  staffAccounts: boolean;
  themes: number;
  accessToPremiumThemes: boolean;
  editTheme: boolean;
  customTheme: boolean;
  b2cPrice: boolean;
  b2bPrice: boolean;
  influencerPrice: boolean;
  resellerPrice: boolean;
  instructions: unknown;
  visibility: Visibility;
  groups: Groups;
}

interface IRole extends Document {
  roleId: number;
  name: string; // Add enum based on the roles
  dateOfJoining: Date;
  description: string;
  userPermissions: UserPermissions;
  productPermissions: ProductPermissions;
  capacities: IRoleCapacities;
}

const RoleSchema = new Schema(
  {
    roleId: { type: Number },
    name: { type: String, unique: true },
    dateOfJoining: { type: Date, default: Date.now },
    description: { type: String },
    userPermissions: {
      globalSupplierCommision: { type: Number },
      separateSupplierCommision: { type: Number },
      transactionCharge: { type: Number },
      commisionOnDropshippingSale: { type: Number },
      ownDomain: { type: Number },
      superAdminCanAccessAdminPanel: { type: Boolean, default: false },
      superAdminCanAccessTenantAdminPanelIfPermitted: {
        type: Boolean,
        default: false,
      },
      superAdminCanSellOnMarketplace: { type: Boolean, default: false },
      superAdminCanCreateGroup: { type: Boolean, default: false },
      superAdminCanAssignCustomerToGroup: { type: Boolean, default: false },
      superAdminCanApproveSupplierProducts: { type: Boolean, default: false },
      superAdminCanDeleteSupplierProducts: { type: Boolean, default: false },
      superAdminCanEditSupplierProducts: { type: Boolean, default: false },
      superAdminCanBlockTenant: { type: Boolean, default: false },
      superAdminCanDeleteTenant: { type: Boolean, default: false },
      superAdminCanApproveSupplierOnMarketplace: {
        type: Boolean,
        default: false,
      },
      superAdminCanDeleteSupplierOnMarketplace: {
        type: Boolean,
        default: false,
      },
      superAdminCanBlockSupplierOnMarketplace: {
        type: Boolean,
        default: false,
      },
      superAdminCanApproveInfluencerOnMarketplace: {
        type: Boolean,
        default: false,
      },
      superAdminCanDeleteInfluencerOnMarketplace: {
        type: Boolean,
        default: false,
      },
      superAdminCanBlockInfluencerOnMarketplace: {
        type: Boolean,
        default: false,
      },
      superAdminCanApproveResellerOnMarketplace: {
        type: Boolean,
        default: false,
      },
      superAdminCanDeleteResellerOnMarketplace: {
        type: Boolean,
        default: false,
      },
      superAdminCanBlockResellerOnMarketplace: {
        type: Boolean,
        default: false,
      },
      superAdminCanApproveUserOnMarketplace: { type: Boolean, default: false },
      superAdminCanDeleteUserOnMarketplace: { type: Boolean, default: false },
      superAdminCanBlockUserOnMarketplace: { type: Boolean, default: false },
      supplierCanApproveTenantForDropshipping: {
        type: Boolean,
        default: false,
      },
      supplierCanApproveInfluencersForSharing: {
        type: Boolean,
        default: false,
      },
      supplierCanApproveResellerForSharing: { type: Boolean, default: false },
      supplierCanBlockTenantFromDropshipping: { type: Boolean, default: false },
      supplierCanBlockInfluencerFromSharing: { type: Boolean, default: false },
      supplierCanBlockResellerFromSharing: { type: Boolean, default: false },
      tenantCanRequestApprovalForDropshippingFromSupplier: {
        type: Boolean,
        default: false,
      },
      tenantOwnInfluencerCanRequestApprovalForSharing: {
        type: Boolean,
        default: false,
      },
      tenantOwnResellerCanRequestApprovalForSharing: {
        type: Boolean,
        default: false,
      },
      tenantCanApproveInfluencerOnHisOwnWebsite: {
        type: Boolean,
        default: false,
      },
      tenantCanBlockInfluencerOnHisOwnWebsite: {
        type: Boolean,
        default: false,
      },
      tenantCanDeleteInfluencerOnHisOwnWebsite: {
        type: Boolean,
        default: false,
      },
      tenantCanApproveResellerOnHisOwnWebsite: {
        type: Boolean,
        default: false,
      },
      tenantCanBlockResellerOnHisOwnWebsite: { type: Boolean, default: false },
      tenantCanDeleteResellerOnHisOwnWebsite: { type: Boolean, default: false },
      onPageSharingOptions: { type: Boolean, default: false },
      deletionPermissions: { type: Boolean, default: false },
      manageSocialMediaAccounts: { type: Boolean, default: false },
      managePayouts: { type: Boolean, default: false },
      manageSupplierPayment: { type: Boolean, default: false },
      manageInfluencerCommission: { type: Boolean, default: false },
      manageResellerPayment: { type: Boolean, default: false },
      supplierDetails: { type: Boolean, default: false },
      tenantDetails: { type: Boolean, default: false },
      influencerDetails: { type: Boolean, default: false },
      resellersDetails: { type: Boolean, default: false },
      customerDetails: { type: Boolean, default: false },
      supplierListReport: { type: Boolean, default: false },
      tenantListReport: { type: Boolean, default: false },
      customerListReport: { type: Boolean, default: false },
      influencerListReport: { type: Boolean, default: false },
      resellersListReport: { type: Boolean, default: false },
      influencerCanRequestApprovalForSharingFromSupplier: {
        type: Boolean,
        default: false,
      },
      influencerCanHaveSharedCollectionsPage: { type: Boolean, default: false },
      influencerCanHaveBannerAndProfile: { type: Boolean, default: false },
      influencerCanEditProfile: { type: Boolean, default: false },
      influencerCanUploadPictures: { type: Boolean, default: false },
      influencerCanHaveFollowers: { type: Boolean, default: false },
      influencerCanAddSocialMediaLinks: { type: Boolean, default: false },
      influencerCanReplyToMessages: { type: Boolean, default: false },
      influencerCanViewProducts: { type: Boolean, default: false },
      influencerCanAddProductsToCart: { type: Boolean, default: false },
      influencerCanAddProductsToWishlist: { type: Boolean, default: false },
      influencerCanLikeProduct: { type: Boolean, default: false },
      influencerCanShareProduct: { type: Boolean, default: false },
      influencerCanCheckHisCommission: { type: Boolean, default: false },
      influencerCanCheckHisPaymentStatus: { type: Boolean, default: false },
      influencerCanCheckHisPaymentDetails: { type: Boolean, default: false },
      influencerCanAddBankAccount: { type: Boolean, default: false },
      influencerCanHaveWallet: { type: Boolean, default: false },
      influencerCanEditBankDetails: { type: Boolean, default: false },
      resellerCanRequestApprovalForSharingFromSupplier: {
        type: Boolean,
        default: false,
      },
      resellerCanHaveSharedCollectionsPage: { type: Boolean, default: false },
      resellerCanBannerAndProfile: { type: Boolean, default: false },
      resellerCanEditProfile: { type: Boolean, default: false },
      resellerCanUploadPictures: { type: Boolean, default: false },
      resellerCanAddSocialMediaLinks: { type: Boolean, default: false },
      resellerCanReplyToMessages: { type: Boolean, default: false },
      resellerCanViewProducts: { type: Boolean, default: false },
      resellerCanAddProductsToCart: { type: Boolean, default: false },
      resellerCanAddProductsToWishlist: { type: Boolean, default: false },
      resellerCanLikeProduct: { type: Boolean, default: false },
      resellerCanShareProduct: { type: Boolean, default: false },
      resellerCanCheckHisCommission: { type: Boolean, default: false },
      resellerCanCheckHisPaymentStatus: { type: Boolean, default: false },
      resellerCanCheckHisPaymentDetails: { type: Boolean, default: false },
      resellerCanAddBankAccount: { type: Boolean, default: false },
      resellerCanHaveWallet: { type: Boolean, default: false },
      resellerCanEditBankDetails: { type: Boolean, default: false },
      customersCanViewProducts: { type: Boolean, default: false },
      customersCanAddProductsToCart: { type: Boolean, default: false },
      customersCanAddProductsToWishlist: { type: Boolean, default: false },
      customersCanLikeProduct: { type: Boolean, default: false },
      customersCanShareProduct: { type: Boolean, default: false },
      customersCanMakeReturnRequest: { type: Boolean, default: false },
      customersCanFollowSupplierInfluencer: { type: Boolean, default: false },
      customerCanRateProduct: { type: Boolean, default: false },
      customerCanRateSupplier: { type: Boolean, default: false },
      customerCanLikeInfluencer: { type: Boolean, default: false },
      customerCanRateReseller: { type: Boolean, default: false },
      customerCanUploadProfilePicture: { type: Boolean, default: false },
    },
    productPermissions: {
      managePromotionalProducts: { type: Boolean, default: false },
      manageCatalog: { type: Boolean, default: false },
      manageAbandonedCarts: { type: Boolean, default: false },
      createProduct: { type: Boolean, default: false },
      addDropshippingProduct: { type: Boolean, default: false },
      editProduct: { type: Boolean, default: false },
      deleteProduct: { type: Boolean, default: false },
      productDetailReport: { type: Boolean, default: false },
      salesReports: { type: Boolean, default: false },
      report: { type: Boolean, default: false },
      createCoupons: { type: Boolean, default: false },
      editCoupons: { type: Boolean, default: false },
      deleteCoupons: { type: Boolean, default: false },
      viewOrders: { type: Boolean, default: false },
      processOrders: { type: Boolean, default: false },
      createManualOrders: { type: Boolean, default: false },
      editOrders: { type: Boolean, default: false },
      cancelOrder: { type: Boolean, default: false },
      managePackingOfProducts: { type: Boolean, default: false },
      manageDispatchOfProducts: { type: Boolean, default: false },
      viewReturnRequest: { type: Boolean, default: false },
      approveReturnRequest: { type: Boolean, default: false },
      disapproveReturnRequest: { type: Boolean, default: false },
      manageReturnProducts: { type: Boolean, default: false },
      abandonedCart: { type: Boolean, default: false },
      bulkUpload: { type: Boolean, default: false },
      productLimit: { type: Number },
      unlimitedProduct: { type: Boolean, default: false },
      unlimitedUploadProductsOnMarketplace: { type: Number },
      customizationOfProducts: { type: Boolean, default: false },
      customFields: { type: Boolean, default: false },
      giftWrapping: { type: Boolean, default: false },
      linkedProducts: { type: Boolean, default: false },
      privateCatalogue: { type: Number },
      promotionalProducts: { type: Boolean, default: false },
      storePickup: { type: Boolean, default: false },
      pincodeBasedShipping: { type: Boolean, default: false },
      flatRateShipping: { type: Boolean, default: false },
      manageFreeShippingLimitAboveOrderValue: {
        type: Boolean,
        default: false,
      },
      createBoxPacking: { type: Boolean, default: false },
      cod: { type: Boolean, default: false },
      upi: { type: Boolean, default: false },
      shippingIntegration: { type: Boolean, default: false },
      customPaymentGateway: { type: Boolean, default: false },
      sessionTracking: { type: Boolean, default: false },
      seoSettings: { type: Boolean, default: false },
      facebookPixel: { type: Boolean, default: false },
      googleAnalytics: { type: Boolean, default: false },
      customCheckoutForm: { type: Boolean, default: false },
      googleMerchantCenter: { type: Boolean, default: false },
      erpIntegration: { type: Boolean, default: false },
      callSupport: { type: Boolean, default: false },
      emailSupport: { type: Boolean, default: false },
      conciergeOnboarding: { type: Boolean, default: false },
    },
    capacities: {
      staffAccounts: { type: Boolean, default: false },
      themes: { type: Number },
      accessToPremiumThemes: { type: Boolean, default: false },
      editTheme: { type: Boolean, default: false },
      customTheme: { type: Boolean, default: false },
      b2cPrice: { type: Boolean, default: false },
      b2bPrice: { type: Boolean, default: false },
      influencerPrice: { type: Boolean, default: false },
      resellerPrice: { type: Boolean, default: false },
      instructions: { type: Schema.Types.Mixed },
      visibility: { type: Schema.Types.Mixed },
      groups: { type: Schema.Types.Mixed },
    },
  },
  { versionKey: false },
);

const RoleModel = model<IRole>('Role', RoleSchema);

export { IRole, RoleModel };
