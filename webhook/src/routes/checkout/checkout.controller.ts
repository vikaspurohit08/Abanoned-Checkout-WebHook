import { Router } from "express";
import checkoutService from "./checkout.service";

const checkoutRouter = Router();

checkoutRouter.post("/checkout", async (req, res) => {
  try {
    const response = await checkoutService.create(req.body);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

checkoutRouter.get("/checkout/:id", async (req, res) => {
  try {
    const response = await checkoutService.get(req.params.id);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error);
  }
});

checkoutRouter.delete("/checkout/:id", async (req, res) => {
  try {
    const response = await checkoutService.deleteById(req.params.id);
    res.status(204).send(response);
  } catch (error) {
    res.status(404).send(error);
  }
});

export { checkoutRouter };
