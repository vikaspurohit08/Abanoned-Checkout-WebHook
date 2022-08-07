import { Schema } from "mongoose";
import { CountryCodeEnum } from "./countryCode.enum";

// address1: string;
// address2: string;
// city: string;
// company: string;
// country: string;
// country_code: CountryCodeEnum;
// default: boolean;
// province: string;
// province_code: string;
// zip: string;
// latitude: string;
// longitude: string;

const addressSchema = {
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
  },
  company: {
    type: String,
  },
  country: {
    type: String,
  },
  country_code: { type: String, enum: Object.values(CountryCodeEnum) },
  default: { type: Boolean },
  province: { type: String },
  province_code: { type: String },
  zip: { type: String },
  latitude: { type: String },
  longitude: { type: String },
};

export { addressSchema };
