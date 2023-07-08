import { injectable } from "tsyringe";
import { PoolClient } from "pg";
import { Driver } from "@domain/driver";
import { IDriverRepository } from "../interface";
import { IDriverQueryResult } from "./driver.repository.types";

@injectable()
export class DriverRepository implements IDriverRepository {
  private client: PoolClient;

  async setClient(client: PoolClient) {
    this.client = client;
  }

  async getDrivers(): Promise<Driver[]> {
    const result = await this.client.query<IDriverQueryResult>(
      "select * from drivers limit 3"
    );
    return this.mapToDomain(result.rows);
  }

  private mapToDomain(rows: IDriverQueryResult[]): Driver[] {
    return rows.map((row) => ({
      id: row.id,
      password: row.password,
      email: row.email,
      phone: row.phone,
      first_name: row.first_name,
      last_name: row.last_name,
    }));
  }
}
