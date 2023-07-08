import express from "express";
import { DriverController } from "./controllers/driver";
import { container } from "tsyringe";

const driverController = container.resolve(DriverController);

export const app = express();

app.get("/drivers", async (req, res) => {
  const result = await driverController.getDrivers();

  res.json(result);
});
