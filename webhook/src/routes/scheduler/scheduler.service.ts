import schedule from "node-schedule";
import { socketIO } from "../..";
import schedulerRepository from "./scheduler.repository";
import {
  CreateSchedulerRequest,
  ISchedulerModel,
  SchedulerStatus,
} from "./scheduler.type";

const create = async (
  input: CreateSchedulerRequest
): Promise<ISchedulerModel> => {
  try {
    const scheduler = await schedulerRepository.create(input);
    console.log("scheduler after create", scheduler);

    schedule.scheduleJob(scheduler.name, scheduler.scheduleDate, async () => {
      //code to notify user
      const scheduledScheduler = await schedulerRepository.get(scheduler.id);

      if (!scheduledScheduler) {
        return;
      }

      console.log("got in work", scheduledScheduler);
      if (scheduledScheduler.status === SchedulerStatus.PENDING) {
        socketIO.emit("notification", {
          id: scheduledScheduler.id,
          title: scheduledScheduler.title,
          date: scheduledScheduler.scheduleDate,
        });
        scheduledScheduler.status = SchedulerStatus.COMPLETED;
        await schedulerRepository.updateStatusToCompleted(
          scheduler.id,
          SchedulerStatus.COMPLETED
        );
      }
    });

    return scheduler;
  } catch (error) {
    console.error("Failed to create scheduler", error);
    throw new Error("Failed to create scheduler");
  }
};

const get = async (id: string) => {
  try {
    const scheduler = await schedulerRepository.get(id);
    if (!scheduler) {
      console.error("Not scheduler found with id ", id);
      throw new Error("Scheduler not found");
    }
    return scheduler;
  } catch (error) {
    throw error;
  }
};

const getAllCompletedSchedulers = async () => {
  try {
    return await schedulerRepository.getAllCompletedSchedulers();
  } catch (error) {
    console.error("Cannot get schedulers");
    throw new Error("Schedulers not found");
  }
};

const disableScheduler = async (checkoutId: string) => {
  try {
    const scheduler = await schedulerRepository.disableCompletedSchedules(
      checkoutId,
      SchedulerStatus.CANCELLED
    );

    if (!scheduler || scheduler["modifiedCount"] === 0) {
      console.error("Scheduler not found for checkout ", checkoutId);
      throw new Error("Scheduler not found");
    }

    const exisingSchedulers = await schedulerRepository.getByCheckoutId(
      checkoutId
    );

    exisingSchedulers.forEach((sch) => {
      schedule.cancelJob(sch.name);
    });

    return exisingSchedulers;
  } catch (error) {
    console.error(
      "Failed to update status for schedulers of checkoutId ",
      checkoutId
    );
    throw error;
  }
};

export default { create, get, getAllCompletedSchedulers, disableScheduler };
