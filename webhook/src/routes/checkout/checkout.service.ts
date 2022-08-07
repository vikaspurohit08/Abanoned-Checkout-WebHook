import { socketIO } from "../../index";
import schedulerService from "../scheduler/scheduler.service";
import checkoutRepository from "./checkout.repository";
import {
  AbandonedCheckoutRequest,
  IAbandonedCheckoutModel,
} from "./checkout.type";
import checkoutUtil from "./checkout.util";

const create = async (input: AbandonedCheckoutRequest) => {
  try {
    const checkout = await checkoutRepository.create(input);
    if (!checkout) {
      throw new Error("Cannot create abanoned checkout");
    }
    const schedules = checkoutUtil.getScheduleForNotification(checkout);

    Promise.all([schedules.map((sch) => schedulerService.create(sch))]);
    return checkout;
  } catch (error) {
    console.error("Failed to create abandoned checkout", error);
  }
};

const get = async (id: string) => {
  try {
    const checkout = await checkoutRepository.get(id);
    if (!checkout) {
      throw new Error("Not Found");
    }
    return checkout;
  } catch (error) {
    console.error(`Cannot find checkout with id ${id}`, error);
  }
};

const deleteById = async (id: string) => {
  try {
    await checkoutRepository.deleteById(id);
    await schedulerService.disableScheduler(id);
  } catch (error) {
    console.error(`Failed to delete abandoned checkout with id ${id}`, error);
  }
};

export default {
  create,
  get,
  deleteById,
};
