import { Request } from "express";
import {
  DriverLoginResponseBody,
  GetDriversResponseBody,
  fromDomain,
} from "@api/dto/driver.dto";
import { DriverService } from "@domain/driver";
import { inject, injectable } from "tsyringe";
import { BadRequest } from "@api/http/errors";
import { JWTService } from "@infrastructure/crypto";
import { Authorize } from "@api/http/decorators";

@injectable()
export class DriverController {
  constructor(
    @inject(DriverService) private driverService: DriverService,
    @inject(JWTService) private jwt: JWTService
  ) {}

  // @Authorize
  async getDrivers(): Promise<GetDriversResponseBody> {
    const drivers = await this.driverService.getAll();

    return drivers.map(fromDomain);
  }

  async login(req: Request): Promise<DriverLoginResponseBody> {
    const email = req.body.email;
    const password = req.body.password;

    const authenticated = await this.driverService.authenticate(
      email,
      password
    );

    if (authenticated) {
      const token = await this.jwt.sign({}, "secret", {
        expiresIn: Date.now() + 15 * 60 * 1000,
      });

      return { token: token as string };
    }

    throw new BadRequest("Could not authenticate the driver");
  }
}
