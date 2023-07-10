import express from "express";
import { DriverController } from "../controllers/driver";
import { container } from "tsyringe";
import { ApiHandler } from "./handlers";

const driverController = container.resolve(DriverController);

export const app = express();

app.use(express.json());

app.get("/drivers", async (req, res) => {
  const handler = driverController.getDrivers.bind(driverController);

  await ApiHandler(req, res)(handler);
});

app.post("/driver/login", async (req, res) => {
  const handler = driverController.login.bind(driverController);

  await ApiHandler(req, res)(handler);
});
