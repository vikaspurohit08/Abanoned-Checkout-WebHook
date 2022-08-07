import { IBaseModel } from "./baseModel.type";
import { CountryCodeEnum } from "./countryCode.enum";

interface IAddressModel extends IBaseModel {
  address1: string;
  address2: string;
  city: string;
  company: string;
  country: string;
  country_code: CountryCodeEnum;
  default: boolean;
  province: string;
  province_code: string;
  zip: string;
  latitude: string;
  longitude: string;
}

export { IAddressModel };
