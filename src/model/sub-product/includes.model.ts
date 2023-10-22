import { Document, Schema, model } from 'mongoose';

interface IIncludes extends Document {
  name: string;
  item: {
    name: string;
    length: number;
    height: number;
    width: number;
    weight: number;
  }[];
}

const IncludesSchema = new Schema<IIncludes>({
  name: { type: String, unique: true },
  item: {
    name: String,
    length: Number,
    height: Number,
    width: Number,
    weight: Number,
  },
});

const IncludesModel = model<IIncludes>('Includes', IncludesSchema, 'Includes');

export { IIncludes, IncludesModel, IncludesSchema };
