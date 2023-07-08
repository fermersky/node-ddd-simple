import { inject, singleton } from "tsyringe";
import { PoolClient, Pool } from "pg";
import { DriverRepository } from "./repositories";

@singleton()
export class DB {
  private client: PoolClient | null;
  private dbRepos: any[] = [];
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

    console.log("created PG pool");
  }

  async begin() {
    const client = await this.pool.connect();

    this.setClient(client);

    await client.query("BEGIN;");
  }

  async commit() {
    await this.client?.query("COMMIT;");

    this.setClient(null);

    this.client?.release();
  }

  private setClient(client: PoolClient | null) {
    this.client = client;
    this.dbRepos.map((repo) => repo.setClient(this.client));
  }
}
