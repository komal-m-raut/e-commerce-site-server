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
  // Admin permissions
  globalSupplierCommission: number;
  separateSupplierCommission: number;
  transactionCharge: number;
  commissionOnSaleOfDropshippingProductOnTenantWebsite: number;
  ownDomain: number;
  canAccessAdminPanel: boolean;
  canAccessAdminPanelOfTenantOnPermissionOfTenant: boolean;
  canSellOnMarketplace: boolean;
  canCreateGroup: boolean;
  canAssignCustomerOrUserToAGroup: boolean;

  // Influencer permissions
  influencerWillHaveAllHisSharedCollectionsOnAHisCollectionPage: boolean;
  influencerWillHaveBannerAndProfilePicture: boolean;
  influencerCanEditProfile: boolean;
  influencerCanUploadPictures: boolean;
  influencerCanHaveFollowers: boolean;

  // Reseller permissions
  resellerWillHaveAllHisSharedCollectionsOnAHisCollectionPage: boolean;
  resellerWillHaveBannerAndProfilePicture: boolean;
  resellerCanEditProfile: boolean;
  resellerCanUploadPictures: boolean;
  resellerCanAddSocialMediaLinkOnTheirCollectionPage: boolean;

  // End user permissions
  customersCanViewProducts: boolean;
  customersCanAddProductsToCart: boolean;
  customersCanAddProductsToWishlist: boolean;
  customersCanLikeProduct: boolean;
  customersCanShareProduct: boolean;
  customersCanMakeAnReturnRequest: boolean;
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
      globalSupplierCommission: { type: Number },
      separateSupplierCommission: { type: Number },
      transactionCharge: { type: Number },
      commissionOnSaleOfDropshippingProductOnTenantWebsite: { type: Number },
      ownDomain: { type: Number },
      canAccessAdminPanel: { type: Boolean, default: false },
      canAccessAdminPanelOfTenantOnPermissionOfTenant: {
        type: Boolean,
        default: false,
      },
      canSellOnMarketplace: { type: Boolean, default: false },
      canCreateGroup: { type: Boolean, default: false },
      canAssignCustomerOrUserToAGroup: { type: Boolean, default: false },
      influencerWillHaveAllHisSharedCollectionsOnAHisCollectionPage: {
        type: Boolean,
        default: false,
      },
      influencerWillHaveBannerAndProfilePicture: {
        type: Boolean,
        default: false,
      },
      influencerCanEditProfile: { type: Boolean, default: false },
      influencerCanUploadPictures: { type: Boolean, default: false },
      influencerCanHaveFollowers: { type: Boolean, default: false },
      resellerWillHaveAllHisSharedCollectionsOnAHisCollectionPage: {
        type: Boolean,
        default: false,
      },
      resellerWillHaveBannerAndProfilePicture: {
        type: Boolean,
        default: false,
      },
      resellerCanEditProfile: { type: Boolean, default: false },
      resellerCanUploadPictures: { type: Boolean, default: false },
      resellerCanAddSocialMediaLinkOnTheirCollectionPage: {
        type: Boolean,
        default: false,
      },
      customersCanViewProducts: { type: Boolean, default: false },
      customersCanAddProductsToCart: { type: Boolean, default: false },
      customersCanAddProductsToWishlist: { type: Boolean, default: false },
      customersCanLikeProduct: { type: Boolean, default: false },
      customersCanShareProduct: { type: Boolean, default: false },
      customersCanMakeAnReturnRequest: { type: Boolean, default: false },
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
