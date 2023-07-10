import { Driver } from "@domain/driver";
import { z } from "zod";

const GetDriverSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  first_name: z.string(),
  last_name: z.string(),
});

type GetDriverResponse = z.infer<typeof GetDriverSchema>;

export type GetDriversResponseBody = GetDriverResponse[];

export function fromDomain(driver: Driver): GetDriverResponse {
  return {
    id: driver.id,
    first_name: driver.first_name,
    last_name: driver.last_name,
    email: driver.email,
    phone: driver.phone,
  };
}

const DriverLoginResponseSchema = z.object({
  token: z.string(),
});

export type DriverLoginResponseBody = z.infer<typeof DriverLoginResponseSchema>;
