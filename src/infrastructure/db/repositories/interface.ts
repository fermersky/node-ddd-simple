import { Driver } from "@domain/driver";

export interface IDriverRepository {
  getDrivers(): Promise<Driver[]>;
}
