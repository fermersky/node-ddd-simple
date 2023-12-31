import { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';

import { AppConfig } from '@infrastructure/app.config';
import { ConsoleLogger } from '@infrastructure/logger';

import { DriverController } from '../controllers/driver.controller';
import { ApiHandler } from './handlers';

const driverController = container.resolve(DriverController);
const appConfig = container.resolve(AppConfig);

const logger = new ConsoleLogger();
const logging = appConfig.HTTP_LOGGING;

export default async function routes(app: FastifyInstance) {
  app.get('/drivers', async (req, res) => {
    const handler = driverController.getAll.bind(driverController);

    await ApiHandler(req, res, { logging, logger })(handler);
  });

  app.post('/driver/login', async (req, res) => {
    const handler = driverController.login.bind(driverController);

    await ApiHandler(req, res, { logging, logger })(handler);
  });

  app.get('/driver/me', async (req, res) => {
    const handler = driverController.me.bind(driverController);

    await ApiHandler(req, res, { logging, logger })(handler);
  });
}
