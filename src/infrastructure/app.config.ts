import { singleton } from "tsyringe";
import { z } from "zod";

import "dotenv/config";
import "./di";

const EnvSchema = z.object({
  HTTP_LOGGING: z.boolean().default(false),
  HTTP_PORT: z.number(),
  JWT_SECRET: z.string(),
});

@singleton()
export class AppConfig {
  HTTP_LOGGING: boolean;
  JWT_SECRET: string;
  HTTP_PORT: number;

  constructor() {
    const envs = EnvSchema.parse({
      HTTP_LOGGING: process.env["HTTP_LOGGING"] === "true" ? true : false,
      JWT_SECRET: process.env["JWT_SECRET"],
      HTTP_PORT: Number(process.env["HTTP_PORT"]),
    });

    Object.entries(envs).map(([key, value]) => {
      Object.assign(this, { [key]: value });
    });
  }
}
