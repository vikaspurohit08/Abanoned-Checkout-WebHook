import dotEnv from "dotenv";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { checkoutRouter } from "./routes/checkout/checkout.controller";
import { Server } from "socket.io";
import { createServer } from "http";
import { schedulerRouter } from "./routes/scheduler/scheduler.controller";

dotEnv.config({ path: "config.env" });
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(checkoutRouter);
app.use(schedulerRouter);

const httpServer = createServer(app);
const socketIO = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

try {
  mongoose.connect("mongodb://localhost:27017/abandoned_checkout_db");
} catch (error) {
  console.error("Failed to connect mongo", error);
}

httpServer.listen(process.env.PORT, () => {
  console.log("Server listening on", process.env.PORT);
});

socketIO.on("connection", (socket) => {
  // console.log("Socket", socket);
});

export { app, socketIO };
