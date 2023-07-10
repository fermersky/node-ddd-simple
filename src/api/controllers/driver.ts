import { Request } from "express";
import {
  DriverLoginResponseBody,
  GetDriversResponseBody,
  fromDomain,
} from "@api/dto/driver.dto";
import { DriverService } from "@domain/driver";
import { inject, injectable } from "tsyringe";
import { BadRequest } from "@api/http/exceptions";

@injectable()
export class DriverController {
  constructor(@inject(DriverService) private driverService: DriverService) {}

  async getDrivers(): Promise<GetDriversResponseBody> {
    const drivers = await this.driverService.getAll();

    return drivers.map(fromDomain);
  }

  async login(req: Request): Promise<DriverLoginResponseBody> {
    const email = req.body.email;
    const password = req.body.password;

    const token = await this.driverService.authenticate(email, password);

    if (token == null) {
      throw new BadRequest("Failed authentication for a driver");
    }

    return { token };
  }
}
