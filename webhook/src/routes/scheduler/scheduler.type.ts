import { IBaseModel } from "../../common/baseModel.type";

enum SchedulerStatus {
  PENDING = "pending",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

interface CreateSchedulerRequest {
  name: string;
  title: string;
  checkoutId: string;
  userId: string;
  status: SchedulerStatus;
  scheduleDate: Date;
}

interface ISchedulerModel extends IBaseModel, CreateSchedulerRequest {}

export { SchedulerStatus, CreateSchedulerRequest, ISchedulerModel };
