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
  createCoupons: boolean; // Allows users to generate discount codes.
  editCoupons: boolean; // Enables modification of existing coupon details.
  deleteCoupons: boolean; // Permits removal of unused or expired coupons.
  createProduct: boolean; // Allows adding new products to the system.
  addDropshippingProduct: boolean; // Facilitates integration of dropshipped items.
  editProduct: boolean; // Enables modification of product information.
  deleteProduct: boolean; // Allows removal of products from the catalog.
  productDetailReport: boolean; // Provides insights into product performance.
  salesReports: boolean; // Offers data on sales trends and revenue.
  customerDetails: boolean; // Access to customer profiles and information.
  viewOrders: boolean; // Allows tracking of customer orders.
  createManualOrders: boolean; // Manually create orders if needed.
  editOrders: boolean; // Modify order details as required.
  cancelOrder: boolean; // Cancel an order if necessary.
  seoSettings: boolean; // Manage search engine optimization parameters.
  onPageSharingOptions: boolean; // Enable staff to share reports in CSV or Excel format.
  noDeletionPermissions: boolean; // Restricts deletion actions.
  manageDispatchOfProducts: boolean; // Handle product shipping and delivery.
  viewReturnRequest: boolean; // Access return requests from customers.
  approveReturnRequest: boolean; // Authorize product returns.
  disapproveReturnRequest: boolean; // Reject return requests.
  managePayouts: boolean; // Handle financial transactions.
  customersCanViewProducts: boolean; // Allows customers to browse the product catalog.
  customersCanAddProductsToCart: boolean; // Enables shopping cart functionality.
  customersCanAddProductsToWishlist: boolean; // Lets customers save desired items.
  customersCanLikeProduct: boolean; // Allows users to express interest in products.
  customersCanShareProduct: boolean; // Facilitates sharing product details.
  resellersCanViewProducts: boolean; // Provides access to reseller-specific product information.
  resellersCanAddProductsToCart: boolean; // Enables resellers to create orders.
  resellersCanAddProductsToWishlist: boolean; // Allows resellers to save preferred items.
  resellersCanLikeProduct: boolean; // Lets resellers express interest in products.
  resellersCanShareProduct: boolean; // Facilitates sharing product among its customers.
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
      createCoupons: { type: Boolean, default: false },
      editCoupons: { type: Boolean, default: false },
      deleteCoupons: { type: Boolean, default: false },
      createProduct: { type: Boolean, default: false },
      addDropshippingProduct: { type: Boolean, default: false },
      editProduct: { type: Boolean, default: false },
      deleteProduct: { type: Boolean, default: false },
      productDetailReport: { type: Boolean, default: false },
      salesReports: { type: Boolean, default: false },
      customerDetails: { type: Boolean, default: false },
      viewOrders: { type: Boolean, default: false },
      createManualOrders: { type: Boolean, default: false },
      editOrders: { type: Boolean, default: false },
      cancelOrder: { type: Boolean, default: false },
      seoSettings: { type: Boolean, default: false },
      onPageSharingOptions: { type: Boolean, default: false },
      noDeletionPermissions: { type: Boolean, default: false },
      manageDispatchOfProducts: { type: Boolean, default: false },
      viewReturnRequest: { type: Boolean, default: false },
      approveReturnRequest: { type: Boolean, default: false },
      disapproveReturnRequest: { type: Boolean, default: false },
      managePayouts: { type: Boolean, default: false },
      customersCanViewProducts: { type: Boolean, default: false },
      customersCanAddProductsToCart: { type: Boolean, default: false },
      customersCanAddProductsToWishlist: { type: Boolean, default: false },
      customersCanLikeProduct: { type: Boolean, default: false },
      customersCanShareProduct: { type: Boolean, default: false },
      resellersCanViewProducts: { type: Boolean, default: false },
      resellersCanAddProductsToCart: { type: Boolean, default: false },
      resellersCanAddProductsToWishlist: { type: Boolean, default: false },
      resellersCanLikeProduct: { type: Boolean, default: false },
      resellersCanShareProduct: { type: Boolean, default: false },
    },
  },
  { versionKey: false },
);

const RoleModel = model<IRole>('Role', RoleSchema);

export { IRole, RoleModel };
