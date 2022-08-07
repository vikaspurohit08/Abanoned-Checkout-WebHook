import { IBaseModel } from "../../common/baseModel.type";

interface IDiscountModel extends IBaseModel {
  code: string;
  usage_count: number;
  created_at: Date;
  updated_at: Date;
}

export { IDiscountModel };
