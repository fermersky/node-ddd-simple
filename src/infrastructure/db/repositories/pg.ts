import { PoolClient } from 'pg';

export abstract class PgRepository {
  constructor(protected client: PoolClient) {}

  setClient(client: PoolClient): void {
    this.client = client;
  }
}
