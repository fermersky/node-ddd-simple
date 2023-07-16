import { FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

import { DriverService } from '@domain/driver';

import { AppConfig } from '@infrastructure/app.config';
import { JWTService } from '@infrastructure/crypto';

import { Authorize } from '@api/http/defs/decorators';
import { BadRequest } from '@api/http/defs/errors';
import {
  DriverLoginResponseBody,
  DriverSignInSchema,
  GetDriversResponseBody,
  fromDomain,
} from '@api/http/dto/driver.dto';

@injectable()
export class DriverController {
  constructor(
    @inject(DriverService) private driverService: DriverService,
    @inject(JWTService) private jwt: JWTService,
    @inject(AppConfig) private config: AppConfig,
  ) {}

  @Authorize
  async getDrivers(): Promise<GetDriversResponseBody> {
    const drivers = await this.driverService.getAll();

    return drivers.map(fromDomain);
  }

  async login(req: FastifyRequest): Promise<DriverLoginResponseBody> {
    const { email, password } = await DriverSignInSchema.parseAsync(req.body);

    const authenticated = await this.driverService.authenticate(email, password);

    if (authenticated) {
      const token = await this.jwt.sign({}, this.config.JWT_SECRET, {
        expiresIn: Date.now() + 15 * 60 * 1000,
      });

      return { token: token as string };
    }

    throw new BadRequest('Could not authenticate the driver');
  }
}
