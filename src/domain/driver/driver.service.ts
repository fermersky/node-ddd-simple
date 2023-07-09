import { injectable, inject } from "tsyringe";
import { PGContext } from "@infrastructure/db";
import { JWTService } from "@infrastructure/crypto";
import { Driver } from "@domain/driver";

@injectable()
export class DriverService {
  constructor(
    @inject(PGContext) private pg: PGContext,
    @inject(JWTService) private jwt: JWTService
  ) {}

  async getAll(): Promise<Driver[]> {
    await this.pg.begin();

    const drivers = await this.pg.driverRepository.getAll();
    const driver = await this.pg.driverRepository.findDriverByEmail(
      "andrew@mail.com"
    );

    console.log({ driver });

    await this.pg.commit();

    // just for fun
    const token = await this.jwt.sign({ test: "test" }, "secret", {
      expiresIn: Date.now() + 10e5,
    });

    console.log({ token });

    return drivers;
  }
}
