import express from "express";
import { DriverController } from "../controllers/driver.controller";
import { container } from "tsyringe";
import { ApiHandler } from "./handlers";
import { AppConfig } from "@infrastructure/app.config";
import { ConsoleLogger } from "@infrastructure/logger";

const driverController = container.resolve(DriverController);
const appConfig = container.resolve(AppConfig);

const logger = new ConsoleLogger();
const logging = appConfig.HTTP_LOGGING;

export const app = express();

app.use(express.json());

app.get("/drivers", async (req, res) => {
  const handler = driverController.getDrivers.bind(driverController);

  await ApiHandler(req, res, { logging, logger })(handler);
});

app.post("/driver/login", async (req, res) => {
  const handler = driverController.login.bind(driverController);

  await ApiHandler(req, res, { logging, logger })(handler);
});
