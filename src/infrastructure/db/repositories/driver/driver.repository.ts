import { injectable } from 'tsyringe';

import { Driver, IDriverRepository } from '@domain/driver';

import { PgRepository } from '../pg';
import { IDriverQueryResult } from './driver.repository.types';

@injectable()
export class DriverRepository extends PgRepository implements IDriverRepository {
  async getAll(): Promise<Driver[]> {
    const result = await this.client.query<IDriverQueryResult>('SELECT * FROM DRIVERS');
    return this.mapToDomain(result.rows);
  }

  async findByEmail(email: string): Promise<Driver | null> {
    const result = await this.client.query<IDriverQueryResult>('SELECT * FROM DRIVERS WHERE email = $1', [
      email,
    ]);

    if (result.rowCount === 0) {
      return null;
    }

    return this.mapToDomain(result.rows)[0];
  }

  private mapToDomain(rows: IDriverQueryResult[]): Driver[] {
    return rows.map((row) => ({
      id: row.id,
      password: row.password,
      email: row.email,
      phone: row.phone,
      first_name: row.first_name,
      last_name: row.last_name,
    }));
  }
}
