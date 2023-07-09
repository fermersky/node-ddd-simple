import { DriverService } from "@domain/driver";
import { inject, injectable } from "tsyringe";

@injectable()
export class DriverController {
  constructor(@inject(DriverService) private driverService: DriverService) {}

  async getDrivers() {
    return this.driverService.getAll();
  }
}
