import { PoolClient } from 'pg';

export interface IPGRepository {
  setClient(client: PoolClient | null): void;
}
