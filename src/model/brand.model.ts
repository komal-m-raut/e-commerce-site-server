import { Schema, model } from 'mongoose';

interface IBrand extends Document {
  brandName: string;
  catalogueDetails: string;
  brandLogo: string;
  documentOfProof: string;
  categories: string[]; // Brands usually operate in multiple categories
  originCountry: string; // Country of origin can be important for some customers
  website: string; // Brand's official website
}

const BrandSchema: Schema<IBrand> = new Schema({
  brandName: String,
  catalogueDetails: String,
  brandLogo: String,
  documentOfProof: String,
  categories: [String],
  originCountry: String,
  website: String,
});

const BrandModel = model<IBrand>('Brand', BrandSchema);

export { BrandModel, IBrand };
