import { injectable, inject } from "tsyringe";
import { PGContext } from "@infrastructure/db";
import { BcryptService } from "@infrastructure/crypto";
import { Driver } from "@domain/driver";

@injectable()
export class DriverService {
  constructor(
    @inject(PGContext) private pg: PGContext,
    @inject(BcryptService) private bcrypt: BcryptService
  ) {}

  async getAll(): Promise<Driver[]> {
    await this.pg.begin();
    const drivers = await this.pg.driverRepository.getAll();
    await this.pg.commit();

    return drivers;
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
