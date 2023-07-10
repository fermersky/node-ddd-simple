import { singleton } from "tsyringe";
import { z } from "zod";

const EnvSchema = z.object({
  HTTP_LOGGING: z.boolean().default(false),
});

@singleton()
export class AppConfig {
  HTTP_LOGGING: boolean;

  constructor() {
    const envs = EnvSchema.parse({
      HTTP_LOGGING: Boolean(process.env["HTTP_LOGGING"]),
    });

    Object.entries(envs).map(([key, value]) => {
      Object.assign(this, { [key]: value });
    });
  }
}