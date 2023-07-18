import fastify from 'fastify';
import { container } from 'tsyringe';

import { AppConfig } from '@infrastructure/app.config';

import routes from './core/routes';

const app = fastify();
const appConfig = container.resolve(AppConfig);

app.register(routes);

app.addHook('onReady', () => {
  console.log(`server is running on port ${appConfig.HTTP_PORT} 🚀`);
  console.log(appConfig);
});

app.listen({ port: appConfig.HTTP_PORT });

export default app;
