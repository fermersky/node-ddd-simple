import { Driver } from "./index";
import { IRepository } from "../domain.interfaces";

export interface IDriverRepository extends IRepository<Driver> {
  findByEmail(email: string): Promise<Driver | null>;
  // ...other driver repository methods
}
