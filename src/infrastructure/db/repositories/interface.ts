import { Driver } from "@domain/driver";
import { PoolClient } from "pg";

export interface IRepository<T> {
  getAll(): Promise<T[]>;
  // ...other generic repository methods

  setClient(client: PoolClient | null): void;
}

export interface IDriverRepository extends IRepository<Driver> {
  findDriverByEmail(email: string): Promise<Driver | null>;
  // ...other driver repository methods
}
