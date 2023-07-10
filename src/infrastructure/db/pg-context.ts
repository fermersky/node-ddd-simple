import { inject, singleton } from "tsyringe";
import { PoolClient, Pool } from "pg";
import { DriverRepository } from "./repositories";
import { IRepository } from "./repositories/interface";
import { Entity } from "@domain/entity";

@singleton()
export class PGContext {
  private client: PoolClient | null;
  private dbRepos: IRepository<Entity>[] = [];
  private pool: Pool;

  constructor(
    @inject(DriverRepository) public driverRepository: DriverRepository
  ) {
    this.dbRepos = [this.driverRepository];

    this.pool = new Pool({
      host: "localhost",
      port: 5432,
      database: "best_driver_db",
      user: "postgres",
      password: "123",
    });

    console.log('connected to the postgres database "best_driver_db" 📚');
  }

  async begin() {
    const client = await this.pool.connect();

    this.setClient(client);

    await client.query("BEGIN;");
  }

  async commit() {
    if (this.client == null) {
      throw new Error(
        "You are attempting to commit without starting a transaction! Consider calling `.begin()` firstly."
      );
    }
    await this.client.query("COMMIT;");

    this.client.release();

    this.setClient(null);
  }

  private setClient(client: PoolClient | null) {
    this.client = client;
    this.dbRepos.map((repo) => repo.setClient(this.client));
  }
}
