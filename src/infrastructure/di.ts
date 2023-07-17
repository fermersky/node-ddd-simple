import { container } from 'tsyringe';

import { IDriverRepository } from '@domain/driver';

import { DriverRepository } from './db/repositories';
import { ConsoleLogger, ILogger } from './logger';

container.register<IDriverRepository>('IDriverRepository', {
  useClass: DriverRepository,
});

container.register<ILogger>('ILogger', {
  useClass: ConsoleLogger,
});
