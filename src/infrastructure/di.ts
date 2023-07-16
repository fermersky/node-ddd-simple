import { container } from 'tsyringe';

import { IDriverRepository } from '@domain/driver';

import { DriverRepository } from './db/repositories';

container.register<IDriverRepository>('IDriverRepository', {
  useClass: DriverRepository,
});
