import { ISchedulerModel, SchedulerStatus } from "./scheduler.type";
import { Document, model, Schema } from "mongoose";

type SchedulerDocument = ISchedulerModel & Document;
const collectionName = "schedulers";

const schedulerSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    checkoutId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(SchedulerStatus),
      required: true,
    },
    scheduleDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SchedulerModel = model<SchedulerDocument>(
  collectionName,
  schedulerSchema
);

export { SchedulerDocument, SchedulerModel };
