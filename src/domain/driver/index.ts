import { z } from "zod";

export const DriverSchema = z.object({
  id: z.string(),
  password: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  first_name: z.string(),
  last_name: z.string(),
});

export type Driver = z.infer<typeof DriverSchema>;

export * from "./driver.service";
