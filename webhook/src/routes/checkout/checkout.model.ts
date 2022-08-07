import { Document, model, Schema } from "mongoose";
import { addressSchema } from "../../common/address.model";
import { CurrencyEnum } from "../../common/currency.enum";
import { discountSchema } from "../discount/discount.model";
import { userBasicDetailSchema, userSchema } from "../user/user.model";
import { IAbandonedCheckoutModel } from "./checkout.type";

type AbandonedCheckoutDocument = IAbandonedCheckoutModel & Document;
const collectionName = "abandoned_checkouts";

const billingAddressSchema = new Schema({
  ...userBasicDetailSchema,
  ...addressSchema,
});

const shippingLinesSchema = new Schema({
  code: {
    type: String,
  },
  price: { type: String },
  source: { type: String },
  title: { type: String },
});

const taxLinesSchmea = new Schema({
  price: { type: String },
  rate: { type: Number },
  title: { type: String },
  channel_liable: { type: Boolean },
});

const fulfillmentServiceSchema = new Schema({
  fulfillment_service: { type: String },
  grams: { type: Number },
  price: { type: String },
  product_id: { type: String },
  quantity: { type: Number },
  requires_shipping: { type: Boolean },
  sku: { type: String },
  title: { type: String },
  variant_id: { type: String },
  variant_title: { type: String },
  vendor: { type: String },
});

const abandonedCheckoutSchema = new Schema({
  checkout_url: { type: String },
  billing_address: billingAddressSchema,
  buyer_accepts_marketing: { type: Boolean },
  buyer_accepts_sms_marketing: { type: Boolean },
  cart_token: { type: String },
  closed_at: { type: Date },
  completed_at: { type: Date },
  created_at: { type: Date },
  currency: {
    currency: { type: String, enum: Object.values(CurrencyEnum) },
  },
  customer: userSchema,
  customer_locale: { type: String },
  device_id: { type: Number },
  discount_codes: [{ discount_code: discountSchema }],
  email: { type: String },
  gateway: { type: String },
  landing_site: { type: String },
  line_items: fulfillmentServiceSchema,
  location_id: { type: Number },
  note: { type: String },
  phone: {
    phone: { type: String },
  },
  presentment_currency: {
    presentment_currency: { type: String, enum: Object.values(CurrencyEnum) },
  },
  referring_site: { type: String },
  shipping_address: billingAddressSchema,
  sms_marketing_phone: { type: String },
  shipping_lines: shippingLinesSchema,
  source_name: { type: String },
  subtotal_price: { type: String },
  tax_lines: taxLinesSchmea,
  taxes_included: { type: Boolean },
  token: { type: String },
  total_discounts: { type: String },
  total_duties: { type: String },
  total_line_items_price: { type: String },
  total_price: { type: String },
  total_tax: { type: String },
  total_weight: { type: Number },
  updated_at: { type: Date },
  user_id: { type: Number },
});

const AbandonedCheckoutModel = model<AbandonedCheckoutDocument>(
  collectionName,
  abandonedCheckoutSchema
);

export { AbandonedCheckoutDocument, AbandonedCheckoutModel };
