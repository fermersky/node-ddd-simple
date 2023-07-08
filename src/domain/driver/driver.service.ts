import { injectable, inject } from "tsyringe";
import { DB } from "@infrastructure/db";
import { Driver } from "./index";
import { JWTService } from "@infrastructure/crypto";

@injectable()
export class DriverService {
  constructor(
    @inject(DB) private db: DB,
    @inject(JWTService) private jwt: JWTService
  ) {}

  async getDrivers(): Promise<Driver[]> {
    await this.db.begin();
    const drivers = await this.db.driverRepository.getDrivers();
    await this.db.commit();

    // just for fun
    const token = await this.jwt.sign({ test: "test" }, "secret", {
      expiresIn: Date.now() + 10e5,
    });

    console.log({ token });

    return drivers;
  }
}
