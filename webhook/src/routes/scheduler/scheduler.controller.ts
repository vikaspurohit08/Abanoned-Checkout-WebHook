import { Router } from "express";
import schedulerService from "./scheduler.service";

const schedulerRouter = Router();

schedulerRouter.get("/notifications", async (req, res) => {
  try {
    const notifications = await schedulerService.getAllCompletedSchedulers();
    res.status(200).send(notifications);
  } catch (error) {
    res.status(404).send({ Message: "Schedulers not found" });
  }
});

schedulerRouter.post("/cancel-schedule", async (req, res) => {
  const checkoutId = req.body.checkoutId;
  try {
    const updated = await schedulerService.disableScheduler(checkoutId);
    res.status(200).send(updated);
  } catch (error) {
    res.status(400).send({ Error: "Failed to update scheduler" });
  }
});

export { schedulerRouter };
