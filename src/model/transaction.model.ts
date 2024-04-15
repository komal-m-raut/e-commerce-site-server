import { Document, PopulatedDoc, Schema, model } from 'mongoose';
import { ITenant } from './tenant.model';
import { IMarketplaceProduct } from './marketplaceProduct.model';
import { IInvoice } from './invoice.model';

interface ITransaction extends Document {
  orderId: string;
  userId: Schema.Types.ObjectId;
  tenantId: PopulatedDoc<Schema.Types.ObjectId & ITenant>;
  products: {
    productId: PopulatedDoc<Schema.Types.ObjectId & IMarketplaceProduct>;
    quantity: number;
  }[];
  quantity: number;
  price: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionDate: Date;
  shippingAddress: string;
  billingAddress: string;
  status: string;
  deliveryDate: Date;
  invoiceId: PopulatedDoc<Schema.Types.ObjectId & IInvoice>;
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    orderId: { type: String, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant' },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
      },
    ],
    quantity: { type: Number },
    price: { type: Number },
    total: { type: Number },
    paymentMethod: { type: String },
    paymentStatus: { type: String },
    transactionDate: { type: Date, default: Date.now },
    shippingAddress: { type: String },
    billingAddress: { type: String },
    status: { type: String },
    deliveryDate: { type: Date },
    invoiceId: { type: Schema.Types.ObjectId, ref: 'Invoice' },
  },
  { timestamps: true, versionKey: false },
);

const TransactionModel = model<ITransaction>(
  'Transaction',
  TransactionSchema,
  'Transactions',
);

export { ITransaction, TransactionModel };
