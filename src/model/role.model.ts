import { Document, Schema, model } from 'mongoose';

interface IPermissions {
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
  dateOfJoining: Date;
  description: string;
  permissions: IPermissions;
}

const RoleSchema = new Schema(
  {
    roleId: { type: Number },
    name: { type: String, unique: true },
    dateOfJoining: { type: Date, default: Date.now },
    description: { type: String },
    permissions: {
      canCreateProducts: { type: Boolean, default: false },
      ownDomain: { type: Number },
      staffAccounts: { type: Boolean, default: false },
      themes: { type: Number },
      canEditTheme: { type: Boolean, default: false },
      transactionCharge: { type: Number },
      sessionTracking: { type: Boolean, default: false },
      b2cPrice: { type: Boolean, default: false },
      b2bPrice: { type: Boolean, default: false },
      reselling: { type: Boolean, default: false },
      canSellOnMarketplace: { type: Boolean, default: false },
      unlimitedProduct: { type: Boolean, default: false },
      bulkUpload: { type: Boolean, default: false },
      abandonedCart: { type: Boolean, default: false },
      unlimitedUploadProductsOnMarketplace: { type: Number },
      privateCatalogue: { type: Number },
      dropshipping: { type: Boolean, default: false },
      saleOfDropshipping: { type: Boolean, default: false },
      promotionalProducts: { type: Boolean, default: false },
      customizationOfProducts: { type: Boolean, default: false },
      customFields: { type: Boolean, default: false },
      coupons: { type: Boolean, default: false },
      storePickup: { type: Boolean, default: false },
      cod: { type: Boolean, default: false },
      upi: { type: Boolean, default: false },
      pinode: { type: Boolean, default: false },
      shippingIntegration: { type: Boolean, default: false },
      customPaymentGateway: { type: Boolean, default: false },
      report: { type: Boolean, default: false },
      facebookPixel: { type: Boolean, default: false },
      googleAnalytics: { type: Boolean, default: false },
      customCheckoutForm: { type: Boolean, default: false },
      googleMerchantCenter: { type: Boolean, default: false },
      erpIntegration: { type: Boolean, default: false },
      callSupport: { type: Boolean, default: false },
      emailSupport: { type: Boolean, default: false },
      conciergeOnboarding: { type: Boolean, default: false },
    },
  },
  { versionKey: false },
);

const RoleModel = model<IRole>('Role', RoleSchema);

export { IRole, RoleModel };
