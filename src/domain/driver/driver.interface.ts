import { IRepository } from '../domain.interfaces';
import { Driver } from './index';

export interface IDriverRepository extends IRepository<Driver> {
  findByEmail(email: string): Promise<Driver | null>;
  // ...other driver repository methods
}
