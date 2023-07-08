import { injectable, inject } from "tsyringe";
import { DB } from "@infrastructure/db";
import { Driver } from "./index";

@injectable()
export class DriverService {
  constructor(@inject(DB) private db: DB) {}

  async getDrivers(): Promise<Driver[]> {
    await this.db.begin();
    const drivers = await this.db.driverRepository.getDrivers();
    await this.db.commit();

    return drivers;
  }
}
