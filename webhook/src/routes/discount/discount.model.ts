import { Schema } from "mongoose";

const discountSchema = new Schema({
  code: {
    type: String,
  },
  usage_count: {
    type: Number,
  },
  created_at: { type: Date },
  updated_at: { type: Date },
});

export { discountSchema };
