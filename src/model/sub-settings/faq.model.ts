import { Schema, model } from 'mongoose';

interface IFaq extends Document {
  question: string;
  answer: string;
  tenant: Schema.Types.ObjectId;
}

const FaqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    tenant: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false },
);

FaqSchema.index({ question: 1, tenant: 1 }, { unique: true });

const FaqModel = model<IFaq>('Faq', FaqSchema, 'Faq');

export { IFaq, FaqModel };
