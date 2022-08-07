import { IBaseModel } from "../../common/baseModel.type";
import { UserStateEnum } from "./user.enum";

interface IBasicUserDetail extends IBaseModel {
  first_name: string;
  last_name: string;
  name: string;
  phone: string;
}

interface IUserModel extends IBasicUserDetail {
  accepts_marketing: boolean;
  email: string;
  note: string;
  orders_count: number;
  state: UserStateEnum;
  total_spent: number;
  tags: string;
  created_at: Date;
  updated_at: Date;
}

export { IBasicUserDetail, IUserModel };
