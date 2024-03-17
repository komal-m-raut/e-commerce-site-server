import { Document, Schema, model } from 'mongoose';

interface IPackage {
  desktopVersion: boolean;
  canCreateProducts: boolean;
  ownDomain: number;
  staffAccounts: boolean;
  themes: number;
  canEditTheme: boolean;
  transactionCharge: number;
  sessionTracking: boolean;
  b2cPrice: boolean;
  b2bPrice: boolean;
  reselling: boolean;
  canSellOnMarketplace: boolean;
  unlimitedProduct: boolean;
  bulkUpload: boolean;
  abandonedCart: boolean;
  unlimitedUploadProductsOnMarketplace: number;
  privateCatalogue: number;
  dropshipping: boolean;
  saleOfDropshipping: boolean;
  promotionalProducts: boolean;
  customizationOfProducts: boolean;
  customFields: boolean;
  coupons: boolean;
  storePickup: boolean;
  cod: boolean;
  upi: boolean;
  pinode: boolean;
  shippingIntegration: boolean;
  customPaymentGateway: boolean;
  report: boolean;
  facebookPixel: boolean;
  googleAnalytics: boolean;
  customCheckoutForm: boolean;
  googleMerchantCenter: boolean;
  erpIntegration: boolean;
  callSupport: boolean;
  emailSupport: boolean;
  conciergeOnboarding: boolean;
}

interface IRole extends Document {
  roleId: number;
  name: string; // Add enum based on the roles
  subscription: string; // Add enum based on the subscription
  canManageProducts: boolean; // Sample permissions
  canProcessOrders: boolean;
  canEditUsers: boolean;
  dateOfJoining: Date;
  description: string;
  packages: IPackage;
}

const RoleSchema = new Schema(
  {
    roleId: { type: Number, unique: true },
    name: { type: String, unique: true },
    subscription: { type: String },
    canManageProducts: { type: Boolean, default: false },
    canProcessOrders: { type: Boolean, default: false },
    canEditUsers: { type: Boolean, default: false },
    dateOfJoining: { type: Date, default: Date.now },
    description: { type: String },
    packages: {
      desktopVersion: { type: Boolean },
      canCreateProducts: { type: Boolean },
      ownDomain: { type: Number },
      staffAccounts: { type: Boolean },
      themes: { type: Number },
      canEditTheme: { type: Boolean },
      transactionCharge: { type: Number },
      sessionTracking: { type: Boolean },
      b2cPrice: { type: Boolean },
      b2bPrice: { type: Boolean },
      reselling: { type: Boolean },
      canSellOnMarketplace: { type: Boolean },
      unlimitedProduct: { type: Boolean },
      bulkUpload: { type: Boolean },
      abandonedCart: { type: Boolean },
      unlimitedUploadProductsOnMarketplace: { type: Number },
      privateCatalogue: { type: Number },
      dropshipping: { type: Boolean },
      saleOfDropshipping: { type: Boolean },
      promotionalProducts: { type: Boolean },
      customizationOfProducts: { type: Boolean },
      customFields: { type: Boolean },
      coupons: { type: Boolean },
      storePickup: { type: Boolean },
      cod: { type: Boolean },
      upi: { type: Boolean },
      pinode: { type: Boolean },
      shippingIntegration: { type: Boolean },
      customPaymentGateway: { type: Boolean },
      report: { type: Boolean },
      facebookPixel: { type: Boolean },
      googleAnalytics: { type: Boolean },
      customCheckoutForm: { type: Boolean },
      googleMerchantCenter: { type: Boolean },
      erpIntegration: { type: Boolean },
      callSupport: { type: Boolean },
      emailSupport: { type: Boolean },
      conciergeOnboarding: { type: Boolean },
    },
  },
  { versionKey: false },
);

const RoleModel = model<IRole>('Role', RoleSchema);

export { IRole, RoleModel };
