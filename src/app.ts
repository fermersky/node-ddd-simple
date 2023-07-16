import 'reflect-metadata';
import { container } from 'tsyringe';

import { AppConfig } from '@infrastructure/app.config';

import { app } from '@api/http/routes';

const appConfig = container.resolve(AppConfig);

app.listen({ port: appConfig.HTTP_PORT });

app.addHook('onReady', () => {
  console.log(`server is running on port ${appConfig.HTTP_PORT} 🚀`);

  console.log(appConfig);
});
