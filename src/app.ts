import "reflect-metadata";
import { container } from "tsyringe";

import { app } from "@api/http/routes";
import { AppConfig } from "@infrastructure/app.config";

const appConfig = container.resolve(AppConfig);

app.listen({ port: appConfig.HTTP_PORT });

app.addHook("onReady", () => {
  console.log(`server is running on port ${appConfig.HTTP_PORT} 🚀`);

  console.log(appConfig);
});
