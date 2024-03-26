import { Schema, model } from 'mongoose';

interface IExchangeRefund extends Document {
  name: string;
  description: string;
  duration: number; // in days
  tenant: Schema.Types.ObjectId;
}

const ExchangeRefundSchema = new Schema<IExchangeRefund>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    tenant: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false },
);

ExchangeRefundSchema.index({ name: 1, tenant: 1 }, { unique: true });

const ExchangeRefundModel = model<IExchangeRefund>(
  'ExchangeRefund',
  ExchangeRefundSchema,
  'ExchangeRefund',
);

export { IExchangeRefund, ExchangeRefundModel };
