import { IAddressModel } from "../../common/address.type";
import { IBaseModel } from "../../common/baseModel.type";
import { CurrencyEnum } from "../../common/currency.enum";
import { IDiscountModel } from "../discount/discount.type";
import { IBasicUserDetail, IUserModel } from "../user/user.type";

interface IBillingAddressModel extends IBasicUserDetail, IAddressModel {}

interface IShippingLines {
  code: string;
  price: string;
  source: string;
  title: string;
}

interface ITaxLines {
  price: string;
  rate: number;
  title: string;
  channel_liable: boolean;
}

interface IFulfillmentService {
  fulfillment_service: string;
  grams: number;
  price: string;
  product_id: string;
  quantity: number;
  requires_shipping: boolean;
  sku: string;
  title: string;
  variant_id: string;
  variant_title: string;
  vendor: string;
}

interface AbandonedCheckoutRequest {
  checkout_url: string;
  billing_address: IBillingAddressModel;
  buyer_accepts_marketing: boolean;
  buyer_accepts_sms_marketing: boolean;
  cart_token: string;
  closed_at: Date;
  completed_at: Date;
  created_at: Date;
  currency: {
    currency: CurrencyEnum;
  };
  customer: IUserModel;
  customer_locale: string;
  device_id: number;
  discount_codes: [
    {
      discount_code: IDiscountModel;
    }
  ];
  email: string;
  gateway: string;
  landing_site: string;
  line_items: IFulfillmentService;
  location_id: number;
  note: string;
  phone: {
    phone: string;
  };
  presentment_currency: {
    presentment_currency: CurrencyEnum;
  };
  referring_site: string;
  shipping_address: IBillingAddressModel;
  sms_marketing_phone: string;
  shipping_lines: IShippingLines;
  source_name: string;
  subtotal_price: string;
  tax_lines: ITaxLines;
  taxes_included: boolean;
  token: string;
  total_discounts: string;
  total_duties: string;
  total_line_items_price: string;
  total_price: string;
  total_tax: string;
  total_weight: number;
  updated_at: Date;
  user_id: number;
}

interface IAbandonedCheckoutModel
  extends IBaseModel,
    AbandonedCheckoutRequest {}

export { AbandonedCheckoutRequest, IAbandonedCheckoutModel };
