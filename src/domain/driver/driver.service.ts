import { injectable, inject } from "tsyringe";
import { PGContext } from "@infrastructure/db";
import { JWTService } from "@infrastructure/crypto";
import { Driver } from "@domain/driver";
import { BcryptService } from "@infrastructure/crypto/bcrypt";

@injectable()
export class DriverService {
  constructor(
    @inject(PGContext) private pg: PGContext,
    @inject(JWTService) private jwt: JWTService,
    @inject(BcryptService) private bcrypt: BcryptService
  ) {}

  async getAll(): Promise<Driver[]> {
    await this.pg.begin();
    const drivers = await this.pg.driverRepository.getAll();
    await this.pg.commit();

    return drivers;
  }

  async authenticate(email: string, password: string): Promise<string | null> {
    await this.pg.begin();
    const driver = await this.pg.driverRepository.findDriverByEmail(email);
    await this.pg.commit();

    if (driver == null) {
      return null;
    }

    const same = await this.bcrypt.compare(password, driver.password);

    if (same) {
      const token = await this.jwt.sign({}, "secret", {
        expiresIn: Date.now() + 15 * 60 * 1000,
      });

      return token as string;
    }

    return null;
  }
}
