import { Schema } from "mongoose";
import { UserStateEnum } from "./user.enum";

const userBasicDetailSchema = {
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
};

const userSchema = new Schema({
  ...userBasicDetailSchema,
  accepts_marketing: {
    type: Boolean,
  },
  email: {
    type: String,
  },
  note: {
    type: String,
  },
  orders_count: {
    type: Number,
  },
  state: {
    type: String,
    enum: Object.values(UserStateEnum),
  },
  total_spent: {
    type: Number,
  },
  tags: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

export { userBasicDetailSchema, userSchema };
