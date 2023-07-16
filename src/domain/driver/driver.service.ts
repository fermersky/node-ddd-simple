import { inject, injectable } from 'tsyringe';

import { Driver } from '@domain/driver';

import { BcryptService } from '@infrastructure/crypto';
import { PGContext } from '@infrastructure/db';

@injectable()
export class DriverService {
  constructor(
    @inject(PGContext) private pg: PGContext,
    @inject(BcryptService) private bcrypt: BcryptService,
  ) {}

  async getAll(): Promise<Driver[]> {
    await this.pg.begin();
    const drivers = await this.pg.driverRepository.getAll();
    await this.pg.commit();

    return drivers;
  }

  async findByEmail(email: string): Promise<Driver | null> {
    await this.pg.begin();
    const driver = await this.pg.driverRepository.findByEmail(email);
    await this.pg.commit();

    return driver;
  }

  async authenticate(email: string, password: string): Promise<boolean> {
    await this.pg.begin();
    const driver = await this.pg.driverRepository.findByEmail(email);
    await this.pg.commit();

    if (driver == null) {
      return false;
    }

    return this.bcrypt.compare(password, driver.password);
  }
}
