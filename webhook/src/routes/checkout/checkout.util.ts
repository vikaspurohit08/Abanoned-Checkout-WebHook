import {
  CreateSchedulerRequest,
  SchedulerStatus,
} from "../scheduler/scheduler.type";
import { scheduleAddTime } from "./checkout.constant";
import { IAbandonedCheckoutModel } from "./checkout.type";

const getSchedule = (
  checkoutModel: IAbandonedCheckoutModel,
  title: string,
  date: Date
): CreateSchedulerRequest => {
  return {
    name: `schedule_${checkoutModel.id}`,
    title,
    checkoutId: checkoutModel.id,
    userId: `${checkoutModel.user_id}`,
    status: SchedulerStatus.PENDING,
    scheduleDate: date,
  };
};

const getScheduleForNotification = (
  checkoutModel: IAbandonedCheckoutModel
): CreateSchedulerRequest[] => {
  let schedules: CreateSchedulerRequest[] = [];

  scheduleAddTime.forEach((scheduleConstant) => {
    const schedule = getSchedule(
      checkoutModel,
      scheduleConstant.title,
      new Date(
        new Date().setTime(new Date().getTime() + scheduleConstant.addTime)
      )
    );
    schedules.push(schedule);
  });

  if (schedules.length === 0) {
    throw new Error("Failed to create schedule");
  }
  return schedules;
};

export default { getScheduleForNotification };
