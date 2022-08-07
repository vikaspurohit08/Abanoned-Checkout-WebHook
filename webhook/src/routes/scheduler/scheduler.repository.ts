import { SchedulerDocument, SchedulerModel } from "./scheduler.model";
import {
  CreateSchedulerRequest,
  ISchedulerModel,
  SchedulerStatus,
} from "./scheduler.type";

const documentToObject = (document: SchedulerDocument): ISchedulerModel => {
  return document.toObject({ getters: true }) as ISchedulerModel;
};

const create = async (input: CreateSchedulerRequest) => {
  try {
    const document = await SchedulerModel.create(input);
    return document && documentToObject(document);
  } catch (error) {
    throw error;
  }
};

const get = async (id: string) => {
  try {
    const document = await SchedulerModel.findOne({ _id: id });
    return document && documentToObject(document);
  } catch (error) {
    throw error;
  }
};

const getByCheckoutId = async (checkoutId: string) => {
  try {
    const documents = await SchedulerModel.find({ checkoutId });
    return documents && documents.map((document) => documentToObject(document));
  } catch (error) {
    throw error;
  }
};

const getAllCompletedSchedulers = async () => {
  try {
    const documents = await SchedulerModel.find({
      status: SchedulerStatus.COMPLETED,
    });
    return documents && documents.map((document) => documentToObject(document));
  } catch (error) {
    throw error;
  }
};

const updateStatusToCompleted = async (id: string, status: SchedulerStatus) => {
  try {
    const document = await SchedulerModel.findOneAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    );
    return document && documentToObject(document);
  } catch (error) {
    throw error;
  }
};

const disableCompletedSchedules = async (
  checkoutId: string,
  status: SchedulerStatus
) => {
  try {
    const document = await SchedulerModel.updateMany(
      { checkoutId: checkoutId },
      {
        status: status,
      },
      {
        new: true,
      }
    );
    return document;
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  get,
  getByCheckoutId,
  updateStatusToCompleted,
  disableCompletedSchedules,
  getAllCompletedSchedulers,
};
