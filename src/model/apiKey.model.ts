import { Document, model, Schema } from 'mongoose';

interface IApiKey extends Document {
  tenant: Schema.Types.ObjectId; // Tenant ID
  APIKey: string;
  status: boolean;
  validTill?: Date;
}

const ApiKeySchema: Schema = new Schema(
  {
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    APIKey: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    validTill: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

const ApiKey = model<IApiKey>('ApiKey', ApiKeySchema);

export default ApiKey;
