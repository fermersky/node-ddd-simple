import { IDriverRepository } from "@domain/driver";
import { container } from "tsyringe";
import { DriverRepository } from "./db/repositories";

container.register<IDriverRepository>("IDriverRepository", {
  useClass: DriverRepository,
});
