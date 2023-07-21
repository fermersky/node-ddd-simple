import { FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

import { Driver, DriverService } from '@domain/driver';

import { HttpBadRequest } from '../core/http.errors';
import { IDriverJwtPayload, JwtHttpService } from '../core/services/jwt-http.service';
import {
  DriverLoginResponseBody,
  DriverSignInSchema,
  GetDriverResponseBody,
  GetDriversResponseBody,
  fromDomain,
} from '../dto/driver.dto';

@injectable()
export class DriverController {
  constructor(
    @inject(DriverService) private driverService: DriverService,
    @inject(JwtHttpService) private jwt: JwtHttpService,
  ) {}

  async getAll(req: FastifyRequest): Promise<GetDriversResponseBody> {
    await this.jwt.validateRequest<IDriverJwtPayload>(req);

    const drivers = await this.driverService.getAll();

    return drivers.map(fromDomain);
  }

  async me(req: FastifyRequest): Promise<GetDriverResponseBody> {
    const { email } = await this.jwt.validateRequest(req);

    const driver = await this.driverService.findByEmail(email);

    return fromDomain(driver);
  }

  async login(req: FastifyRequest): Promise<DriverLoginResponseBody> {
    const { email, password } = await DriverSignInSchema.parseAsync(req.body);

    const authenticated = await this.driverService.authenticate(email, password);

    if (authenticated) {
      const driver = (await this.driverService.findByEmail(email)) as Driver;

      const token = await this.jwt.createToken({
        id: driver.id,
        email: driver.email,
      });

      return { token };
    }

    throw new HttpBadRequest('Could not authenticate the driver');
  }
}
